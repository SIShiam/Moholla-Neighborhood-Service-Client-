"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { urlOk } from "@/lib/validators";
import RequireAuth from "@/components/RequireAuth";
import Field from "@/components/Field";
import Avatar from "@/components/Avatar";
import SectionHeading from "@/components/SectionHeading";

function ProfileForm({ user }) {
  const [values, setValues] = useState({ name: user.name || "", image: user.image || "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function submit(e) {
    e.preventDefault();
    const found = {};
    if (values.name.trim().length < 2) found.name = "Enter your name (at least 2 letters).";
    if (values.image.trim() && !urlOk(values.image)) found.image = "Enter a full photo link starting with http:// or https://.";
    setErrors(found);
    if (Object.keys(found).length) return toast.error("Check the fields marked in red.");

    setBusy(true);
    const { error } = await authClient.updateUser({ name: values.name.trim(), image: values.image.trim() });
    setBusy(false);
    if (error) return toast.error(error.message || "We could not save your profile.");
    toast.success("Profile updated.");
  }

  return (
    <section className="container-page max-w-2xl py-12 md:py-16">
      <SectionHeading title="Your profile">Your name and photo appear on the events you host.</SectionHeading>
      <div className="mt-8 rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
        <div className="mb-8 flex items-center gap-4">
          <Avatar key={values.image} src={values.image} name={values.name} size={72} />
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold">{user.name}</p>
            <p className="truncate text-base-content/70">{user.email}</p>
          </div>
        </div>
        <form onSubmit={submit} noValidate className="space-y-5">
          <Field id="name" label="Display name" error={errors.name}>
            <input id="name" value={values.name} onChange={set("name")} className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`} />
          </Field>
          <Field id="image" label="Photo link" error={errors.image}>
            <input id="image" value={values.image} onChange={set("image")} className={`input input-bordered w-full ${errors.image ? "input-error" : ""}`} />
          </Field>
          <button type="submit" disabled={busy} className="btn btn-primary px-8">
            {busy ? <><span className="loading loading-spinner loading-sm" />Saving</> : "Save profile"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Loaded() {
  const { data: session } = authClient.useSession();
  return session ? <ProfileForm user={session.user} /> : null;
}

export default function ProfilePage() {
  return (
    <RequireAuth>
      <Loaded />
    </RequireAuth>
  );
}
