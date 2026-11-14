import { Silhouette } from "./silhouette"
import { formatWallDate } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Post } from "@/lib/types"

export function PostItem({ post, isNew }: { post: Post; isNew: boolean }) {
  return (
    <li
      className={cn(
        "flex gap-3 border-b border-[#e5e5e5] px-1 py-3",
        isNew && "wall-new"
      )}
    >
      <Silhouette className="h-[50px] w-[50px] shrink-0 border border-fb-blue-pale" />
      <div className="min-w-0 flex-1">
        <span className="fb-link cursor-default text-[13px] font-bold">
          {post.author_name?.trim() || "Anonymous"}
        </span>
        <p className="mt-0.5 whitespace-pre-wrap break-words text-[13px] leading-snug text-[#333]">
          {post.body}
        </p>
        <p className="mt-1 text-[11px] text-[#777]">
          {formatWallDate(post.created_at)}
        </p>
      </div>
    </li>
  )
}
