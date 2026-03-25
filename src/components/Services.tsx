import { getServices } from "@/lib/services";

export default async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">
              Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              What I can do<span className="text-[#E5212E]">.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            From pixels to strategy — a range of design and management services
            tailored to your product needs.
          </p>
        </div>

        {/* Service list */}
        <div className="divide-y divide-white/[0.06]">
          {services.map((service) => (
            <div
              key={service.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 hover:bg-white/[0.015] -mx-4 px-4 rounded-2xl transition-colors duration-300"
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span className="text-xs text-[#E5212E]/50 font-mono group-hover:text-[#E5212E] transition-colors">
                  {service.number}
                </span>
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[#E5212E] transition-colors leading-snug">
                  {service.title}
                </h3>
              </div>

              {/* Description + tags */}
              <div className="md:col-span-7 space-y-4">
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-600 border border-white/[0.06] group-hover:border-[#E5212E]/20 px-3 py-1 rounded-full transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
