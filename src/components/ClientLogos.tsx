import { getClientLogos } from "@/lib/client-logos";

export default async function ClientLogos() {
  const clients = await getClientLogos();
  const doubled = [...clients, ...clients];

  return (
    <section className="py-16 border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <p className="text-xs text-gray-600 tracking-[0.3em] uppercase text-center">
          Trusted by forward-thinking companies
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020618] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020618] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {doubled.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="inline-flex items-center gap-3 text-gray-600 hover:text-gray-400 transition-colors cursor-default select-none"
            >
              <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {client.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[10px] font-bold text-gray-500">
                    {client.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium tracking-wide">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
