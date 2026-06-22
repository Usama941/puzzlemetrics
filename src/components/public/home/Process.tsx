"use client";

import { Layers, Rocket, Search } from "lucide-react";
import { motion } from "framer-motion";
import { sectionFadeUp } from "@/lib/animations";

const STEPS: {
  title: string;
  body: string;
  Icon: typeof Search;
}[] = [
  {
    title: "Discovery",
    body: "We audit your data infrastructure, business goals and systems to map your highest-leverage AI opportunities.",
    Icon: Search,
  },
  {
    title: "Architecture",
    body: "We design your AI pipeline, agent logic, RAG systems and integrations — all tailored to your domain.",
    Icon: Layers,
  },
  {
    title: "Deployment",
    body: "We ship, integrate and continuously optimise your AI in production with full monitoring and support.",
    Icon: Rocket,
  },
];

export function Process() {
  return (
    <section className="bg-[#F4F3FC] px-[clamp(24px,5vw,80px)] py-[clamp(80px,10vh,140px)] dark:bg-[#0F0E28]">
      <motion.div className="mx-auto max-w-[1280px]" {...sectionFadeUp}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-syne text-[clamp(32px,4vw,48px)] font-extrabold text-[#0D0B1A] dark:text-[#FAFAFE]">
            The Blueprint to Deployment
          </h2>
          <p className="mt-4 font-sans text-[18px] font-normal italic leading-relaxed text-[#4A4870] dark:text-[#C4C2E8]">
            From first conversation to full operation
          </p>
        </div>

        <div className="relative mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            {STEPS.map(({ title, body, Icon }, i) => (
              <div
                key={title}
                className={`relative rounded-card border border-[#D6D3F0] bg-white p-9 shadow-none transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(96,85,217,0.1)] dark:border-[#2a2748] dark:bg-[#08071A] md:px-8 ${i > 0 ? "md:border-l md:border-dashed md:border-[#D6D3F0] dark:md:border-[#2a2748]" : ""}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#EDEAFF] text-[#6055D9]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-6 font-syne text-[19px] font-bold text-[#0D0B1A] dark:text-[#FAFAFE]">{title}</h3>
                <p className="mt-3 font-sans text-[14px] font-light leading-[1.7] text-[#4A4870] dark:text-[#C4C2E8]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Process;
