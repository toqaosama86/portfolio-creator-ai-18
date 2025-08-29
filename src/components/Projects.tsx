import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye, Image as ImageIcon } from "lucide-react";
import applinz1 from "@/assets/Applinz.png";
// import applinz2 from "@/assets/Applinz2.png";
import applinz3 from "@/assets/Applinz3.png";
import applinz4 from "@/assets/Applinz4.png";
import applinz5 from "@/assets/Applinz5.png";
import applinz6 from "@/assets/Applinz6.png";

import OlioFood1 from "@/assets/OlioFood1.png";
import OlioFood2 from "@/assets/OlioFood2.png";
import OlioFood3 from "@/assets/OlioFood3.png";
import OlioFood4 from "@/assets/OlioFood4.png";

import Irth1 from "@/assets/irth1.jpg";
import Irth2 from "@/assets/irth2.jpg";
import Irth3 from "@/assets/irth3.jpg";
import Irth4 from "@/assets/irth4.jpg";

import alsyam1 from "@/assets/alsyam1.png";
import alsyam2 from "@/assets/alsyam2.png";
import alsyam3 from "@/assets/alsyam3.png";
import alsyam4 from "@/assets/alsyam4.png";
import alsyam5 from "@/assets/alsyam5.png";
import alsyam6 from "@/assets/alsyam6.png";

import Neurotech from "@/assets/Neurotech.png";
import Neurotech1 from "@/assets/Neurotech1.png";
import Neurotech2 from "@/assets/Neurotech3.png";
import Neurotech3 from "@/assets/Neurotech4.png";

import ANGELO1 from "@/assets/ANGELO1.png";
import ANGELO2 from "@/assets/ANGELO2.png";
import ANGELO3 from "@/assets/ANGELO3.png";
import ANGELO4 from "@/assets/ANGELO4.png";
import ANGELO5 from "@/assets/ANGELO5.png";
import ANGELO6 from "@/assets/ANGELO6.png";
import ANGELO7 from "@/assets/ANGELO7.png";

import golden from "@/assets/golden.png";
import golden1 from "@/assets/golden1.png";
import golden2 from "@/assets/golden8.png";

import Camp1 from "@/assets/Camp1.png";
import Camp2 from "@/assets/Camp2.png";
import Camp3 from "@/assets/Camp3.png";
import Camp4 from "@/assets/Camp4.png";
import Camp5 from "@/assets/Camp5.png";
import Camp6 from "@/assets/Camp6.png";
import Camp7 from "@/assets/Camp7.png";
import Camp8 from "@/assets/Camp8.png";

import Angeloupgrade from "@/assets/Angeloupgrade.png";
import Angeloupgrade1 from "@/assets/Angeloupgrade1.png";
import Angeloupgrade2 from "@/assets/Angeloupgrade2.png";

import Figma from "@/assets/Figma.png";
import Figma1 from "@/assets/Figma1.png";
import Figma2 from "@/assets/Figma2.png";
import Figma3 from "@/assets/Figma3.png";



