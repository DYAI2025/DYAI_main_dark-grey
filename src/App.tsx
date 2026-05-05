import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  ChevronDown, 
  Globe, 
  Cpu, 
  Users, 
  Zap, 
  ShieldCheck, 
  Layers, 
  MessageSquare, 
  Menu, 
  X,
  Target,
  BrainCircuit,
  Search,
  CheckCircle2
} from 'lucide-react';
import { CONTENT } from './content';
import { useIsMobile } from './hooks';

// --- Shared Components ---

const SectionTitle = ({ overline, title, id = "00", className = "" }: { overline?: string, title: string, id?: string, className?: string }) => (
  <div className={`mb-20 relative px-12 ${className}`}>
    <div className="absolute left-12 -top-12 flex items-center gap-4">
      <span className="text-[10px] font-mono opacity-40 uppercase">{id} — {overline || 'CHAPTER'}</span>
      <div className="w-12 h-px bg-white/20"></div>
    </div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-5xl md:text-8xl font-display font-semibold tracking-tighter leading-[0.9] text-gradient"
    >
      {title}
    </motion.h2>
  </div>
);

const SideRails = () => (
  <aside className="fixed left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-12 text-[9px] opacity-20 origin-left -rotate-90 z-40 pointer-events-none">
    <span className="tracking-[0.5em] uppercase whitespace-nowrap">Empirical Research</span>
    <span className="tracking-[0.5em] uppercase whitespace-nowrap">Psychological Expertise</span>
    <span className="tracking-[0.5em] uppercase whitespace-nowrap">Organizational Practice</span>
  </aside>
);

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 bg-bg/40 backdrop-blur-subtle ${scrolled ? 'py-4 border-b border-white/5' : 'py-8 border-transparent'}`}>
      <div className="container mx-auto px-12 flex justify-between items-center h-12">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full mb-1" />
          DYAI
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-medium opacity-60">
          {['Philosophy', 'Practice', 'Services', 'Projects', 'Vision'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="hover:opacity-100 transition-opacity"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:block text-[9px] uppercase tracking-widest text-right opacity-40 leading-tight">
          Frontier Technology Practice<br/>v.2024.01
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-bg z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
               {['Philosophie', 'Practice', 'Leistungen', 'Projekte', 'Vision'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-display font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={container} className="relative h-screen flex flex-col justify-center overflow-hidden px-12">
      {/* Background Tech Elements */}
      <div className="absolute inset-x-12 inset-y-12 border border-white/5 pointer-events-none z-0" />
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.2" fill="none" className="text-white" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1 4" className="text-white" />
          <path d="M50 0V100M0 50H100" stroke="currentColor" strokeWidth="0.1" className="text-white" />
        </svg>
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="absolute left-0 top-0 flex items-center gap-4 -translate-y-12">
          <span className="text-[10px] font-mono opacity-40">01 — INTRO</span>
          <div className="w-12 h-px bg-white/20"></div>
        </div>

        <div className="relative">
          <h1 className="text-[80px] md:text-[140px] leading-[0.85] font-semibold tracking-tighter uppercase mb-20 flex flex-col">
            <motion.span 
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gradient"
            >
              Design Your
            </motion.span>
            <motion.span 
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block ml-6 md:ml-24"
            >
              Augmented
            </motion.span>
            <motion.span 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-right mr-12 text-accent"
            >
              Intelligence
            </motion.span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 mt-12 items-end">
          <div className="col-span-1 md:col-span-4">
            <p className="text-sm leading-relaxed opacity-60 max-w-xs font-light">
              The revolution is psychological, not technological. We integrate AI as an extension of human potential, fostering resilience and strategic clarity.
            </p>
          </div>
          <div className="col-span-1 md:col-span-4 flex flex-col gap-2 border-l border-white/10 pl-8 mt-8 md:mt-0">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">The Frontier Practice</span>
            <p className="text-xs font-mono opacity-50">52.5200° N, 13.4050° E — Global Integration</p>
          </div>
          <div className="col-span-1 md:col-span-4 flex justify-end mt-8 md:mt-0">
            <div className="flex flex-col items-center gap-4">
              <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-medium animate-pulse">Scroll to Discover</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-64 relative z-10">
      <div className="container mx-auto px-12">
        <SectionTitle overline={CONTENT.philosophy.overline} title={CONTENT.philosophy.title} id="02" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 text-2xl md:text-3xl font-light text-gray-400 leading-relaxed"
          >
            {CONTENT.philosophy.description}
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-4">
            {CONTENT.philosophy.principles.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-10 rounded-xl bg-surface/40 border border-white/5 hover:border-accent/30 transition-all group flex gap-8 items-start"
              >
                <span className="text-xs font-mono text-accent pt-2">{p.id}</span>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FrontierPractice = () => {
  const container = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const parallaxY = useSpring(reducedMotion ? 0 : y, { stiffness: 100, damping: 30 });
  const parallaxRotate = useSpring(reducedMotion ? 0 : rotate, { stiffness: 100, damping: 30 });
  
  return (
    <section id="practice" ref={container} className="py-64 relative overflow-hidden">
      <div className="container mx-auto px-12 relative z-10">
         <SectionTitle overline={CONTENT.frontier.overline} title="The Frontier Practice" id="03" />
         
         <div className="flex flex-col lg:flex-row gap-20">
           {/* Sticky Visual Stage with Parallax */}
           <div className="lg:w-1/2 lg:sticky lg:top-32 h-[400px] lg:h-[700px] flex items-center justify-center">
             <motion.div 
               style={{ y: parallaxY, rotate: parallaxRotate }}
               className="w-full h-full rounded-xl overflow-hidden bg-surface flex items-center justify-center border border-white/5 relative"
             >
               <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 tech-grid" />
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div 
                      animate={reducedMotion ? {} : { rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                      className="w-[120%] h-[120%] border border-white/5 rounded-full"
                    />
                  </div>
               </div>
               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-32 h-32 rounded-full border border-accent/30 flex items-center justify-center mb-8 relative">
                   <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20" />
                   <Globe size={48} className="text-white/40" />
                 </div>
                 <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Global Status: Online</span>
                 
                 {/* Floating data bits for depth */}
                 {!reducedMotion && (
                   <div className="absolute inset-0 pointer-events-none">
                     {[...Array(6)].map((_, i) => (
                       <motion.div
                         key={i}
                         style={{
                           top: `${20 + Math.random() * 60}%`,
                           left: `${20 + Math.random() * 60}%`,
                         }}
                         animate={{
                           y: [0, -20, 0],
                           opacity: [0.2, 0.5, 0.2]
                         }}
                         transition={{
                           duration: 3 + i,
                           repeat: Infinity,
                           ease: "easeInOut"
                         }}
                         className="absolute w-px h-12 bg-accent/30"
                       />
                     ))}
                   </div>
                 )}
               </div>
             </motion.div>
           </div>

           {/* Scrolling Content */}
           <div className="lg:w-1/2 flex flex-col gap-64 py-40">
             {CONTENT.frontier.panels.map((panel, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0.1, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-20% 0px -20% 0px" }}
                  className="max-w-md border-l border-accent/20 pl-10"
                >
                  <h3 className="text-4xl font-display font-semibold mb-8 text-white leading-tight">
                    {panel.title}
                  </h3>
                  <p className="text-xl text-gray-400 font-light leading-relaxed">
                    {panel.desc}
                  </p>
                </motion.div>
             ))}
           </div>
         </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32">
      <div className="container mx-auto">
        <SectionTitle overline={CONTENT.services.overline} title={CONTENT.services.title} id="04" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border-y border-white/5">
          {CONTENT.services.items.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-16 bg-bg flex flex-col h-full group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <span className="text-[11px] font-mono p-1 border-b border-accent text-accent">
                    {service.id}
                  </span>
                  <div className="opacity-20 group-hover:opacity-100 transition-opacity">
                    {i === 0 && <Users size={24} />}
                    {i === 1 && <Target size={24} />}
                    {i === 2 && <ShieldCheck size={24} />}
                    {i === 3 && <Search size={24} />}
                  </div>
                </div>
                
                <h3 className="text-3xl font-display font-bold mb-6 tracking-tighter">{service.title}</h3>
                <p className="text-gray-400 mb-12 font-light leading-relaxed text-lg max-w-md">
                  {service.desc}
                </p>

                <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30 mb-4 block">Capabilities</span>
                    <ul className="space-y-2">
                      {service.modules.map(mod => (
                        <li key={mod} className="text-[11px] font-mono opacity-60 flex items-center gap-2">
                          <div className="w-1 h-1 bg-accent rounded-full" /> {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30 mb-4 block">Operational Goal</span>
                    <p className="text-xs font-medium text-white italic leading-relaxed">"{service.result}"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Differentiation = () => {
  return (
    <section className="py-64 bg-[#E5E5E5] text-black overflow-hidden relative">
      <div className="absolute left-12 top-0 bottom-0 w-px bg-black/5" />
      <div className="absolute right-12 top-0 bottom-0 w-px bg-black/5" />

      <div className="container mx-auto px-24">
        <h2 className="text-7xl md:text-[120px] font-display font-bold mb-32 tracking-tighter leading-[0.85] uppercase">
          Why<br/><span className="text-accent">DYAI?</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
           {CONTENT.differentiation.triad.map((item, i) => (
             <motion.div 
               key={item.label}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="relative"
             >
               <span className="text-[9px] font-mono text-gray-400 mb-8 block uppercase tracking-[0.3em]">0{i+1} — COMPETENCE</span>
               <h3 className="text-4xl font-display font-bold mb-8 leading-none tracking-tighter uppercase">{item.label}</h3>
               <p className="text-xl text-gray-600 leading-relaxed font-light">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollOffset = scrollY.get() * 0.05;

      ctx.strokeStyle = 'rgba(242, 125, 38, 0.08)';
      ctx.fillStyle = 'rgba(242, 125, 38, 0.15)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy + Math.sin(scrollOffset + i * 0.5) * 0.05;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 180) {
            ctx.lineWidth = 0.5 * (1 - dist / 180);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
};

const ProjectCard = ({ proj, index }: { proj: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-labelledby={`project-title-${index}`}
      className="group cursor-pointer bg-bg p-12 border border-white/5 hover:border-accent transition-all duration-500 relative flex flex-col h-full"
    >
      <div className="aspect-[16/9] bg-surface-soft mb-10 overflow-hidden relative">
        <motion.div 
          animate={!reducedMotion && isHovered ? { scale: 1.1, opacity: 0.5 } : { scale: 1, opacity: 0 }}
          className="absolute inset-0 bg-accent transition-opacity duration-700"
        />
        <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <ArrowRight size={32} className="text-white" />
        </div>
        <div className="absolute top-4 left-4 text-[8px] font-mono opacity-20 uppercase tracking-widest whitespace-nowrap">
          SYS_PRJ_ID_{index+100}
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <span className="text-[9px] uppercase tracking-[0.3em] text-accent mb-4 block font-mono font-bold leading-none">
          {proj.category}
        </span>
        <h4 id={`project-title-${index}`} className="text-2xl font-display font-bold mb-4 uppercase tracking-tighter leading-none">
          {proj.title}
        </h4>
        
        <div className="relative mt-2">
          <p className="text-gray-500 text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {proj.desc}
          </p>
          
          <AnimatePresence>
            {(isHovered || reducedMotion) && (
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0, marginTop: 0 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden border-t border-white/10 pt-4"
              >
                <span className="text-[9px] uppercase tracking-widest text-accent font-mono block mb-2 font-bold">Project Outcome</span>
                <p className="text-[11px] text-gray-400 leading-relaxed italic">
                  Advanced {proj.category.toLowerCase()} deployment focused on human-centric performance and psychological resilience.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <section id="projects" className="py-64 relative">
      <div className="container mx-auto">
        <SectionTitle overline={CONTENT.projects.overline} title={CONTENT.projects.title} id="05" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border-y border-white/10 mb-40">
          {CONTENT.projects.metrics.map((m, i) => (
            <div key={i} className="p-16 bg-bg flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tighter"
              >
                {m.value}
              </motion.div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono font-bold">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {CONTENT.projects.list.map((proj, i) => (
            <ProjectCard key={i} proj={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Vision = () => {
  return (
    <section id="vision" className="py-96 relative overflow-hidden bg-bg">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-10">
         <svg viewBox="0 0 100 100" className="w-full h-full rotate-45">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.05" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.05" fill="none" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.05" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.05" />
         </svg>
       </div>

       <div className="container mx-auto px-12 relative z-10 text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
         >
           <h2 className="text-5xl md:text-9xl font-display font-semibold text-white mb-20 max-w-7xl mx-auto leading-[0.9] tracking-tighter uppercase whitespace-pre-line text-gradient">
             "{CONTENT.vision.quote}"
           </h2>
           <div className="flex items-center justify-center gap-6">
             <div className="w-20 h-px bg-accent/40" />
             <span className="text-xs md:text-sm uppercase tracking-[0.5em] text-accent font-mono">
               {CONTENT.vision.author}
             </span>
             <div className="w-20 h-px bg-accent/40" />
           </div>
         </motion.div>
       </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-64 bg-white text-black relative">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
          {/* Assistant Part */}
          <div className="lg:col-span-12 mb-32 border-b border-black/10 pb-32">
             <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="max-w-3xl">
                  <div className="w-10 h-10 bg-accent flex items-center justify-center mb-10">
                    <BrainCircuit size={20} className="text-white" />
                  </div>
                  <h2 className="text-6xl md:text-8xl font-display font-bold mb-10 tracking-tighter uppercase">DYAI Assistant</h2>
                  <p className="text-2xl text-gray-600 font-light leading-relaxed">
                    Starten Sie ein Gespräch über die Zukunft Ihrer Organisation. Unser Expert-Agent bietet erste Orientierung in der Augmented Intelligence.
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-black text-white text-[11px] uppercase tracking-[0.3em] font-bold flex items-center gap-4 group"
                >
                  Terminal öffnen <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
             </div>
          </div>

          <div className="lg:col-span-5">
             <span className="text-[10px] font-mono text-gray-400 mb-6 block uppercase tracking-widest">06 — REACH OUT</span>
             <h2 className="text-6xl font-display font-bold mb-12 tracking-tighter uppercase">Connect</h2>
             <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
               Für Anfragen an der Frontier der Mensch-KI-Integration. Wir begleiten Sie durch die psychologische Revolution.
             </p>
             <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm font-mono opacity-60">
                  <Globe size={16} /> 52.5200° N, 13.4050° E
                </div>
                <div className="flex items-center gap-4 text-sm font-mono opacity-60">
                  <MessageSquare size={16} /> HQ@DYAI.INTEGRATION
                </div>
             </div>
          </div>

          <div className="lg:col-span-7">
             <form className="space-y-12" onSubmit={e => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-4">
                   <label className="text-[9px] uppercase font-bold tracking-widest text-gray-400">Identification / Name</label>
                   <input type="text" className="w-full bg-transparent border-b-2 border-black/10 py-6 outline-none focus:border-accent transition-colors font-medium text-lg" placeholder="ENTER NAME" />
                 </div>
                 <div className="space-y-4">
                   <label className="text-[9px] uppercase font-bold tracking-widest text-gray-400">Communication / E-Mail</label>
                   <input type="email" className="w-full bg-transparent border-b-2 border-black/10 py-6 outline-none focus:border-accent transition-colors font-medium text-lg" placeholder="NAME@ORG.TLD" />
                 </div>
               </div>
               <div className="space-y-4">
                 <label className="text-[9px] uppercase font-bold tracking-widest text-gray-400">Message / Intent</label>
                 <textarea rows={4} className="w-full bg-transparent border-b-2 border-black/10 py-6 outline-none focus:border-accent transition-colors resize-none font-medium text-lg" placeholder="DESCRIBE YOUR CHALLENGE..." />
               </div>
               <button className="w-full py-8 bg-black text-white font-display font-bold uppercase tracking-[0.4em] text-sm hover:translate-y-[-2px] transition-all shadow-xl hover:shadow-black/20">
                 Send Transmission
               </button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="h-40 border-t border-white/5 flex flex-col md:flex-row items-center justify-between px-12 z-20 bg-bg">
      <div className="flex gap-16 items-center">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest opacity-30 mb-2">Current Section</span>
          <span className="text-[11px] font-medium uppercase tracking-widest">Terminal — Frontier</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest opacity-30 mb-2">Integration Level</span>
          <span className="text-[11px] font-mono text-accent">Human-Centric Evolution</span>
        </div>
        <div className="hidden lg:flex flex-col">
          <span className="text-[9px] uppercase tracking-widest opacity-30 mb-2">System Status</span>
          <span className="text-[11px] font-mono text-green-500 uppercase tracking-widest">v.24.01_Active</span>
        </div>
      </div>
      
      <div className="flex items-center gap-10 mt-8 md:mt-0">
        <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40">
          {CONTENT.footer.links.map(link => (
            <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
          ))}
        </div>
        
        <div className="flex items-center gap-6 group cursor-pointer border-l border-white/10 pl-10">
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-widest opacity-30 block mb-1">Contact Terminal</span>
            <span className="text-[11px] font-medium uppercase tracking-widest">Speak with Assistant</span>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative selection:bg-accent/30 min-h-screen text-[#E5E5E5] bg-bg overflow-x-hidden">
      {/* Dynamic Background System */}
      <DynamicBackground />
      
      {/* Global Tech Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 tech-grid z-0" />
      
      {/* Structural Margin Lines */}
      <div className="fixed left-12 top-0 bottom-0 w-px bg-white/5 z-40 hidden md:block" />
      <div className="fixed right-12 top-0 bottom-0 w-px bg-white/5 z-40 hidden md:block" />

      <Navbar />
      <SideRails />
      <Hero />
      <Philosophy />
      <FrontierPractice />
      <Services />
      <Differentiation />
      <Portfolio />
      <Vision />
      <Contact />
      <Footer />
    </div>
  );
}
