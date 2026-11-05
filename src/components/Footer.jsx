import Link from "next/link";
import { Facebook, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

function XLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { label: "X", href: "https://x.com", icon: XLogo },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "GitHub", href: "https://github.com", icon: Github },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-base-300/80 bg-base-200 text-base-content">
      <div className="stripe" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-base-content/70">
            A grassroots community noticeboard for Dhaka&apos;s neighbourhoods. Post a drive, find one near you, and turn up.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-base-300/80 bg-base-100/60 text-base-content/75 transition-all duration-300 hover:border-primary hover:text-primary hover:scale-110 active:scale-95 shadow-sm"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-base-content">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-base-content/70">
            <li><Link className="transition-colors hover:text-primary" href="/events">Upcoming Events</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/create-event">Host an event</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/joined-events">Joined Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-base-content">Account</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-base-content/70">
            <li><Link className="transition-colors hover:text-primary" href="/login">Login</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/register">Create an account</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/profile">My Profile</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-base-content">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-base-content/70">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />Mirpur 10, Dhaka 1216, Bangladesh</li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a href="mailto:shiamsalmir@gmail.com" className="transition-colors hover:text-primary">
                shiamsalmir@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-base-300/80 bg-base-100/40">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-base-content/60 sm:flex-row">
          <p>© 2026 Mohollah. Built for Dhaka communities.</p>
          <div className="flex gap-4">
            <Link href="/events" className="hover:text-primary">Events</Link>
            <Link href="/create-event" className="hover:text-primary">Host</Link>
            <Link href="/profile" className="hover:text-primary">Account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