import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const Projects = () => {
  const projects = [
    {
      title: "Applinz",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["Wordpress", "Shopify", "Css","SEO","Google-Analytic","Google-Console" ],
  image: [applinz1, applinz3, applinz4, applinz5,applinz6],
      liveUrl: "https://applinz.com/",
  featured: true,
  category: "wordpress",
    },
    {
      title: "OlioFood",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["Wordpress", "Shopify", "Css","SEO","Google-Analytic","Google-Console" ],
  image: [OlioFood2, OlioFood1, OlioFood3, OlioFood4],
      liveUrl: "https://oliofood.com/",
  featured: true,
  category: "wordpress",
    },
      {
      title: "Irtheg",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["Wordpress", "Shopify", "Css","SEO","Google-Analytic","Google-Console" ],
  image: [Irth1, Irth2, Irth3, Irth4],
      liveUrl: "https://irtheg.com/",
  featured: true,
  category: "wordpress",
    },
          {
      title: "Alsyam",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["Wordpress", "Shopify", "Css","SEO","Google-Analytic","Google-Console" ],
    image: [alsyam1, alsyam2, alsyam3, alsyam4 ,alsyam5 , alsyam6],
      liveUrl: "https://alsyam.com/",
    featured: true,
    category: "wordpress",
    },
      {
      title: "Neurotecheg",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["Wordpress", "Shopify", "Css","SEO","Google-Analytic","Google-Console" ],
  image: [Neurotech3, Neurotech1, Neurotech2, Neurotech ],
      liveUrl: "https://neurotecheg.com/",
  featured: true,
  category: "wordpress",
    },
       {
      title: "Angelo-Paries",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["React.js","Node.js","PostMan","Api","Bootstarp","css","JavaScrpit","Html",""],
  image: [ANGELO1, ANGELO2, ANGELO3, ANGELO4, ANGELO5, ANGELO6, ANGELO7 ],
      liveUrl: "https://angelo-paris.com/",
  featured: true,
  category: "coding",
    },
       {
      title: "goldenpharaoh-tours",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["React.js","Node.js","PostMan","Api","Bootstarp","css","JavaScrpit","Html",""],
  image: [golden, golden1, golden2 ],
      liveUrl: "https://goldenpharaoh-tours.com/",
  featured: true,
  category: "coding",
    },
    {
      title: "Camping-Website",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["React.js","Node.js","PostMan","Api","Bootstarp","css","JavaScrpit","Html",""],
  image: [Camp1, Camp2 ,Camp3, Camp4, Camp5, Camp6, Camp7, Camp8 ],
      liveUrl: "#",
  featured: true,
  category: "coding",
    },
     {
      title: "Angelo-Upgrade",
      description: "Full-stack e-commerce solution with AI-powered product recommendations and intelligent search. Features include real-time inventory management, payment processing, and analytics dashboard.",
      technologies: ["React.js","Node.js","PostMan","Api","Bootstarp","css","JavaScrpit","Html",""],
  image: [Angeloupgrade1, Angeloupgrade,  Angeloupgrade2 ],
      liveUrl: "#",
  featured: true,
  category: "coding",
    },
    {
      title: "Figma-Designs",
      description: "Progressive Web App for social networking with offline capabilities, push notifications, and real-time messaging.",
    image: [Figma3 ,Figma, Figma1, Figma2, ],
  featured: false,
  category: "design",
    },
  ];

  // Ensure images are always an array (accept imported assets or external urls)
  const getImages = (project: any) => {
    const imgs = Array.isArray(project.image) ? project.image : [project.image];
    const filtered = imgs.filter((i) => Boolean(i));
    return filtered.length > 0 ? filtered : ["/placeholder.svg"];
  };
  // Group projects by explicit category: 'wordpress', 'coding', 'design'
  const wordpressProjects = projects.filter((p) => p.category === "wordpress");
  const codingProjects = projects.filter((p) => p.category === "coding");
  const designProjects = projects.filter((p) => p.category === "design");
  const [featuredExpanded, setFeaturedExpanded] = useState<boolean>(false);
  const [ecomExpanded, setEcomExpanded] = useState<boolean>(false);
  const [otherExpanded, setOtherExpanded] = useState<boolean>(false);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">All Projects</span>
          </h2>
          
          <Tabs defaultValue="wordpress">
            <TabsList className="justify-center mb-6">
              <TabsTrigger value="wordpress">Wordpress</TabsTrigger>
              <TabsTrigger value="coding">Coding</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="wordpress">
              <h3 className="text-2xl font-semibold text-center mb-8 text-primary"> Wordpress Projects</h3>
              <div className="grid lg:grid-cols-3 gap-8 mb-6">
                {(featuredExpanded ? wordpressProjects : wordpressProjects.slice(0, 3)).map((project, index) => (
                  <Card key={index} className="glass hover-lift group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={getImages(project)[0]}
                    alt={project.title}
                    className="w-full h-60 object-fit group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold">{project.title}</span>
                    
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
                  
                  <div className="flex gap-3 pt-2 items-center">
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>

                    {/* <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button> */}

                    {/* Show Media Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Show Media
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl w-full">
                        <DialogTitle>{project.title} — Media</DialogTitle>
                        <DialogDescription>
                          Browse images for this project.
                        </DialogDescription>

                        <div className="mt-4 relative">
                          <Carousel>
                            <CarouselContent className="items-stretch">
                              {getImages(project).map((img: string, i: number) => (
                                <CarouselItem key={i} className="flex justify-center">
                                  <img src={img} alt={`${project.title} ${i + 1}`} className="max-h-[60vh] object-contain" />
                                </CarouselItem>
                              ))}
                            </CarouselContent>

                            <CarouselPrevious className="" />
                            <CarouselNext className="" />
                          </Carousel>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
              </div>
              {wordpressProjects.length > 4 && (
                <div className="flex justify-center">
                  <Button size="sm" variant="ghost" onClick={() => setFeaturedExpanded((v) => !v)}>
                    {featuredExpanded ? "Show less" : `Show more (${wordpressProjects.length - 4})`}
                  </Button>
                </div>
              )}

            </TabsContent>

            <TabsContent value="coding">
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-center mb-8 text-primary"> Coding Projects</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(ecomExpanded ? codingProjects : codingProjects.slice(0, 4)).map((project, index) => (
                    <Card key={index} className="glass hover-lift group">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                         <div className="relative overflow-hidden">
                  <img
                    src={getImages(project)[0]}
                    alt={project.title}
                    className="w-full h-60 object-fit group-hover:scale-105 transition-transform duration-300"
                  /></div>
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
                  
                  <div className="flex gap-3 pt-2 items-center">
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>

                    {/* <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button> */}

                    {/* Show Media Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Show Media
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl w-full">
                        <DialogTitle>{project.title} — Media</DialogTitle>
                        <DialogDescription>
                          Browse images for this project.
                        </DialogDescription>

                        <div className="mt-4 relative">
                          <Carousel>
                            <CarouselContent className="items-stretch">
                              {getImages(project).map((img: string, i: number) => (
                                <CarouselItem key={i} className="flex justify-center">
                                  <img src={img} alt={`${project.title} ${i + 1}`} className="max-h-[60vh] object-contain" />
                                </CarouselItem>
                              ))}
                            </CarouselContent>

                            <CarouselPrevious className="" />
                            <CarouselNext className="" />
                          </Carousel>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
                    </Card>
                  ))}
                </div>
                
                {codingProjects.length > 4 && (
                  <div className="flex justify-center">
                    <Button size="sm" variant="ghost" onClick={() => setEcomExpanded((v) => !v)}>
                      {ecomExpanded ? "Show less" : `Show more (${codingProjects.length - 4})`}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="design">
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Design Projects</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(otherExpanded ? designProjects : designProjects.slice(0, 4)).map((project, index) => (
                    <Card key={index} className="glass hover-lift group">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-1">
                          {(project.technologies || []).slice(0, 3).map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                          ))}
                          {project.technologies && project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{project.technologies.length - 3}</Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2 pt-1">
                          {/* <Button size="sm" variant="ghost" className="h-8 px-2" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-3 w-3" /></a>
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-3 w-3" /></a>
                          </Button> */}
                          {/* <Button size="sm" variant="outline" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button> */}

                          {/* Show Media Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="flex items-center">
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Show Media
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl w-full">
                              <DialogTitle>{project.title} — Media</DialogTitle>
                              <DialogDescription>
                                Browse images for this project.
                              </DialogDescription>

                              <div className="mt-4 relative">
                                <Carousel>
                                  <CarouselContent className="items-stretch">
                                    {getImages(project).map((img: string, i: number) => (
                                      <CarouselItem key={i} className="flex justify-center">
                                        <img src={img} alt={`${project.title} ${i + 1}`} className="max-h-[60vh] object-contain" />
                                      </CarouselItem>
                                    ))}
                                  </CarouselContent>

                                  <CarouselPrevious className="" />
                                  <CarouselNext className="" />
                                </Carousel>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {designProjects.length > 4 && (
                  <div className="flex justify-center mt-4">
                    <Button size="sm" variant="ghost" onClick={() => setOtherExpanded((v) => !v)}>
                      {otherExpanded ? "Show less" : `Show more (${designProjects.length - 4})`}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Projects;
