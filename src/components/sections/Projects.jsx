import React from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../../data/content';
import { Code2, ExternalLink, FolderGit2 } from 'lucide-react';

export default function Projects() {
  const { projects } = portfolioContent;

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-primary-500 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800/80">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderGit2 className="w-20 h-20 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors duration-300"></div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3 text-slate-400">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="hover:text-primary-500 hover:scale-110 transition-all">
                      <Code2 className="w-6 h-6" />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="hover:text-primary-500 hover:scale-110 transition-all">
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-bold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
