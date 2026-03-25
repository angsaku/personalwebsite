import { getTestimonials } from "@/lib/testimonials";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-24 px-6 bg-[#0a1128] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            What clients say<span className="text-[#E5212E]">.</span>
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
          {testimonials.map((t, i) => (
            <div
              key={t.id ?? i}
              className="group relative bg-[#020618] border border-white/[0.06] rounded-2xl p-8 hover:border-[#E5212E]/30 transition-all duration-300 flex flex-col flex-shrink-0 w-[85vw] md:w-[360px] snap-start"
            >
              {/* Quote mark */}
              <div className="text-5xl text-[#E5212E]/20 font-serif leading-none mb-4 select-none">
                &ldquo;
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6 overflow-y-auto max-h-[7.5rem] pr-2 scrollbar-brand">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#E5212E]/10 border border-[#E5212E]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#E5212E]">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-gray-600">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
