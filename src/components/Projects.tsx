import { useEffect, useMemo, useState } from "react";
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

type Category = "wordpress" | "coding" | "design" | "freelance";

interface ProjectRow {
  id: string;
  title: string | null;
  description: string | null;
  technologies: string[] | null;
  images: string[] | null;
  live_url?: string | null;
  featured: boolean | null;
  category: string | null;
  created_at?: string | null;
}

// what the UI will use after normalization
interface ProjectUI {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  live_url?: string;
  featured: boolean;
  category: Category;
  created_at?: string;
}

const normalizeCategory = (v: unknown): Category => {
  const c = String(v ?? "").trim().toLowerCase();
  if (c === "wordpress") return "wordpress";
  if (c === "coding") return "coding";
  if (c === "design") return "design";
  if (c === "freelance") return "freelance";
  // if DB has "Freelance" (capital) this will still become freelance
  return "coding"; // fallback so the item still appears somewhere
};

const safeArray = (v: unknown): string[] => (Array.isArray(v) ? v.filter(Boolean) : []);

const Projects = () => {
  const [projects, setProjects] = useState<ProjectUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState<string>("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setFetchErr("");

      // 1) try with ordering
      const res = await supabase.from("projects").select("*").order("created_at", {
        ascending: false,
      });

      // If order fails (created_at missing / RLS), fallback to no order
      let data = res.data as ProjectRow[] | null;
      let error = res.error;

      if (error) {
        console.warn("Order failed, retrying without order:", error.message);
        const fallback = await supabase.from("projects").select("*");
        data = fallback.data as ProjectRow[] | null;
        error = fallback.error;
      }

      if (error) {
        console.error("Error fetching projects:", error);
        setFetchErr(error.message || "Failed to fetch projects");
        setProjects([]);
        setLoading(false);
        return;
      }

      const normalized: ProjectUI[] = (data ?? []).map((p) => ({
        id: String(p.id),
        title: p.title ?? "",
        description: p.description ?? "",
        technologies: safeArray(p.technologies),
        images: safeArray(p.images),
        live_url: p.live_url ?? undefined,
        featured: !!p.featured,
        category: normalizeCategory(p.category),
        created_at: p.created_at ?? undefined,
      }));

      // If we fetched without DB order, sort here (newest first)
      normalized.sort((a, b) => {
        const at = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bt = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bt - at;
      });

      setProjects(normalized);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const getImages = (project: ProjectUI) =>
    project.images.length ? project.images : ["/placeholder.svg"];

  const codingProjects = useMemo(
    () => projects.filter((p) => p.category === "coding"),
    [projects]
  );
  const wordpressProjects = useMemo(
    () => projects.filter((p) => p.category === "wordpress"),
    [projects]
  );
  const designProjects = useMemo(
    () => projects.filter((p) => p.category === "design"),
    [projects]
  );
  const freelanceProjects = useMemo(
    () => projects.filter((p) => p.category === "freelance"),
    [projects]
  );

  if (loading) return <p className="text-center">Loading projects...</p>;

  // ✅ show the error ON SCREEN so you know what is happening
  if (fetchErr) {
    return (
      <div className="mx-auto max-w-3xl rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-red-200">
        <div className="font-semibold">Projects failed to load</div>
        <div className="mt-2 text-sm opacity-90">{fetchErr}</div>

        <div className="mt-4 text-sm text-red-100/90">
          Quick checks:
          <ul className="mt-2 list-disc pl-5">
            <li>Supabase URL/Anon key is correct in your env</li>
            <li>RLS policy allows SELECT on <code>projects</code></li>
            <li><code>created_at</code> exists (or we fallback without ordering)</li>
          </ul>
        </div>
      </div>
    );
  }

  const renderProjectCard = (project: ProjectUI) => (
    <Card key={project.id} className="glass hover-lift group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={getImages(project)[0]}
          alt={project.title || "Project"}
          className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {(project.technologies ?? []).map((tech) => (
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
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
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

  const EmptyState = ({ label }: { label: string }) => (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center text-white/70">
      No projects in <span className="font-semibold text-white">{label}</span> yet.
    </div>
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold gradient-text">
          All Projects
        </h2>

        <Tabs defaultValue="coding">
          <TabsList className="mb-6 justify-center">
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="wordpress">Wordpress</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            {/* ✅ show Freelance tab only if you have data */}
            {freelanceProjects.length > 0 && (
              <TabsTrigger value="freelance">Shopify</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="coding">
            {codingProjects.length === 0 ? (
              <EmptyState label="Coding" />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {codingProjects.map(renderProjectCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="wordpress">
            {wordpressProjects.length === 0 ? (
              <EmptyState label="Wordpress" />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {wordpressProjects.map(renderProjectCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="design">
            {designProjects.length === 0 ? (
              <EmptyState label="Design" />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {designProjects.map(renderProjectCard)}
              </div>
            )}
          </TabsContent>

          {freelanceProjects.length > 0 && (
            <TabsContent value="freelance">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {freelanceProjects.map(renderProjectCard)}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
