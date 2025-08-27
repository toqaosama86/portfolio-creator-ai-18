import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, ExternalLink } from "lucide-react";

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
                    Innovative Software Developer with 3+ years of experience in full-stack development 
                    and AI/ML implementations. Proven track record of delivering scalable web applications 
                    and intelligent systems. Passionate about leveraging cutting-edge technologies to solve 
                    complex problems and drive business growth.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                    Experienced in modern JavaScript frameworks, Python development, and cloud technologies. 
                    Strong background in machine learning, natural language processing, and computer vision 
                    with a focus on practical applications.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Connect With Me
                  </h3>
                  
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-primary/10 transition-colors group"
                  >
                    <Github className="h-5 w-5 text-primary" />
                    <span className="group-hover:text-primary transition-colors">GitHub</span>
                    <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-primary/10 transition-colors group"
                  >
                    <Linkedin className="h-5 w-5 text-primary" />
                    <span className="group-hover:text-primary transition-colors">LinkedIn</span>
                    <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <div className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">Location</h4>
                    <p className="text-muted-foreground">Remote / Global</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-2">Experience</h4>
                    <p className="text-muted-foreground">3+ Years</p>
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