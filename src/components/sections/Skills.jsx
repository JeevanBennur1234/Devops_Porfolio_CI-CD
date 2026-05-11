import React from 'react';
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
  "AWS": <FaAws className="w-8 h-8 text-[#FF9900]" />,
  "GCP": <SiGooglecloud className="w-8 h-8 text-[#4285F4]" />,
  "Azure": <FaCloud className="w-8 h-8 text-[#0089D6]" />,
  "Linux": <FaLinux className="w-8 h-8 text-slate-800 dark:text-white" />,
  "Docker": <FaDocker className="w-8 h-8 text-[#2496ED]" />,
  "Kubernetes": <SiKubernetes className="w-8 h-8 text-[#326CE5]" />,
  "Helm": <SiHelm className="w-8 h-8 text-[#0F1689]" />,
  "Jenkins": <FaJenkins className="w-8 h-8 text-[#D24939]" />,
  "GitHub Actions": <SiGithubactions className="w-8 h-8 text-[#2088FF]" />,
  "GitLab CI": <SiGitlab className="w-8 h-8 text-[#FCA121]" />,
  "Terraform": <SiTerraform className="w-8 h-8 text-[#7B42BC]" />,
  "Ansible": <SiAnsible className="w-8 h-8 text-[#EE0000]" />,
  "Prometheus": <SiPrometheus className="w-8 h-8 text-[#E6522C]" />,
  "Grafana": <SiGrafana className="w-8 h-8 text-[#F46800]" />,
  "Python": <SiPython className="w-8 h-8 text-[#3776AB]" />,
  "Bash": <SiGnubash className="w-8 h-8 text-[#4EAA25]" />,
  "Go": <SiGo className="w-8 h-8 text-[#00ADD8]" />,
  "Node.js": <SiNodedotjs className="w-8 h-8 text-[#339933]" />,
  "Git": <FaGitAlt className="w-8 h-8 text-[#F05032]" />
};

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
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                {skillGroup.category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {skillGroup.items.map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {iconMap[item] || <FaLinux className="w-8 h-8 text-slate-400" />}
                    </div>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 text-center">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
