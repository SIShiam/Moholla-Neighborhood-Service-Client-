"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CalendarPlus, ListChecks, HeartHandshake, UserRound, Menu, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Host a Drive" },
];

const menu = [
  { href: "/create-event", label: "Create Event", icon: CalendarPlus },
  { href: "/manage-events", label: "Manage Events", icon: ListChecks },
  { href: "/joined-events", label: "Joined Events", icon: HeartHandshake },
  { href: "/profile", label: "My Profile", icon: UserRound },
];

const closeMenu = () => document.activeElement?.blur();

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  async function logout() {
    closeMenu();
    await authClient.signOut();
    toast.success("You have been signed out.");
    router.push("/");
  }

  const linkClass = (href) => {
    const isActive = mounted && pathname === href;
    return `rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
      isActive
        ? "bg-primary/15 text-primary border border-primary/30 shadow-sm"
        : "text-base-content/75 hover:text-primary hover:bg-base-200/60"
    }`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/80 bg-base-100/80 backdrop-blur-xl transition-colors">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle btn-sm" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-2xl border border-base-300/80 bg-base-100/95 p-2 shadow-2xl backdrop-blur-xl">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={closeMenu} className="font-semibold">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {!mounted || isPending ? (
            <div className="skeleton h-9 w-24 rounded-full" aria-hidden="true" />
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <div className="group relative">
                  <button tabIndex={0} className="grid rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-base-100 transition-transform hover:scale-105" aria-label="Open account menu">
                    <Avatar src={user.image} name={user.name} size={36} />
                  </button>
                  <span className="pointer-events-none absolute right-0 top-full z-50 mt-2 hidden whitespace-nowrap rounded-lg bg-neutral px-2.5 py-1 text-xs font-semibold text-neutral-content shadow-lg group-hover:block">
                    {user.name}
                  </span>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-60 rounded-2xl border border-base-300/80 bg-base-100/95 p-2 shadow-2xl backdrop-blur-xl">
                  <li className="menu-title truncate text-xs font-semibold uppercase tracking-wider text-base-content/50">{user.email}</li>
                  {menu.map(({ href, label, icon: Icon }) => (
                    <li key={href}>
                      <Link href={href} onClick={closeMenu} className="rounded-xl font-medium">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={logout} className="btn btn-outline btn-sm rounded-full px-4 gap-1.5 border-base-300 hover:border-error hover:bg-error hover:text-white transition-all">
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm rounded-full px-6 font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
