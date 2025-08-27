import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Twitter,
  Send
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show a toast. Later this can integrate with Supabase
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can work together 
            to bring your ideas to life.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href="mailto:john.doe@example.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    john.doe@example.com
                  </a>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href="tel:+1234567890"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +1 (234) 567-8900
                  </a>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Remote / Available Worldwide
                  </p>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Follow Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          className="bg-card"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="bg-card"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        required
                        className="bg-card"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                        className="bg-card resize-none"
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full group">
                      <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;