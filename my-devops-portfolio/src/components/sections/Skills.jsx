import { motion } from 'framer-motion';
import { portfolioContent } from '../../data/content';
import {
  FaAws, FaDocker, FaJenkins, FaGitAlt, FaLinux, FaCloud
} from 'react-icons/fa';
import {
  SiKubernetes, SiTerraform, SiPrometheus, SiAnsible, SiGithubactions,
  SiGooglecloud, SiHelm, SiGitlab, SiGrafana,
  SiPython, SiGnubash, SiGo, SiNodedotjs
} from 'react-icons/si';

const iconMap = {
  "AWS": <FaAws className="w-7 h-7 text-[#FF9900]" />,
  "GCP": <SiGooglecloud className="w-7 h-7 text-[#4285F4]" />,
  "Azure": <FaCloud className="w-7 h-7 text-[#0089D6]" />,
  "Linux": <FaLinux className="w-7 h-7 text-slate-800 dark:text-white" />,
  "Docker": <FaDocker className="w-7 h-7 text-[#2496ED]" />,
  "Kubernetes": <SiKubernetes className="w-7 h-7 text-[#326CE5]" />,
  "Helm": <SiHelm className="w-7 h-7 text-[#0F1689]" />,
  "Jenkins": <FaJenkins className="w-7 h-7 text-[#D24939]" />,
  "GitHub Actions": <SiGithubactions className="w-7 h-7 text-[#2088FF]" />,
  "GitLab CI": <SiGitlab className="w-7 h-7 text-[#FCA121]" />,
  "Terraform": <SiTerraform className="w-7 h-7 text-[#7B42BC]" />,
  "Ansible": <SiAnsible className="w-7 h-7 text-[#EE0000]" />,
  "Prometheus": <SiPrometheus className="w-7 h-7 text-[#E6522C]" />,
  "Grafana": <SiGrafana className="w-7 h-7 text-[#F46800]" />,
  "Python": <SiPython className="w-7 h-7 text-[#3776AB]" />,
  "Bash": <SiGnubash className="w-7 h-7 text-[#4EAA25]" />,
  "Go": <SiGo className="w-7 h-7 text-[#00ADD8]" />,
  "Node.js": <SiNodedotjs className="w-7 h-7 text-[#339933]" />,
  "Git": <FaGitAlt className="w-7 h-7 text-[#F05032]" />
};

function SkillItem({ name, level }) {
  const hasLevel = typeof level === 'number';
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {iconMap[name] || <FaLinux className="w-7 h-7 text-slate-400" />}
        </div>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex-1">{name}</span>
        {hasLevel && (
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{level}%</span>
        )}
      </div>
      {hasLevel && (
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
          />
        </div>
      )}
    </div>
  );
}

export default function Skills() {
  const { skills } = portfolioContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
          <div className="w-24 h-1 bg-primary-500 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                {skillGroup.category}
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {skillGroup.items.map((item, i) => {
                  if (typeof item === 'string') {
                    return <SkillItem key={i} name={item} />;
                  }
                  return <SkillItem key={i} name={item.name} level={item.level} />;
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
