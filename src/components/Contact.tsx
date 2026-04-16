"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Button from "./ui/Button";
import { Mail, Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";
import socialLinks from "@/lib/data/social-links.json";
import type { SocialLink } from "@/lib/types";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

const iconMap = {
  Github,
  Twitter,
  Linkedin,
  Instagram,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scriptURL = process.env.NEXT_PUBLIC_SHEETS_MACRO_URL;

      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.Name);
      formDataToSend.append("Email", formData.Email);
      formDataToSend.append("Message", formData.Message);
      formDataToSend.append("Date", new Date().toLocaleString());

      const response = await fetch(scriptURL!, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ Name: "", Email: "", Message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error!", error);
      toast.error("Failed to send message", {
        description: "Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="mb-16 text-center text-4xl font-bold text-foreground">
          Contact Me
        </h2>
        <Card className="mx-auto max-w-6xl border-border/20 bg-card/10 p-0 backdrop-blur-sm md:grid md:grid-cols-2 md:gap-16">
          <CardContent className="p-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <CardTitle className="mb-8 text-3xl font-bold text-card-foreground">
                Get in Touch
              </CardTitle>
              <div className="space-y-6">
                <a
                  href="mailto:shuvadiptadas8820@gmail.com"
                  className="group flex cursor-none items-center gap-4"
                >
                  <Mail className="h-8 w-8 text-accent transition-transform group-hover:scale-110" />
                  <span className="text-lg text-muted-foreground transition-colors group-hover:text-foreground">
                    shuvadiptadas8820@gmail.com
                  </span>
                </a>
              </div>
              <div className="mt-10 flex space-x-6">
                {(socialLinks as SocialLink[]).map((link, index) => {
                  const IconComponent = iconMap[link.icon];
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => window.open(link.href, "_blank")}
                      className="cursor-none text-muted-foreground transition-colors hover:text-accent"
                      aria-label={link.label}
                    >
                      <IconComponent size={28} />
                    </button>
                  );
                })}
              </div>
              <div className="mt-12">
                <Button
                  className="rounded-full"
                  onClick={() => {
                    const cvUrl = process.env.NEXT_PUBLIC_CV_URL;
                    window.open(cvUrl, "_blank");
                  }}
                >
                  View Resume
                </Button>
              </div>
            </motion.div>
          </CardContent>

          <CardContent className="p-8">
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{
                duration: 0.6,
                delay: isInView ? 0.1 : 0,
                ease: "easeOut",
              }}
              className="mt-12 md:mt-0"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                <input
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-2 border-border bg-background p-4 text-foreground placeholder-muted-foreground transition-all focus:border-accent focus:outline-none focus:ring-0 focus:shadow-[0_0_0_1px_hsl(var(--accent))]"
                  required
                />
                <input
                  type="email"
                  name="Email"
                  placeholder="Your Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-2 border-border bg-background p-4 text-foreground placeholder-muted-foreground transition-all focus:border-accent focus:outline-none focus:ring-0 focus:shadow-[0_0_0_1px_hsl(var(--accent))]"
                  required
                />
                <textarea
                  name="Message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.Message}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-2 border-border bg-background p-4 text-foreground placeholder-muted-foreground transition-all focus:border-accent focus:outline-none focus:ring-0 focus:shadow-[0_0_0_1px_hsl(var(--accent))]"
                  required
                />
              </div>
              <div className="mt-6">
                <Button
                  className="w-full rounded-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </div>
            </motion.form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
