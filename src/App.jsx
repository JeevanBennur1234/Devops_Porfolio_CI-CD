import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import StatsBar from './components/StatsBar';
import Skills from './components/sections/Skills';
import Terminal from './components/sections/Terminal';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Testimonials from './components/sections/Testimonials';
import GitHubStats from './components/sections/GitHubStats';
import Certifications from './components/sections/Certifications';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import BackToTop from './components/BackToTop';
import SEO from './components/SEO';

function App() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Skills />
        <Terminal />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Testimonials />
        <GitHubStats />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
