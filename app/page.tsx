import { ProfileSidebar } from "@/components/chrome/profile-sidebar"
import { TopBar } from "@/components/chrome/top-bar"
import { Wall } from "@/components/wall/wall"

const TABS = ["Wall", "Info", "Photos", "Boxes"]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar />
      <main className="mx-auto w-full max-w-[980px] flex-1 px-4 py-4">
        <div className="flex gap-4">
          <ProfileSidebar />
          <section className="min-w-0 flex-1">
            <h1 className="text-[20px] font-bold text-[#333]">
              Juan Rodriguez
            </h1>
            <div className="mt-2 flex gap-[3px]" role="presentation">
              {TABS.map((tab) =>
                tab === "Wall" ? (
                  <span
                    key={tab}
                    className="border border-[#898989] bg-fb-blue-medium px-3 py-1 text-[12px] font-bold text-white"
                  >
                    {tab}
                  </span>
                ) : (
                  <span
                    key={tab}
                    className="fb-link cursor-default border border-fb-border bg-[#f7f7f7] px-3 py-1 text-[12px]"
                  >
                    {tab}
                  </span>
                )
              )}
            </div>
            <Wall />
          </section>
        </div>
      </main>
      <footer className="border-t border-[#cccccc] bg-[#f7f7f7] py-3 text-center text-[11px] text-[#777]">
        A 2008 Facebook Wall tribute · Next.js + Supabase + shadcn/ui · built
        for the capm.us challenge
      </footer>
    </div>
  )
}
