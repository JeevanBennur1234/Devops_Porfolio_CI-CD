import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const prompt = 'visitor@portfolio:~$';

const responses = {
  help: `Available commands:
  ├── about      — Who built this portfolio
  ├── skills     — List technical skills
  ├── projects   — View featured projects
  ├── contact    — Get in touch
  ├── whoami     — Display current user
  ├── uptime     — How long this terminal has been alive
  ├── clear      — Clear the terminal
  ├── ls         — List sections
  └── help       — Show this message`,

  about: "This portfolio was built by Alex Rivera, a DevOps Engineer passionate about cloud infrastructure, CI/CD, and automation. Type 'skills' to see what I work with.",

  skills: "Cloud: AWS, GCP, Azure, Linux\nContainers: Docker, Kubernetes, Helm\nCI/CD: Jenkins, GitHub Actions, GitLab CI\nIaC: Terraform, Ansible, CloudFormation\nMonitoring: Prometheus, Grafana, ELK\nLanguages: Python, Bash, Go, Node.js",

  projects: "Featured projects include a CI/CD pipeline for microservices, multi-region AWS deployment, K8s monitoring stack, and a serverless image processor. Visit the Projects section above for details.",

  contact: "You can reach me at alex.rivera@example.com or find me on LinkedIn/GitHub. Check the Contact section below!",

  whoami: "visitor",

  ls: "about  skills  projects  experience  education  blog  contact  terminal",

  uptime: () => {
    if (!window._terminalStart) window._terminalStart = Date.now();
    const sec = Math.floor((Date.now() - window._terminalStart) / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `up ${m} min ${s} sec`;
  },
};

responses.clear = null;

function Line({ text, isOutput }) {
  return (
    <div className={`font-mono text-sm leading-relaxed ${isOutput ? 'text-slate-300' : 'text-primary-400'}`}>
      {isOutput ? (
        text.split('\n').map((line, i) => <div key={i}>{line}</div>)
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { text: 'Welcome to the interactive terminal. Type "help" to see available commands.', isOutput: true },
    { text: `${prompt} `, isOutput: false },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    const cmd = trimmed.split(/\s+/)[0];

    const newHistory = [
      ...history.slice(0, -1),
      { text: `${prompt} ${input}`, isOutput: false },
    ];

    if (cmd === 'clear') {
      setHistory([{ text: `${prompt} `, isOutput: false }]);
    } else {
      const res = responses[cmd];
      if (res === null) {
        setHistory([{ text: `${prompt} `, isOutput: false }]);
      } else {
        const output = typeof res === 'function' ? res() : res;
        newHistory.push(
          { text: output || 'Command not found. Type "help" for available commands.', isOutput: true },
          { text: `${prompt} `, isOutput: false }
        );
        setHistory(newHistory);
      }
    }
    setInput('');
  };

  return (
    <section id="terminal" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Interactive Terminal</h2>
          <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1 max-w-xs" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-slate-400 font-mono">terminal — bash</span>
          </div>

          <div className="p-4 md:p-6 h-80 overflow-y-auto custom-scrollbar">
            {history.map((line, i) => (
              <Line key={i} text={line.text} isOutput={line.isOutput} />
            ))}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono text-sm">
              <span className="text-primary-400 shrink-0">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent text-slate-100 outline-none border-none font-mono text-sm"
                placeholder="type a command..."
              />
            </form>
            <div ref={endRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
