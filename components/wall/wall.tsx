"use client"

import { useWallPosts } from "@/hooks/use-wall-posts"
import { Composer } from "./composer"
import { PostItem } from "./post-item"

function FeedSkeleton() {
  return (
    <ul aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li
          key={i}
          className="flex animate-pulse gap-3 border-b border-[#e5e5e5] px-1 py-3"
        >
          <div className="h-[50px] w-[50px] shrink-0 bg-fb-blue-pale" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 w-28 bg-[#e5e5e5]" />
            <div className="h-3 w-3/4 bg-[#eeeeee]" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Wall() {
  const { posts, liveIds, loadError, retry, sharePost } = useWallPosts()

  return (
    <div className="mt-3 space-y-3">
      <Composer onShare={sharePost} />

      {loadError && (
        <div className="flex items-center justify-between border border-[#dd3c10] bg-[#ffebe8] px-2 py-1.5 text-[11px] text-[#333]">
          <span>The Wall could not be loaded.</span>
          <button onClick={() => void retry()} className="fb-link font-bold">
            Try again
          </button>
        </div>
      )}

      {posts === null && !loadError ? (
        <FeedSkeleton />
      ) : posts !== null && posts.length === 0 ? (
        <p className="border border-dashed border-fb-border px-3 py-6 text-center text-[12px] text-[#777]">
          No one has written on Juan&apos;s Wall yet. Be the first!
        </p>
      ) : posts !== null ? (
        <section aria-label="Wall posts">
          <p className="border-b border-[#898989] pb-1 text-[11px] text-[#777]">
            Displaying {posts.length} wall post{posts.length === 1 ? "" : "s"}
          </p>
          <ul aria-live="polite">
            {posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                isNew={liveIds.has(post.id)}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
