import { Button } from "@/components/ui/button";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Toqa Osama</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
           React.Js Developer
          </p>
          <p className="text-lg md:text-xl text-accent mb-8">
            Software Developer
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Passionate about creating innovative solutions with modern technologies. 
            Specializing in React, Node.js, Python, and AI/ML implementations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="default" size="lg" className="group">
            <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Download CV
          </Button>
          <Button variant="outline" size="lg" className="group">
            <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="animate-scale-in flex justify-center gap-6">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 glass rounded-full hover-lift group"
          >
            <Github className="h-6 w-6 group-hover:text-primary transition-colors" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 glass rounded-full hover-lift group"
          >
            <Linkedin className="h-6 w-6 group-hover:text-primary transition-colors" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;