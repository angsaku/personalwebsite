import Image from "next/image";
import Link from "next/link";
import { Download, ArrowUpRight } from "lucide-react";
import { getAboutContent } from "@/lib/about";
import SkillTag from "@/components/SkillTag";

function toDirectImageUrl(url: string): string {
  // Convert Google Drive share URL to direct image URL
  // https://drive.google.com/file/d/FILE_ID/view → https://drive.google.com/uc?export=view&id=FILE_ID
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

export default async function About() {
  const about = await getAboutContent();

  return (
    <section
      id="about"
      className="py-24 px-6 bg-[#0a1128] border-y border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Photo */}
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl bg-[#020618] border border-white/[0.08] overflow-hidden flex items-center justify-center">
            {about.photoUrl ? (
              <Image
                src={toDirectImageUrl(about.photoUrl)}
                alt="Profile photo"
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-[#E5212E]/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-gray-600">👤</span>
                </div>
                <p className="text-xs text-gray-600 tracking-wide">
                  Your Photo Here
                </p>
              </div>
            )}
          </div>
          {/* Accent dot */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border border-[#E5212E]/30 bg-[#E5212E]/5" />
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl border border-white/5 bg-white/[0.02]" />
        </div>

        {/* Text */}
        <div className="space-y-6">
          <div>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">
              About Me
            </p>
            <h2 className="text-4xl font-bold text-white leading-tight mb-6">
              {about.heading}
              <span className="text-[#E5212E]">.</span>
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">{about.bioParagraph1}</p>
          <p className="text-gray-400 leading-relaxed">{about.bioParagraph2}</p>

          {/* Skills */}
          <div className="pt-4">
            <p className="text-xs text-gray-600 tracking-[0.2em] uppercase mb-4">
              Core Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>
          </div>

          {/* Resume CTA */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-gray-400 text-sm font-medium rounded-full hover:border-white/30 hover:text-white transition-colors"
            >
              More About Me
              <ArrowUpRight size={14} />
            </Link>
            {about.resumeUrl && (
              <a
                href={about.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E5212E] text-white text-sm font-medium rounded-full hover:bg-[#c41a25] transition-colors"
              >
                <Download size={15} />
                Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
