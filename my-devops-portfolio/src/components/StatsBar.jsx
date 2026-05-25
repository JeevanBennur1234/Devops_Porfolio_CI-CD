import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Briefcase, Code2, Award, Cpu } from 'lucide-react';

const iconMap = {
  experience: Briefcase,
  projects: Code2,
  certifications: Award,
  tools: Cpu,
};

function Counter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsBar() {
  const { stats } = portfolioContent;

  return (
    <section className="py-12 bg-primary-600 dark:bg-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(stats).map(([key, stat], index) => {
            const Icon = iconMap[key] || Briefcase;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="w-8 h-8 text-white/80 mx-auto mb-3" />
                <div className="text-4xl font-extrabold text-white mb-1">
                  <Counter value={stat.value} />
                  <span className="text-primary-300">+</span>
                </div>
                <div className="text-sm text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
