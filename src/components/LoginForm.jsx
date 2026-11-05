"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { emailOk } from "@/lib/validators";
import AuthShell from "./AuthShell";
import Field from "./Field";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const raw = useSearchParams().get("next") || "/";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function submit(e) {
    e.preventDefault();
    const found = {};
    if (!emailOk(values.email)) found.email = "Enter a valid email address, like name@example.com.";
    if (!values.password) found.password = "Enter your password.";
    setErrors(found);
    if (Object.keys(found).length) return toast.error("Check the fields marked in red.");

    setBusy(true);
    const { error } = await authClient.signIn.email({ email: values.email.trim(), password: values.password });
    setBusy(false);

    if (error) {
      return toast.error(error.status === 401 || error.status === 400 ? "That email and password do not match. Try again." : error.message || "We could not sign you in.");
    }
    toast.success("Welcome back. You are signed in.");
    router.push(next);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to join events and manage the ones you host."
      footer={<>New to Mohollah? <Link href={`/register${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-primary hover:underline">Create an account</Link></>}
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`} />
        </Field>
        <Field id="password" label="Password" error={errors.password}>
          <PasswordInput id="password" autoComplete="current-password" value={values.password} onChange={set("password")} error={errors.password} />
        </Field>
        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary w-full rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all py-3 cursor-pointer"
        >
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Login"}
        </button>
      </form>
      <div className="divider my-6 text-sm">or</div>
      <GoogleButton next={next} />
    </AuthShell>
  );
}
