import { ArrowUpRight, Mail, Instagram, Linkedin } from "lucide-react";
import { getCtaContent } from "@/lib/cta";

export default async function CTA() {
  const cta = await getCtaContent();

  const socials = [
    { label: "LinkedIn", icon: Linkedin, href: cta.linkedin_url, text: null },
    { label: "Instagram", icon: Instagram, href: cta.instagram_url, text: null },
    { label: "Behance", icon: null, href: cta.behance_url, text: "Be" },
    { label: "Dribbble", icon: null, href: cta.dribbble_url, text: "Dr" },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background accent — hidden on mobile for performance */}
      <div className="blur-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5212E] rounded-full blur-[200px] opacity-[0.07] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative text-center">
        <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-6">
          Let&apos;s Collaborate
        </p>

        <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
          Have a project
          <br />
          in mind
          <span className="text-[#E5212E]">?</span>
        </h2>

        <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed mb-12">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision. Let&apos;s build something great
          together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <a
            href={`mailto:${cta.email}`}
            className="group flex items-center gap-2 bg-[#E5212E] text-white px-6 py-4 rounded-full text-sm font-medium hover:bg-[#c41c28] transition-all duration-300 max-w-full overflow-hidden"
          >
            <Mail size={16} className="flex-shrink-0" />
            <span className="truncate">{cta.email}</span>
            <ArrowUpRight size={14} className="flex-shrink-0" />
          </a>
          <a
            href={`https://wa.me/${cta.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 text-gray-400 px-8 py-4 rounded-full text-sm font-medium hover:border-white/30 hover:text-white transition-all duration-300"
          >
            WhatsApp
          </a>
        </div>

        {/* Social links */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-16 pt-10 border-t border-white/[0.06]">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-white transition-colors"
            >
              {social.icon ? (
                <social.icon size={16} />
              ) : (
                <span className="text-sm font-bold">{social.text}</span>
              )}
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
