import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "BestikWay",
      period: "2022 - Present",
      location: "Remote",
      type: "Full-time",
      description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Implemented AI-powered features that increased user engagement by 40%.",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"],
      link: "https://bestikway.com"
    },
    {
      title: "AI/ML Developer",
      company: "NeuroTech Solutions",
      period: "2021 - 2022",
      location: "San Francisco, CA",
      type: "Contract",
      description: "Developed machine learning models for computer vision applications. Built NLP systems for automated content analysis and sentiment detection.",
      technologies: ["Python", "TensorFlow", "OpenCV", "NLP", "Docker"],
      link: "https://neurotech.com"
    },
    {
      title: "Freelance Developer",
      company: "Independent",
      period: "2020 - 2021",
      location: "Remote",
      type: "Freelance",
      description: "Delivered custom web solutions for small to medium businesses. Specialized in WordPress development, e-commerce platforms, and responsive design.",
      technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "Bootstrap"],
      link: null
    },
    {
      title: "Software Development Intern",
      company: "TechStart Inc",
      period: "2020",
      location: "Austin, TX",
      type: "Internship",
      description: "Contributed to frontend development of customer-facing applications. Gained experience with modern JavaScript frameworks and agile development practices.",
      technologies: ["React", "Redux", "REST APIs", "Git", "Figma"],
      link: "https://techstart.com"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Professional Experience</span>
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />
                  
                  <Card className="glass hover-lift md:ml-16">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-primary">
                              {exp.title}
                            </h3>
                            {exp.link && (
                              <a 
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {exp.company}
                          </h4>
                        </div>
                        
                        <div className="flex flex-col lg:items-end gap-2">
                          <Badge variant="outline" className="w-fit">
                            {exp.type}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;