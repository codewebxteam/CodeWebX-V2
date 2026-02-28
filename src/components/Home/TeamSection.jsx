import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Plus } from "lucide-react";

// Infinite wrapping logic
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const TeamSection = () => {
  const team = [
    {
      id: 1,
      name: "Arjun Singh",
      role: "Chief Architect",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      name: "Sanya Verma",
      role: "UI/UX Lead",
      img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      name: "Ishan Sharma",
      role: "App Developer",
      img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      name: "Meera Reddy",
      role: "Backend Expert",
      img: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 5,
      name: "Vikram Raj",
      role: "Full Stack Dev",
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 6,
      name: "Neha Kapoor",
      role: "Marketing Head",
      img: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  // Animation values
  const baseX = useMotionValue(0);
  const scrollVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // 33.33% because list is tripled
  const x = useTransform(baseX, (v) => `${wrap(-33.33, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -2 * (delta / 1000); // Normal speed

    if (smoothVelocity.get() !== 0) {
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="bg-white pt-0 pb-24 md:pb-32 px-6 md:px-16 text-black overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto">
        {/* Header - No Padding Top */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 pt-12 border-t border-zinc-50">
          <h2 className="text-5xl md:text-7xl font-ultra-thin tracking-tighter leading-none">
            Team <br /> <span className="italic font-light">CodeWebX</span>
          </h2>

          <div className="lg:w-1/2 flex flex-col items-start gap-8">
            <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed">
              Our team works together to deliver user-focused mobile apps and
              websites in Uttar Pradesh.
            </p>
            <button className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl">
              <Plus
                size={18}
                className="group-hover:rotate-90 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Join Our Journey
              </span>
            </button>
          </div>
        </div>

        {/* The Carousel */}
        <div className="relative w-full cursor-grab active:cursor-grabbing">
          <motion.div
            className="flex gap-6 py-4"
            style={{ x }}
            drag="x"
            onDrag={(e, info) => {
              scrollVelocity.set(info.velocity.x);
              baseX.set(baseX.get() + info.delta.x / 100);
            }}
            onDragEnd={() => scrollVelocity.set(0)}
          >
            {[...team, ...team, ...team].map((member, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-[280px] md:w-[380px] aspect-[3/4] rounded-[2.5rem] overflow-hidden group border border-zinc-100"
              >
                <img
                  src={member.img}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                  alt={member.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <span className="text-white text-3xl font-black uppercase tracking-tighter leading-none mb-1">
                    {member.name}
                  </span>
                  <span className="text-lime-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
