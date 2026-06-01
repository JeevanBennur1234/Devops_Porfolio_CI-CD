import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioContent } from '../../data/content';
import { Calendar, Tag, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

function readingTime(text) {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function PostList({ posts, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.article
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => onSelect(index)}
          className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:shadow-primary-500/5 hover:border-primary-500/50 transition-all duration-300 flex flex-col group"
        >
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime(post.content)} min read
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-1.5">
              {post.tags?.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            <ChevronRight className="w-5 h-5 text-primary-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function PostDetail({ post, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to articles
      </button>

      <article className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readingTime(post.content)} min read
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags?.map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-code:text-primary-700 dark:prose-code:text-primary-300 prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </motion.div>
  );
}

export default function Blog() {
  const { blog } = portfolioContent;
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!blog || blog.length === 0) {
    return (
      <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Blog</h2>
          <p className="text-slate-500 dark:text-slate-400">No articles yet. Check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Latest Articles</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 max-w-xs" />
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedIndex !== null ? (
            <PostDetail
              key="detail"
              post={blog[selectedIndex]}
              onBack={() => setSelectedIndex(null)}
            />
          ) : (
            <PostList
              key="list"
              posts={blog}
              onSelect={setSelectedIndex}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
