import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, ExternalLink ,MessageCircle } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">About Me</span>
          </h2>
          
          <Card className="glass backdrop-blur-sm hover-lift">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Bio Section */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">
                    Professional Summary
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
React Frontend Engineer with 1+ year of experience building scalable, performance-optimized web
applications using React and TypeScript.
Experienced in component architecture, REST API integration, async state handling, and mobile-first UI
systems.
Delivered measurable performance improvements (30% render reduction, 40% mobile optimization) across
production applications. Strong understanding of frontend architecture, data flow patterns, and clean code
principles.  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Connect With Me
                  </h3>
                  
                  <a 
                    href="https://github.com/toqaosama" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-primary/10 transition-colors group"
                  >
                    <Github className="h-5 w-5 text-primary" />
                    <span className="group-hover:text-primary transition-colors">GitHub</span>
                    <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/toqa-osama-7b19b9225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-primary/10 transition-colors group"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                    <span className="group-hover:text-primary transition-colors">LinkedIn</span>
                    <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a 
                   href="https://wa.me/201155388410" 
                   target="_blank" 
                   rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-primary/10 transition-colors group"
                  >
                <MessageCircle size={20} className="h-5 w-5 text-primary" />
                <span className="group-hover:text-primary transition-colors">Wattsapp</span>
                <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                  <div className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">Location</h4>
                    <p className="text-muted-foreground">Remote / Global /On-Site</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-2">Experience</h4>
                    <p className="text-muted-foreground">1++ Years</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
