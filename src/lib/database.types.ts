export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      selected_work: {
        Row: {
          id: string;
          slug: string;
          number: string;
          title: string;
          category: string;
          description: string;
          tags: string[];
          year: string;
          thumbnail_url: string | null;
          cover_url: string | null;
          case_study_url: string | null;
          intro: string;
          challenge: string;
          process: Json; // { step: string; description: string; image_url?: string }[]
          outcome: string;
          metrics: Json; // { value: string; label: string }[]
          tools: string[];
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["selected_work"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["selected_work"]["Insert"]>;
      };
      experiences: {
        Row: {
          id: string;
          company: string;
          role: string;
          period: string;
          location: string;
          description: string;
          highlights: string[];
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["experiences"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["experiences"]["Insert"]>;
      };
      about_content: {
        Row: {
          id: string;
          heading: string;
          bio_paragraph_1: string;
          bio_paragraph_2: string;
          skills: string[];
          photo_url: string | null;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["about_content"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["about_content"]["Insert"]>;
      };
      hero_content: {
        Row: {
          id: string;
          short_description: string;
          years_experience: string;
          projects_delivered: string;
          happy_clients: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["hero_content"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["hero_content"]["Insert"]>;
      };
      client_logos: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["client_logos"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["client_logos"]["Insert"]>;
      };
      cta_content: {
        Row: {
          id: string;
          email: string;
          whatsapp_number: string;
          linkedin_url: string;
          instagram_url: string;
          behance_url: string;
          dribbble_url: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["cta_content"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["cta_content"]["Insert"]>;
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          name: string;
          title: string;
          initials: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["testimonials"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          tag: string;
          title: string;
          excerpt: string;
          read_time: string;
          date: string;
          intro: string;
          challenge: string;
          process: Json; // { step: string; description: string }[]
          outcome: string;
          metrics: Json; // { value: string; label: string }[]
          tools: string[];
          cover_url: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["posts"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
      };
    };
  };
};
