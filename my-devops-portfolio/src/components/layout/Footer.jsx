import { portfolioContent } from '../../data/content';
import { Code2, Briefcase, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const { contact, hero } = portfolioContent;

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">{hero.name}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">{hero.title}</p>
          </div>
          
          <div className="flex gap-4">
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-2 bg-white dark:bg-slate-800 rounded-full hover:text-primary-500 hover:-translate-y-1 transition-all">
              <Code2 className="w-5 h-5" />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-2 bg-white dark:bg-slate-800 rounded-full hover:text-primary-500 hover:-translate-y-1 transition-all">
              <Briefcase className="w-5 h-5" />
            </a>
            <a href={contact.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="p-2 bg-white dark:bg-slate-800 rounded-full hover:text-primary-500 hover:-translate-y-1 transition-all">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href={`mailto:${contact.email}`} aria-label="Email Me" className="p-2 bg-white dark:bg-slate-800 rounded-full hover:text-primary-500 hover:-translate-y-1 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} {hero.name}. All rights reserved.</p>
          <p className="mt-1">Built with React, Tailwind CSS, and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
