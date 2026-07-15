import { getServices } from "@/lib/services";
import ServicesClient from "@/components/ServicesClient";

export default async function Services() {
  const services = await getServices();

  return (
    <section className="sk-section" id="services">
      <div className="sk-section-tag sk-mono">
        <span className="num">04</span>
        <span>SERVICES / WHAT I DO FOR MONEY</span>
        <span className="sk-line" />
        <span>OPEN FOR PROJECTS ●</span>
      </div>

      <ServicesClient services={services} />
    </section>
  );
}
