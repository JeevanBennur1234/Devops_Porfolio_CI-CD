import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function BlogPlaceholder() {
  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Latest Articles</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 max-w-xs"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
            <BookOpen className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Blog Coming Soon</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            I'm currently working on setting up a blog to share my thoughts on DevOps, Cloud Infrastructure, and Automation. Check back later for articles!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
