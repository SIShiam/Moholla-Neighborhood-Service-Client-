"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FadeUp from "@/components/FadeUp";

const faqs = [
  {
    q: "Do I have to pay anything to volunteer or host an event?",
    a: "No, never. Mohollah is 100% free for volunteers and community organisers. All events posted are grassroots initiatives where neighbours donate their time, energy, and care.",
  },
  {
    q: "Can any Dhaka resident post a drive on Mohollah?",
    a: "Yes. Simply sign in with your email or Google account, click 'Host an event', and fill in the meeting place, date, description, and required headcount. We automatically filter out past dates.",
  },
  {
    q: "What happens when I click 'Join Event'?",
    a: "The drive is instantly saved to your 'Joined Events' list so you don't lose track of it. The organizer's volunteer quota updates in real time, and you'll receive reminders before the weekend.",
  },
  {
    q: "Can I leave an event if my schedule changes?",
    a: "Absolutely. We understand plans change. You can leave the event directly from the event details page or your 'Joined Events' tab. Your spot will immediately reopen for another neighbour.",
  },
  {
    q: "How do volunteers communicate on the day of the drive?",
    a: "Organisers list exact landmarks and meeting times. Once registered, organisers share a WhatsApp invite link or community phone number so everyone stays synced on the ground.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => setOpenIdx((current) => (current === idx ? -1 : idx));

  return (
    <section className="section relative overflow-hidden bg-base-200">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[450px] ambient-glow-center" aria-hidden="true" />
      <div className="container-page relative max-w-4xl">
        <FadeUp className="mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <HelpCircle className="h-3.5 w-3.5" /> Support & Guidance
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-base-content/70 md:text-lg">
            Answers to common questions about volunteering, hosting neighbourhood drives, and ground safety in Dhaka.
          </p>
        </FadeUp>

        <FadeUp delay={100} className="mt-12 divide-y divide-base-300/80 border-y border-base-300/80">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="group py-5 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between text-left font-heading text-base font-bold text-base-content transition-colors group-hover:text-primary sm:text-lg"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-base-content/50 transition-all duration-300 group-hover:text-primary ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-3 text-sm leading-relaxed text-base-content/75 animate-in fade-in-50 duration-200 md:text-base">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </FadeUp>
      </div>
    </section>
  );
}

