import Link from "next/link";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 transition-transform active:scale-95" aria-label="Mohollah home">
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0e1726] shadow-md border border-base-300/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="Mohollah Logo"
          className="h-full w-full object-cover scale-[1.35] transition-transform duration-300 group-hover:scale-[1.42]"
        />
      </span>
      <div className="flex flex-col leading-none">
        <span className={`font-heading text-2xl font-extrabold tracking-tight transition-colors ${
          light ? "text-white group-hover:text-secondary" : "text-primary group-hover:text-primary/90"
        }`}>
          Mohollah
        </span>
        <span className={`text-[10px] font-semibold tracking-wider uppercase ${
          light ? "text-neutral-content/60" : "text-base-content/50"
        }`}>
          মহল্লা • Dhaka Community
        </span>
      </div>
    </Link>
  );
}
