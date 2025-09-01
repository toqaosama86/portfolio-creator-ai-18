import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Server, 
  Brain, 
  Wrench,
  Palette,
  Database
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order('title');
        
        if (error) {
          console.error("Error fetching skills:", error);
        } else {
          setSkills(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Render icon component based on name
  const renderIcon = (iconName) => {
    switch(iconName) {
      case "Code": return <Code className="h-6 w-6" />;
      case "Server": return <Server className="h-6 w-6" />;
      case "Brain": return <Brain className="h-6 w-6" />;
      case "Wrench": return <Wrench className="h-6 w-6" />;
      case "Palette": return <Palette className="h-6 w-6" />;
      case "Database": return <Database className="h-6 w-6" />;
      default: return <Code className="h-6 w-6" />;
    }
  };

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="gradient-text">Skills & Technologies</span>
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, index) => (
              <Card 
                key={category.id} 
                className="glass hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-3 p-3 rounded-full group-hover:bg-opacity-20 transition-colors ${
                    category.color === 'primary' ? 'bg-primary/10 text-primary' :
                    category.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                    'bg-accent/10 text-accent'
                  }`}>
                    {renderIcon(category.icon_name)}
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(category.skills) && category.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="bg-card hover:bg-primary/20 transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;