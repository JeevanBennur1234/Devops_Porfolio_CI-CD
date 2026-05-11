import React from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../../data/content';
import { GraduationCap, Award } from 'lucide-react';

export default function Education() {
  const { education, certifications } = portfolioContent;

  return (
    <section id="education" className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Education & Certifications</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 max-w-xs"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary-500" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">{edu.institution}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-mono">{edu.year}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary-500" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl p-4 shadow-sm hover:border-primary-500 transition-colors">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{cert.name}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{cert.year}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
