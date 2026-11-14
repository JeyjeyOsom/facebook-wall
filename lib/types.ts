export const FEED_LIMIT = 50
export const BODY_MAX = 280
export const NAME_MAX = 40

export type Post = {
  id: string
  user_id: string | null
  author_name: string | null
  body: string
  created_at: string
}
