"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { supabase } from "../integrations/supabase/client";  // ✅ Supabase client

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_klf4p8h";   // 🔹 replace with your EmailJS service ID
    const templateID = "template_omft54k"; // 🔹 replace with your template ID
    const publicKey = "CLFP4f4l-DHeen9E8"; // 🔹 replace with your public key

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      // Quick runtime checks for common misconfiguration
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Missing Supabase env vars', { supabaseUrl, supabaseAnonKey });
        toast({
          title: 'Supabase not configured',
          description:
            'VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Add them to your environment (.env) and restart dev server.',
        });
        setIsSubmitting(false);
        return;
      }

      // 1. Save message into Supabase first so it always appears in the dashboard
      const { data: saved, error: insertError } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]).select();

      if (insertError) {
        console.error("Supabase insert error:", insertError);

        // Provide actionable guidance when Row Level Security or permissions block the insert
        const msg = insertError.message || String(insertError);
        const isPermission = /permission|row level security|RLS|forbidden|not authorized|401|403/i.test(msg);

        if (isPermission) {
          toast({
            title: 'Save failed - permission',
            description:
              `Insert blocked: ${msg}. If you use Row Level Security (RLS), allow public inserts or require authentication. For quick testing you can disable RLS on the table.`,
          });
        } else {
          toast({
            title: 'Save failed',
            description: msg,
          });
        }

        return;
      }

      toast({
        title: "Message Saved",
        description: "Your message was saved. Attempting to send email...",
      });

      // 2. Attempt to send email via EmailJS but don't fail the whole flow if it errors
      try {
        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        toast({
          title: "Email Sent",
          description: "Notification email sent successfully.",
        });
      } catch (emailErr) {
        console.error("EmailJS error:", emailErr);
        const emailMsg = emailErr?.text || emailErr?.message || String(emailErr);
        toast({
          title: "Email Send Failed",
          description: `Message saved but email failed: ${emailMsg}. Check EmailJS credentials.`,
        });
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submit Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    href="mailto:toqaosama86@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    toqaosama86@gmail.com
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
                    href="tel:+201155388410"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    01155388410
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
                    Cairo, Egypt / Remote
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
                      href="https://github.com/toqaosama"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://linkedin.com/in/toqa-osama-7b19b9225/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
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
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </span>
                      )}
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
