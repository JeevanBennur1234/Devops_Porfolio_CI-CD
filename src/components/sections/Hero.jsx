import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { portfolioContent } from '../../data/content';
import { ArrowRight, Download, Mail } from 'lucide-react';

export default function Hero() {
  const { hero } = portfolioContent;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-primary-500 font-semibold tracking-widest uppercase text-sm sm:text-base mb-6">
            Hi, my name is
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            {hero.name}.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-600 dark:text-slate-400 mb-8 tracking-tight">
            {hero.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            {hero.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              offset={-70}
              className="cursor-pointer inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors shadow-lg shadow-primary-500/30 w-full sm:w-auto"
            >
              View Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume PDF"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all w-full sm:w-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
            >
              Download Resume
              <Download className="ml-2 w-5 h-5" />
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              className="cursor-pointer inline-flex items-center justify-center px-8 py-4 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-medium transition-colors shadow-lg w-full sm:w-auto"
            >
              Contact Me
              <Mail className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
