"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { FEED_LIMIT, type Post } from "@/lib/types"

/**
 * The Wall's live feed: latest posts, newest first, updated in real time.
 *
 * Robustness beyond the happy path:
 * - posts are merged by id, so a post we inserted ourselves doesn't appear
 *   twice when its realtime echo arrives;
 * - the feed is refetched every time the channel reaches SUBSCRIBED, so a
 *   dropped websocket (sleep, network blip) can't leave the wall frozen.
 *
 * `liveIds` holds the ids of posts that arrived while the page was open
 * (via realtime or our own Share) — the UI animates exactly those.
 */
export function useWallPosts() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [liveIds, setLiveIds] = useState<ReadonlySet<string>>(new Set())
  const [loadError, setLoadError] = useState(false)

  const mergePost = useCallback((post: Post) => {
    setLiveIds((current) => new Set(current).add(post.id))
    setPosts((current) => {
      const base = current ?? []
      if (base.some((p) => p.id === post.id)) return current
      const next = [post, ...base]
      next.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
      return next.slice(0, FEED_LIMIT)
    })
  }, [])

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(FEED_LIMIT)
    if (error) {
      setLoadError(true)
      return
    }
    setLoadError(false)
    setPosts(data as Post[])
  }, [])

  useEffect(() => {
    // The SUBSCRIBED callback below does the initial load; this timeout is
    // the fallback so the feed still loads if realtime can never connect.
    const fallbackLoad = setTimeout(() => void fetchPosts(), 0)
    const channel = supabase
      .channel("wall")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => mergePost(payload.new as Post)
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") void fetchPosts()
      })
    return () => {
      clearTimeout(fallbackLoad)
      void supabase.removeChannel(channel)
    }
  }, [fetchPosts, mergePost])

  const sharePost = useCallback(
    async (authorName: string, body: string): Promise<boolean> => {
      const { data, error } = await supabase
        .from("posts")
        .insert({ author_name: authorName, body })
        .select()
        .single()
      if (error || !data) return false
      mergePost(data as Post)
      return true
    },
    [mergePost]
  )

  return { posts, liveIds, loadError, retry: fetchPosts, sharePost }
}
