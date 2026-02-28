import React from "react";

const InternTestimonials = () => {
  return (
    <section className="bg-white text-black py-24 px-6 md:px-16">
      <h2 className="text-5xl md:text-7xl font-ultra-thin mb-16">Intern <span className="italic">Voices</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-8 border border-zinc-100 rounded-[2rem] hover:shadow-xl transition-shadow">
            <p className="text-lg font-light mb-6 italic">"Working at CodeWebX gave me real-world experience on projects like Hello 11."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-200 rounded-full"></div>
              <div>
                <p className="font-bold text-sm">Intern Name</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Web Developer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InternTestimonials;