"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { emailOk, passwordError } from "@/lib/validators";
import AuthShell from "./AuthShell";
import Field from "./Field";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const raw = useSearchParams().get("next") || "/";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";

  const [values, setValues] = useState({ name: "", email: "", password: "" });
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
    if (!emailOk(values.email)) found.email = "Enter a valid email address, like name@example.com.";
    const pw = passwordError(values.password);
    if (pw) found.password = pw;
    setErrors(found);
    if (Object.keys(found).length) return toast.error(pw && Object.keys(found).length === 1 ? pw : "Check the fields marked in red.");

    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    });
    setBusy(false);

    if (error) {
      const taken = /exist|already/i.test(error.message || "");
      return toast.error(taken ? "An account with this email already exists. Try logging in." : error.message || "We could not create your account.");
    }
    toast.success(`Welcome to Mohollah, ${values.name.trim().split(" ")[0]}. Your account is ready.`);
    router.push(next);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes a minute. Then you can join any event."
      footer={<>Already registered? <Link href={`/login${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-primary hover:underline">Login</Link></>}
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" autoComplete="name" value={values.name} onChange={set("name")} className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`} />
        </Field>
        <Field id="password" label="Password" error={errors.password} hint="At least 6 characters with one uppercase and one lowercase letter.">
          <PasswordInput id="password" autoComplete="new-password" value={values.password} onChange={set("password")} error={errors.password} />
        </Field>
        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary w-full rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all py-3 cursor-pointer"
        >
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Register"}
        </button>
      </form>
      <div className="divider my-6 text-sm">or</div>
      <GoogleButton next={next} />
    </AuthShell>
  );
}
