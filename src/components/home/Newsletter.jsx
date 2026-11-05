"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { emailOk } from "@/lib/validators";
import { AREAS } from "@/lib/constants";
import FadeUp from "@/components/FadeUp";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [selectedArea, setSelectedArea] = useState("All Dhaka");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!emailOk(email)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }
    setError("");
    setSubscribed(true);
    toast.success(`Subscribed! You'll receive Thursday alerts for ${selectedArea}.`);
  }

  return (
    <section className="relative overflow-hidden pb-20 md:pb-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-10 h-72 ambient-glow-center" aria-hidden="true" />
      <div className="container-page relative">
        <FadeUp className="beatsync-card relative overflow-hidden rounded-3xl border border-base-300/80 bg-base-100/90 p-8 shadow-2xl backdrop-blur-xl md:p-14">
          <div className="stripe absolute inset-x-0 top-0 h-1.5" />

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3">
                <Sparkles className="h-3.5 w-3.5" /> Thursday Mohollah Dispatch
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Don&apos;t Just Watch.{" "}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                  Be the Change.
                </span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-base-content/75 md:text-lg">
                One short, clutter-free email with upcoming drives happening around your corner. No spam, no sponsors, unsubscribe whenever.
              </p>

              {/* Area preference selector */}
              <div className="mt-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-base-content/60">
                  Select your primary neighbourhood:
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {["All Dhaka", "Mirpur", "Uttara", "Dhanmondi", "Mohammadpur"].map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setSelectedArea(area)}
                      className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${
                        selectedArea === area
                          ? "bg-primary text-primary-content shadow-md shadow-primary/20 scale-105"
                          : "border border-base-300/80 bg-base-100/70 text-base-content/70 hover:border-primary hover:text-primary hover:bg-base-200"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {subscribed ? (
                <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center animate-in zoom-in-95 duration-300">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success text-success-content shadow-md">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-base-content">
                    You&apos;re on the Thursday Dispatch!
                  </h3>
                  <p className="mt-2 text-sm text-base-content/75">
                    We&apos;ll send weekend drives in <strong>{selectedArea}</strong> directly to <strong>{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubscribed(false);
                      setEmail("");
                    }}
                    className="btn btn-ghost btn-sm mt-4 rounded-full text-xs"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="rounded-3xl border border-base-300/80 bg-base-200/50 p-6 shadow-md backdrop-blur-xl md:p-8">
                  <label htmlFor="newsletter-email" className="block text-xs font-bold uppercase tracking-wider text-base-content/70">
                    Your email address
                  </label>
                  <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/40" />
                      <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="yourname@domain.com"
                        className={`input input-bordered w-full rounded-full pl-11 text-sm bg-base-100 border-base-300/80 focus:border-primary ${error ? "input-error" : ""}`}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary rounded-full px-7 font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                      Subscribe
                    </button>
                  </div>
                  {error && <p className="mt-2 text-xs text-error font-medium" role="alert">{error}</p>}
                  <p className="mt-3 text-[11px] text-base-content/50">
                    🔒 Zero commercial ads. We only ping when real humans in your area need volunteers.
                  </p>
                </form>
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
