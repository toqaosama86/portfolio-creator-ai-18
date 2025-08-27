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

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="h-6 w-6" />,
      skills: ["React.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "WordPress"],
      color: "primary"
    },
    {
      title: "Backend Development", 
      icon: <Server className="h-6 w-6" />,
      skills: ["Node.js", "Express.js", "Python", "REST APIs", "GraphQL"],
      color: "secondary"
    },
    {
      title: "Database & Cloud",
      icon: <Database className="h-6 w-6" />,
      skills: ["MySQL", "MongoDB", "Firebase", "PostgreSQL", "AWS", "Google Cloud"],
      color: "accent"
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="h-6 w-6" />,
      skills: ["Python", "Scikit-learn", "TensorFlow", "Keras", "NLP", "Computer Vision", "OpenAI APIs"],
      color: "primary"
    },
    {
      title: "Tools & Workflow",
      icon: <Wrench className="h-6 w-6" />,
      skills: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Linux"],
      color: "secondary"
    },
    {
      title: "Design & UI/UX",
      icon: <Palette className="h-6 w-6" />,
      skills: ["Figma", "Adobe XD", "Responsive Design", "User Experience", "Prototyping"],
      color: "accent"
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card 
                key={category.title} 
                className="glass hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
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