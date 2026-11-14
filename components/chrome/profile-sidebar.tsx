import { Silhouette } from "@/components/wall/silhouette"

const FRIENDS = ["Ashley", "Brandon", "Jessica", "Kyle", "Megan", "Tyler"]

function SidebarBox({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-fb-border bg-white">
      <div className="border-b border-fb-border bg-[#f7f7f7] px-2 py-1 text-[12px] font-bold text-[#333]">
        {title}
      </div>
      <div className="p-2">{children}</div>
    </div>
  )
}

export function ProfileSidebar() {
  return (
    <aside className="hidden w-[180px] shrink-0 flex-col gap-3 md:flex">
      <div className="border border-fb-border p-px">
        <Silhouette className="h-[176px] w-full" />
      </div>

      <ul className="space-y-1 text-[12px]">
        <li className="fb-link cursor-default">View Photos of Juan (3)</li>
        <li className="fb-link cursor-default">Send Juan a Message</li>
        <li className="fb-link cursor-default">Poke Juan!</li>
      </ul>

      <SidebarBox title="Information">
        <dl className="space-y-1.5 text-[11px]">
          <div>
            <dt className="font-bold text-[#777]">Networks:</dt>
            <dd>The Internet &apos;08</dd>
          </div>
          <div>
            <dt className="font-bold text-[#777]">Current City:</dt>
            <dd>The Cloud</dd>
          </div>
          <div>
            <dt className="font-bold text-[#777]">Relationship Status:</dt>
            <dd>It&apos;s Complicated</dd>
          </div>
        </dl>
      </SidebarBox>

      <SidebarBox title="Friends">
        <p className="mb-1.5 text-[11px] text-[#777]">6 friends</p>
        <div className="grid grid-cols-3 gap-1.5">
          {FRIENDS.map((name) => (
            <div key={name} className="text-center">
              <Silhouette className="h-[50px] w-full border border-fb-blue-pale" />
              <span className="fb-link block truncate text-[10px]">{name}</span>
            </div>
          ))}
        </div>
      </SidebarBox>
    </aside>
  )
}
