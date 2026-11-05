import ZoomIn from "./ZoomIn";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 min-h-[calc(100vh-4rem)] flex items-center">
      {/* Studio ambient radial lighting */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[550px] ambient-glow-top" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[450px] w-[450px] ambient-glow-bottom opacity-50" aria-hidden="true" />

      <div className="container-page relative grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <ZoomIn delay={0} className="hidden lg:block">
          <p className="font-body text-8xl font-bold leading-none text-primary/15" aria-hidden="true">
            মহল্লা
          </p>
          <h2 className="mt-6 max-w-sm text-4xl font-extrabold leading-tight text-base-content">
            Your neighbourhood is already organising.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-base-content/75">
            Sign in to host a drive, join one near you and keep track of everything you have signed up for.
          </p>
        </ZoomIn>

        <ZoomIn delay={100} className="w-full">
          <div className="mx-auto w-full max-w-md beatsync-card rounded-3xl border border-base-300/80 bg-base-100/90 p-7 sm:p-10 shadow-2xl backdrop-blur-xl">
            <h1 className="font-heading text-3xl font-extrabold text-base-content">{title}</h1>
            <p className="mt-2 text-sm text-base-content/70">{subtitle}</p>
            <div className="mt-7">{children}</div>
            <p className="mt-6 text-center text-sm text-base-content/70">{footer}</p>
          </div>
        </ZoomIn>
      </div>
    </section>
  );
}
