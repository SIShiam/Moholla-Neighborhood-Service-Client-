import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="font-heading text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-bold">This street is not on our map</h1>
      <p className="mx-auto mt-3 max-w-md text-base-content/70">The page you opened does not exist or has moved. Head back to the events board.</p>
      <Link href="/events" className="btn btn-primary mt-8 px-6">View upcoming events</Link>
    </section>
  );
}
