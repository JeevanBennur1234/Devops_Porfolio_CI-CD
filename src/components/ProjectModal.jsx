import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2 } from 'lucide-react';
import ImageSkeleton from './ImageSkeleton';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-dark-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-dark-border"
        >
          <div className="relative">
            {project.image && (
              <ImageSkeleton
                src={project.image}
                alt={project.title}
                className="w-full h-56 rounded-t-2xl"
              />
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {project.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 text-xs font-bold rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              {project.details || project.description}
            </p>

            <div className="flex gap-4">
              {project.github && project.github !== '#' && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-medium transition-colors text-sm">
                  <Code2 className="w-4 h-4" />
                  View Source
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {(!project.github || project.github === '#') && (!project.live || project.live === '#') && (
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">Links coming soon</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
