import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ResumeModal from "./components/ResumeModal";
import Aos from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    Aos.init({
      once: false,
      duration: 800,
      offset: 60,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      {loading && <LoadingScreen onLoaded={() => setLoading(false)} />}
      <div className={`app-root ${loading ? "app-hidden" : "app-visible"}`}>
        <Navbar onOpenResume={() => setResumeOpen(true)} />
        <main>
          <Home onOpenResume={() => setResumeOpen(true)} />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* In-Portfolio Interactive Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </>
  );
};

export default App;
