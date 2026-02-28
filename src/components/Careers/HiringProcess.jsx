import React from "react";

const HiringProcess = () => {
  const steps = ["Apply", "Task", "Interview", "Onboarding"];
  return (
    <section className="py-24 px-6 md:px-16 border-t border-zinc-900">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col gap-4">
            <span className="text-5xl font-black text-zinc-800">0{i+1}</span>
            <h4 className="text-xs font-black uppercase tracking-[0.4em]">{step}</h4>
            <div className="h-[2px] w-full bg-zinc-900 group-hover:bg-white transition-all"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HiringProcess;