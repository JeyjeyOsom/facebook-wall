"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BODY_MAX, NAME_MAX } from "@/lib/types"

const NAME_STORAGE_KEY = "wall:name"

export function Composer({
  onShare,
}: {
  onShare: (authorName: string, body: string) => Promise<boolean>
}) {
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [sharing, setSharing] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Deferred a tick: hydration must first render the SSR-matching empty field.
    const restore = setTimeout(() => {
      try {
        const saved = localStorage.getItem(NAME_STORAGE_KEY)
        if (saved) setName(saved)
      } catch {
        /* private mode etc. — the field just starts empty */
      }
    }, 0)
    return () => clearTimeout(restore)
  }, [])

  const trimmedBody = body.trim()
  const canShare = trimmedBody.length > 0 && !sharing
  const nearLimit = body.length > BODY_MAX - 20

  async function handleShare() {
    if (!canShare) return
    setSharing(true)
    setFailed(false)
    const author = name.trim().slice(0, NAME_MAX) || "Anonymous"
    try {
      localStorage.setItem(NAME_STORAGE_KEY, name.trim())
    } catch {
      /* fine — they'll just retype it next visit */
    }
    const ok = await onShare(author, trimmedBody)
    if (ok) setBody("")
    else setFailed(true)
    setSharing(false)
  }

  return (
    <Card className="gap-0 rounded-[2px] border-fb-border bg-[#f7f7f7] py-0 shadow-none">
      <CardContent className="space-y-2 p-2.5">
        <div className="flex items-center gap-2">
          <label
            htmlFor="author-name"
            className="text-[11px] font-bold text-[#666]"
          >
            Name:
          </label>
          <Input
            id="author-name"
            value={name}
            maxLength={NAME_MAX}
            placeholder="Anonymous"
            onChange={(e) => setName(e.target.value)}
            className="h-6 w-48 rounded-none border-[#bdc7d8] bg-white px-1.5 text-[12px] shadow-none md:text-[12px]"
          />
        </div>
        <Textarea
          value={body}
          maxLength={BODY_MAX}
          placeholder="Write something on Juan's wall..."
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void handleShare()
          }}
          className="min-h-[70px] rounded-none border-[#bdc7d8] bg-white text-[13px] shadow-none md:text-[13px]"
          aria-label="Wall post"
        />
        <div className="flex items-center justify-between">
          <span
            className={`text-[11px] ${nearLimit ? "font-bold text-[#dd3c10]" : "text-[#999]"}`}
          >
            {body.length} / {BODY_MAX}
          </span>
          <Button
            className="fb-btn"
            disabled={!canShare}
            onClick={() => void handleShare()}
          >
            {sharing ? "Sharing…" : "Share"}
          </Button>
        </div>
        {failed && (
          <p className="border border-[#dd3c10] bg-[#ffebe8] px-2 py-1.5 text-[11px] text-[#333]">
            Your post could not be shared. Check your connection and try again.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
