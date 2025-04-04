
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollValue = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrollValue * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-background to-background z-0"></div>
      
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 opacity-10 z-0 overflow-hidden">
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Fitness Background" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto container-padding relative z-10 mt-16 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slideUp">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4">
                Professional Fitness Advice
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your Fitness Journey With Expert Guidance
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Connect with certified trainers who understand your unique fitness needs. 
              Get personalized advice, workout plans, and continuous support to achieve your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact} 
                size="lg" 
                className="rounded-full text-md font-medium"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-md font-medium"
                asChild
              >
                <Link to="/#about">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative glass-card rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
              alt="Fitness Training" 
              className="w-full h-[400px] lg:h-[500px] object-cover object-center transform transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
              <div className="text-white">
                <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
                <p className="text-sm text-white/80">Our certified professionals are ready to guide your fitness journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-pulse">
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>
    </div>
  );
};

export default Hero;
