import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../../data/content';
import { Star, GitFork, Users, Code2, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const defaultStats = {
  repos: 0,
  stars: 0,
  forks: 0,
  followers: 0,
  gists: 0,
};

export default function GitHubStats() {
  const { github } = portfolioContent.contact;
  const username = github?.split('/').filter(Boolean).pop();
  const [stats, setStats] = useState(defaultStats);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(!!username && username !== 'github.com');

  useEffect(() => {
    if (!username || username === 'github.com') return;
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const userData = await userRes.json();
        const repos = await reposRes.json();

        if (cancelled) return;

        setStats({
          repos: userData.public_repos || 0,
          stars: repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0),
          forks: repos.reduce((acc, r) => acc + (r.forks_count || 0), 0),
          followers: userData.followers || 0,
          gists: userData.public_gists || 0,
        });
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStats();
    return () => { cancelled = true; };
  }, [username]);

  if (!username || username === 'github.com') return null;

  const items = [
    { label: 'Repositories', value: stats.repos, icon: Code2 },
    { label: 'Stars', value: stats.stars, icon: Star },
    { label: 'Forks', value: stats.forks, icon: GitFork },
    { label: 'Followers', value: stats.followers, icon: Users },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">GitHub Activity</h2>
            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 max-w-xs hidden md:block" />
          </div>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
          >
            <FaGithub className="w-5 h-5" />
            @{username}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-6 animate-pulse">
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <FaGithub className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Unable to load GitHub stats. Rate limit may be exceeded.</p>
            <a href={github} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary-500 hover:text-primary-400 font-medium">
              View profile directly →
            </a>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-6 hover:shadow-lg hover:border-primary-500/50 transition-all"
                >
                  <Icon className="w-6 h-6 text-primary-500 mb-3" />
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                    {item.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{item.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
