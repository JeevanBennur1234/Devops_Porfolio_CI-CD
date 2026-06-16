import { motion } from 'framer-motion';
import { portfolioContent } from '../../data/content';
import { Server } from 'lucide-react';

export default function About() {
  const { about } = portfolioContent;

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">About Me</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 max-w-xs"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {about.text.map((paragraph, index) => (
              <p key={index} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-primary-500/20 group-hover:bg-transparent transition-colors duration-300 z-10 rounded-2xl"></div>
              {/* Profile picture placeholder — replace with an <img> tag pointing to your photo */}
              <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-4 border-white dark:border-slate-800 rounded-2xl">
                <Server className="w-32 h-32 text-slate-400 dark:text-slate-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
