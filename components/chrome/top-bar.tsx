const NAV_ITEMS = ["home", "profile", "friends", "inbox"]

export function TopBar() {
  return (
    <header className="border-b border-[#133783] bg-fb-blue">
      <div className="mx-auto flex h-10 w-full max-w-[980px] items-center justify-between px-4">
        <span className="cursor-default select-none text-[22px] font-bold lowercase leading-none tracking-tight text-white">
          facebook
        </span>
        <nav className="hidden gap-4 text-[11px] font-bold text-white/90 sm:flex">
          {NAV_ITEMS.map((item) => (
            <span key={item} className="cursor-default hover:text-white">
              {item}
            </span>
          ))}
        </nav>
      </div>
    </header>
  )
}
