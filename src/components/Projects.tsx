import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered E-commerce Platform",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "TensorFlow", "Stripe", "AWS"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500",
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/johndoe/ecommerce-ai",
      featured: true
    },
    {
      title: "Smart Document Analyzer",
      description: "Machine learning application that automatically extracts and categorizes information from various document types using NLP and computer vision techniques.",
      technologies: ["Python", "FastAPI", "OpenCV", "spaCy", "PostgreSQL", "Docker"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
      liveUrl: "https://doc-analyzer.com",
      githubUrl: "https://github.com/johndoe/document-analyzer",
      featured: true
    },
    {
      title: "Real-time Collaboration Tool",
      description: "WebSocket-based collaboration platform with real-time editing, video conferencing, and project management features. Built for remote teams.",
      technologies: ["React", "Socket.io", "Express", "Redis", "WebRTC", "MaterialUI"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500",
      liveUrl: "https://collab-tool.com",
      githubUrl: "https://github.com/johndoe/collab-tool",
      featured: false
    },
    {
      title: "Financial Dashboard",
      description: "Interactive financial dashboard with data visualization, portfolio tracking, and predictive analytics using machine learning algorithms.",
      technologies: ["React", "D3.js", "Python", "Flask", "MySQL", "Chart.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
      liveUrl: "https://finance-dash.com",
      githubUrl: "https://github.com/johndoe/finance-dashboard",
      featured: false
    },
    {
      title: "Mobile-First Social Platform",
      description: "Progressive Web App for social networking with offline capabilities, push notifications, and real-time messaging.",
      technologies: ["React", "PWA", "Firebase", "Node.js", "WebPush", "Tailwind"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
      liveUrl: "https://social-pwa.com",
      githubUrl: "https://github.com/johndoe/social-pwa",
      featured: false
    },
    {
      title: "Healthcare Management System",
      description: "Comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine capabilities.",
      technologies: ["React", "Node.js", "MongoDB", "JWT", "Socket.io", "Bootstrap"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500",
      liveUrl: "https://healthcare-system.com",
      githubUrl: "https://github.com/johndoe/healthcare-system",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          
          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="glass hover-lift group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold">{project.title}</span>
                    <Badge variant="default" className="text-xs">Featured</Badge>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Other Projects */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-primary">
              Other Notable Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card key={index} className="glass hover-lift group">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" variant="ghost" className="h-8 px-2" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 px-2" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
