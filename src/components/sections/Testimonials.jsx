import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioContent } from '../../data/content';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const { testimonials } = portfolioContent;
  const [index, setIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">What People Say</h2>
          <div className="w-24 h-1 bg-primary-500 rounded-full" />
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <Quote className="w-10 h-10 text-primary-500/30 mb-4" />
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prev} className="p-2 rounded-full bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border hover:border-primary-500 transition-colors">
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? 'bg-primary-500 w-6' : 'bg-slate-300 dark:bg-slate-600'}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-full bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border hover:border-primary-500 transition-colors">
                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
