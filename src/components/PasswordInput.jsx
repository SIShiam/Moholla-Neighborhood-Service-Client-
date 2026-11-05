"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ id, value, onChange, error, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input id={id} type={show ? "text" : "password"} value={value} onChange={onChange} autoComplete={autoComplete} className={`input input-bordered w-full pr-11 ${error ? "input-error" : ""}`} />
      <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content" aria-label={show ? "Hide password" : "Show password"}>
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}
