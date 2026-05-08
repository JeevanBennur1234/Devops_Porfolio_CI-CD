import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import BlogPlaceholder from './components/sections/BlogPlaceholder';

function App() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <BlogPlaceholder />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
