export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shoob.me";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shuvadipta Das",
    url: baseUrl,
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, TypeScript, and Node.js. Building robust web applications and seamless digital experiences.",
    sameAs: [
      "https://github.com/5h0ov",
      "https://linkedin.com/in/shuvadiptadas",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Full Stack Development",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shuvadipta Das Portfolio",
    url: baseUrl,
    author: {
      "@type": "Person",
      name: "Shuvadipta Das",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
