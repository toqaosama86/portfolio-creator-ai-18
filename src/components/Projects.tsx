import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Eye } from "lucide-react";
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

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  live_url?: string;
  featured: boolean;
  category: "wordpress" | "coding" | "design" | "Freelance";
  created_at?: string; // optional (in case TS complains)
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from<Project>("projects")
        .select("*")
        // ✅ newest first (last added shows first)
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching projects:", error);
      else setProjects(data || []);

      setLoading(false);
    };

    fetchProjects();
  }, []);

  const getImages = (project: Project) =>
    project.images?.length ? project.images : ["/placeholder.svg"];

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
          className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          {project.live_url && (
            <Button size="sm" asChild>
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="flex items-center">
                <ImageIcon className="mr-2 h-4 w-4" />
                Show Media
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-3xl">
              <DialogTitle>{project.title} — Media</DialogTitle>
              <DialogDescription>Browse images for this project.</DialogDescription>

              <Carousel>
                <CarouselContent className="items-stretch">
                  {getImages(project).map((img, i) => (
                    <CarouselItem key={i} className="flex justify-center">
                      <img
                        src={img}
                        alt={`${project.title} ${i + 1}`}
                        className="max-h-[60vh] object-contain"
                      />
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
        <h2 className="mb-12 text-center text-4xl font-bold gradient-text">
          All Projects
        </h2>

        {/* ✅ default tab is Coding */}
        <Tabs defaultValue="coding">
          <TabsList className="mb-6 justify-center">
            {/* ✅ Coding first */}
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="wordpress">Wordpress</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>

          {/* ✅ Coding Tab - show all (no show more) */}
          <TabsContent value="coding">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {codingProjects.map(renderProjectCard)}
            </div>
          </TabsContent>

          {/* ✅ Wordpress Tab - show all (no show more) */}
          <TabsContent value="wordpress">
            <div className="grid gap-8 lg:grid-cols-3">
              {wordpressProjects.map(renderProjectCard)}
            </div>
          </TabsContent>

          {/* ✅ Design Tab - show all (no show more) */}
          <TabsContent value="design">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {designProjects.map(renderProjectCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
