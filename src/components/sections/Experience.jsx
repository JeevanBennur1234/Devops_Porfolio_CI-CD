import { motion } from 'framer-motion';
import { portfolioContent } from '../../data/content';

export default function Experience() {
  const { experience } = portfolioContent;

  return (
    <section id="experience" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Experience</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 max-w-xs"></div>
        </motion.div>

        <div className="space-y-12">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
                <div className="mb-2 md:mb-0 md:col-span-1 md:text-right mt-1">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 font-mono">
                    {exp.duration}
                  </span>
                </div>
                
                <div className="md:col-span-3 relative pb-8 md:pb-0 border-l-2 md:border-l-0 border-slate-200 dark:border-slate-700 pl-6 md:pl-0 last:border-0 last:pb-0">
                  <span className="absolute -left-[31px] md:hidden top-1 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-dark-bg"></span>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {exp.role} 
                    <span className="text-primary-500">@ {exp.company}</span>
                  </h3>
                  
                  <ul className="mt-4 space-y-3">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="text-slate-600 dark:text-slate-400 text-sm md:text-base flex gap-3">
                        <span className="text-primary-500 mt-1.5">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
