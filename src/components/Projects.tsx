import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Eye } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  live_url?: string;
  featured: boolean;
  category: "wordpress" | "coding" | "design";
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [wordpressExpanded, setWordpressExpanded] = useState(false);
  const [codingExpanded, setCodingExpanded] = useState(false);
  const [designExpanded, setDesignExpanded] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from<Project>("projects")
        .select("*")
        .order("title", { ascending: true });

      if (error) console.error("Error fetching projects:", error);
      else setProjects(data || []);

      setLoading(false);
    };

    fetchProjects();
  }, []);

  const getImages = (project: Project) => (project.images.length ? project.images : ["/placeholder.svg"]);

  const wordpressProjects = projects.filter((p) => p.category === "wordpress");
  const codingProjects = projects.filter((p) => p.category === "coding");
  const designProjects = projects.filter((p) => p.category === "design");

  if (loading) return <p className="text-center">Loading projects...</p>;

  const renderProjectCard = (project: Project) => (
    <Card key={project.id} className="glass hover-lift group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={getImages(project)[0]}
          alt={project.title}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 pt-2 items-center">
          {project.live_url && (
            <Button size="sm" asChild>
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="flex items-center">
                <ImageIcon className="h-4 w-4 mr-2" />
                Show Media
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-full">
              <DialogTitle>{project.title} — Media</DialogTitle>
              <DialogDescription>Browse images for this project.</DialogDescription>
              <Carousel>
                <CarouselContent className="items-stretch">
                  {getImages(project).map((img, i) => (
                    <CarouselItem key={i} className="flex justify-center">
                      <img src={img} alt={`${project.title} ${i + 1}`} className="max-h-[60vh] object-contain" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">All Projects</h2>

        <Tabs defaultValue="wordpress">
          <TabsList className="justify-center mb-6">
            <TabsTrigger value="wordpress">Wordpress</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>

          {/* Wordpress Tab */}
          <TabsContent value="wordpress">
            <div className="grid lg:grid-cols-3 gap-8 mb-6">
              {(wordpressExpanded ? wordpressProjects : wordpressProjects.slice(0, 3)).map(renderProjectCard)}
            </div>
            {wordpressProjects.length > 3 && (
              <div className="flex justify-center">
                <Button size="sm" variant="ghost" onClick={() => setWordpressExpanded((v) => !v)}>
                  {wordpressExpanded ? "Show less" : `Show more (${wordpressProjects.length - 3})`}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Coding Tab */}
          <TabsContent value="coding">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {(codingExpanded ? codingProjects : codingProjects.slice(0, 4)).map(renderProjectCard)}
            </div>
            {codingProjects.length > 4 && (
              <div className="flex justify-center">
                <Button size="sm" variant="ghost" onClick={() => setCodingExpanded((v) => !v)}>
                  {codingExpanded ? "Show less" : `Show more (${codingProjects.length - 4})`}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {(designExpanded ? designProjects : designProjects.slice(0, 4)).map(renderProjectCard)}
            </div>
            {designProjects.length > 4 && (
              <div className="flex justify-center">
                <Button size="sm" variant="ghost" onClick={() => setDesignExpanded((v) => !v)}>
                  {designExpanded ? "Show less" : `Show more (${designProjects.length - 4})`}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
