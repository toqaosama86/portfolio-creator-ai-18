import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink, Calendar } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-CSA-2023-001",
      description: "Demonstrates expertise in designing distributed systems on AWS platform.",
      category: "Cloud Computing",
      link: "https://aws.amazon.com/certification/"
    },
    {
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "GCP-PD-2023-002",
      description: "Validates skills in developing scalable applications on Google Cloud Platform.",
      category: "Cloud Computing",
      link: "https://cloud.google.com/certification"
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "TensorFlow",
      date: "2022",
      credentialId: "TF-DEV-2022-003",
      description: "Proves proficiency in building and deploying machine learning models.",
      category: "Machine Learning",
      link: "https://www.tensorflow.org/certificate"
    },
    {
      title: "Meta React Developer Professional",
      issuer: "Meta (Coursera)",
      date: "2022",
      credentialId: "META-REACT-2022-004",
      description: "Comprehensive React.js development skills including advanced patterns.",
      category: "Frontend Development",
      link: "https://www.coursera.org/professional-certificates/meta-react-native"
    },
    {
      title: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2022",
      credentialId: "MDB-DEV-2022-005",
      description: "Expertise in MongoDB database design, development, and optimization.",
      category: "Database",
      link: "https://university.mongodb.com/certification"
    },
    {
      title: "Certified Scrum Master (CSM)",
      issuer: "Scrum Alliance",
      date: "2021",
      credentialId: "CSM-2021-006",
      description: "Agile project management and Scrum framework expertise.",
      category: "Project Management",
      link: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster"
    }
  ];

  const categories = [...new Set(certifications.map(cert => cert.category))];
  const categoryColors = {
    "Cloud Computing": "primary",
    "Machine Learning": "secondary", 
    "Frontend Development": "accent",
    "Database": "primary",
    "Project Management": "secondary"
  };

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Certifications & Achievements</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Professional certifications demonstrating expertise across various technologies and methodologies.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="px-4 py-2">
                {category}
              </Badge>
            ))}
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="glass hover-lift group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary"
                        className="text-xs"
                      >
                        {cert.category}
                      </Badge>
                      {cert.link && (
                        <a 
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-sm font-medium text-primary mb-2">
                    {cert.issuer}
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Issued: {cert.date}</span>
                    </div>
                    <div>
                      <span className="font-mono">ID: {cert.credentialId}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Professional Summary */}
          <div className="mt-12 text-center">
            <Card className="glass backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Continuous Learning
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  I believe in staying current with rapidly evolving technologies. These certifications 
                  represent my commitment to professional development and mastery of cutting-edge tools 
                  and methodologies in software development, cloud computing, and artificial intelligence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;