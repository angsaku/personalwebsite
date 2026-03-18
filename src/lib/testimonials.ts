import { getSupabase } from "./supabase";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  initials: string;
}

const fallback: Testimonial[] = [
  {
    id: "1",
    quote:
      "Working with [Your Name] was a game-changer for our product. They transformed complex workflows into a seamless experience our users love. Replace this with the actual testimonial from your client.",
    name: "Client Name",
    title: "CEO, Company Name",
    initials: "CN",
  },
  {
    id: "2",
    quote:
      "Exceptional design thinking and execution. [Your Name] brought clarity to our product vision and delivered designs that exceeded our expectations. Replace this with the actual testimonial.",
    name: "Client Name",
    title: "Product Manager, Tech Company",
    initials: "PM",
  },
  {
    id: "3",
    quote:
      "Not just a designer, but a true product partner. The work done on our platform resulted in a significant increase in user engagement. Replace this with the actual testimonial from your client.",
    name: "Client Name",
    title: "Co-Founder, Startup Name",
    initials: "CF",
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*");

  if (error) {
    console.error("[testimonials] Supabase error:", error.message);
    return fallback;
  }
  if (!data || data.length === 0) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    id: row.id,
    quote: row.quote,
    name: row.name,
    title: row.title,
    initials: row.initials,
  }));
}
