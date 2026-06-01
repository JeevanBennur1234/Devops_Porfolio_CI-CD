import { motion } from 'framer-motion';
import { portfolioContent } from '../../data/content';
import { Award } from 'lucide-react';

export default function Certifications() {
  const { certifications } = portfolioContent;

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Certification</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 max-w-xs"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-primary-500/10 transition-all group"
            >
              <Award className="w-10 h-10 text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{cert.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
