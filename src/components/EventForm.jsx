"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Field from "./Field";
import Thumb from "./Thumb";
import { TYPE_NAMES, AREAS } from "@/lib/constants";
import { eventErrors } from "@/lib/validators";
import { toLocalInput } from "@/lib/format";
import { Image as ImageIcon, MapPin } from "lucide-react";

const empty = { title: "", description: "", eventType: "", thumbnail: "", location: "", eventDate: "", volunteersNeeded: "20" };

const quickLocations = [
  "Mirpur 10 roundabout, Dhaka",
  "Dhanmondi 27 Lake, Dhaka",
  "Uttara Sector 10 Lake Road, Dhaka",
  "Mohammadpur Town Hall, Dhaka",
  "Hatirjheel Walkway, Dhaka",
];

export default function EventForm({ initial, onSubmit, submitLabel, busyLabel }) {
  const original = initial ? toLocalInput(initial.eventDate) : "";
  const [values, setValues] = useState(
    initial ? { ...initial, eventDate: original, volunteersNeeded: String(initial.volunteersNeeded) } : empty
  );
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };
  const cls = (key) => `w-full ${key === "description" ? "textarea" : key === "eventType" ? "select" : "input"} textarea-bordered input-bordered select-bordered ${errors[key] ? "input-error textarea-error select-error" : ""}`;

  async function submit(e) {
    e.preventDefault();
    const found = eventErrors(values, { allowSameDate: original });
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error("Some fields need a fix. They are marked in red.");
      return;
    }
    setBusy(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        eventType: values.eventType,
        thumbnail: values.thumbnail.trim(),
        location: values.location.trim(),
        eventDate: new Date(values.eventDate).toISOString(),
        volunteersNeeded: Number(values.volunteersNeeded),
      });
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field id="title" label="Event title" error={errors.title}>
          <input id="title" className={cls("title")} value={values.title} onChange={set("title")} placeholder="Winter Clothes Distribution" />
        </Field>
      </div>

      <Field id="eventType" label="Event type" error={errors.eventType}>
        <select id="eventType" className={cls("eventType")} value={values.eventType} onChange={set("eventType")}>
          <option value="" disabled>Choose a type</option>
          {TYPE_NAMES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>

      <Field id="volunteersNeeded" label="Volunteers needed" error={errors.volunteersNeeded} hint="The progress bar on the event card counts up to this number.">
        <input id="volunteersNeeded" type="number" min="1" max="1000" className={cls("volunteersNeeded")} value={values.volunteersNeeded} onChange={set("volunteersNeeded")} />
      </Field>

      <div className="sm:col-span-2">
        <Field id="location" label="Meeting place" error={errors.location} hint="Include specific landmark in Dhaka (e.g. circle, gate, bridge).">
          <input id="location" className={cls("location")} value={values.location} onChange={set("location")} placeholder="Mirpur 10 roundabout, Dhaka" />
        </Field>
        {/* Quick location chips */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-base-content/50 font-medium">Suggestions:</span>
          {quickLocations.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setValues((v) => ({ ...v, location: loc }));
                if (errors.location) setErrors((er) => ({ ...er, location: undefined }));
              }}
              className="rounded-full border border-base-300/80 bg-base-200/70 px-3 py-1 text-base-content/80 hover:border-primary/60 hover:bg-primary hover:text-primary-content hover:scale-105 active:scale-95 transition-all cursor-pointer font-medium"
            >
              {loc.split(",")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="sm:col-span-2">
        <Field id="eventDate" label="Date and time" error={errors.eventDate}>
          <input id="eventDate" type="datetime-local" min={toLocalInput(new Date())} className={cls("eventDate")} value={values.eventDate} onChange={set("eventDate")} />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field id="thumbnail" label="Thumbnail image link" error={errors.thumbnail} hint="Paste a link to a photo. A high quality category photo will be used automatically if left empty.">
          <input id="thumbnail" className={cls("thumbnail")} value={values.thumbnail} onChange={set("thumbnail")} placeholder="https://example.com/photo.jpg" />
        </Field>

        {/* Live Photo Preview */}
        <div className="mt-3 flex items-center gap-4 rounded-2xl border border-base-300/80 bg-base-200/50 p-3.5 backdrop-blur-sm">
          <div className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-xl border border-base-300/80 shadow-inner">
            <Thumb
              src={values.thumbnail}
              type={values.eventType || "Donation"}
              title={values.title || "Preview"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="min-w-0 text-xs">
            <p className="font-bold text-base-content">
              {values.thumbnail ? "Custom Photo Preview" : "Default Category Photo"}
            </p>
            <p className="mt-0.5 text-base-content/60">
              {values.thumbnail ? "Your provided URL is shown above." : "We'll show a verified category image if you don't provide a URL."}
            </p>
          </div>
        </div>
      </div>

      <div className="sm:col-span-2">
        <Field id="description" label="What will happen?" error={errors.description} hint="Say what to bring, where to meet and when it ends.">
          <textarea id="description" rows={5} className={cls("description")} value={values.description} onChange={set("description")} />
        </Field>
      </div>

      <div className="sm:col-span-2 pt-2">
        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary rounded-full px-8 py-3.5 font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {busy ? <><span className="loading loading-spinner loading-sm" />{busyLabel}</> : submitLabel}
        </button>
      </div>
    </form>
  );
}
