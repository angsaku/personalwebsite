import { ArrowUpRight, Mail, Instagram, Linkedin, MessageCircle, Github, Youtube } from "lucide-react";
import { getCtaContent } from "@/lib/cta";
import InquiryForm from "@/components/InquiryForm";

function XLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default async function CTA() {
  const cta = await getCtaContent();

  const allSocials = [
    { label: "LinkedIn", icon: Linkedin, href: cta.linkedin_url, text: null, svg: null },
    { label: "Instagram", icon: Instagram, href: cta.instagram_url, text: null, svg: null },
    { label: "GitHub", icon: Github, href: cta.github_url, text: null, svg: null },
    { label: "X", icon: null, href: cta.twitter_url, text: null, svg: XLogo },
    { label: "YouTube", icon: Youtube, href: cta.youtube_url, text: null, svg: null },
    { label: "Behance", icon: null, href: cta.behance_url, text: "Be", svg: null },
    { label: "Dribbble", icon: null, href: cta.dribbble_url, text: "Dr", svg: null },
    { label: "TikTok", icon: null, href: cta.tiktok_url, text: "Tt", svg: null },
  ];

  const socials = allSocials.filter((s) => s.href);

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background accent — hidden on mobile for performance */}
      <div className="blur-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5212E] rounded-full blur-[200px] opacity-[0.07] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative text-center">
        <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-6">
          {cta.label}
        </p>

        <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
          <span className="sk-glitch sk-glitch-solid sk-shake block" data-text={cta.headline}>{cta.headline}</span>
        </h2>

        <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed mb-12">
          {cta.body_text}
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
            className="flex items-center gap-2 border border-white/10 text-gray-400 px-6 py-4 rounded-full text-sm font-medium hover:border-white/30 hover:text-white transition-all duration-300"
          >
            <MessageCircle size={16} className="flex-shrink-0" />
            WhatsApp
          </a>
        </div>

        {/* Inquiry form */}
        <div className="mt-16 pt-10 border-t border-white/[0.06] max-w-xl mx-auto w-full">
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-6 text-center">
            Or fill out a project brief
          </p>
          <InquiryForm />
        </div>

        {/* Social links */}
        <div className="flex flex-row items-center justify-center gap-3 mt-16 pt-10 border-t border-white/[0.06]">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 border border-transparent hover:text-white hover:bg-[#E5212E]/10 hover:border-[#E5212E]/40 transition-all duration-200"
            >
              {social.icon ? (
                <social.icon size={16} />
              ) : social.svg ? (
                <social.svg size={16} />
              ) : (
                <span className="text-xs font-bold leading-none">{social.text}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
