import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import AmbientBackground from './components/common/AmbientBackground';
import CursorGlow from './components/common/CursorGlow';
import ScrollProgress from './components/common/ScrollProgress';
import ThemeToggle from './components/common/ThemeToggle';
import BackToTop from './components/common/BackToTop';
import Navbar from './components/Navbar/Navbar';

const Hero = lazy(() => import('./components/Hero/Hero'));
const About = lazy(() => import('./components/About/About'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Experience = lazy(() => import('./components/Experience/Experience'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Education = lazy(() => import('./components/Education/Education'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function ErrorFallback() {
  return (
    <div
      style={{
        padding: '60px 20px',
        textAlign: 'center',
        color: 'var(--text-2)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <h2 style={{ marginBottom: '12px', color: 'var(--text-1)' }}>Something went wrong</h2>
      <p>Please refresh the page or try again later.</p>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div
      style={{
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-3)',
        fontSize: '0.85rem',
      }}
    >
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <ToastProvider>
          <AmbientBackground />
          <CursorGlow />
          <ScrollProgress />
          <Navbar />
          <Suspense fallback={<SectionSkeleton />}>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
            <Footer />
          </Suspense>
          <BackToTop />
          <ThemeToggle />
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
