import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("created_at", { ascending: false }); // This will get the newest first

      if (error) {
        console.error("Error fetching experiences:", error);
        setError("Failed to load experiences");
        return;
      }

      setExperiences(data || []);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-2">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="gradient-text">Professional Experience</span>
            </h2>
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-2">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="gradient-text">Professional Experience</span>
            </h2>
            <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Professional Experience</span>
          </h2>
          
          {experiences.length === 0 ? (
            <div className="text-center text-muted-foreground p-8">
              No experiences found. Please check back later.
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative">
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
                              {exp.link && exp.link !== "null" && (
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
                          {Array.isArray(exp.technologies) ? (
                            exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">
                                {tech}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {exp.technologies}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;