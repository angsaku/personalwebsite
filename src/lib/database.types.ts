export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          tag: string;
          title: string;
          excerpt: string;
          read_time: string;
          date: string;
          cover_url: string | null;
          content: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          tag?: string;
          excerpt?: string;
          read_time?: string;
          date?: string;
          cover_url?: string | null;
          content?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          tag?: string;
          excerpt?: string;
          read_time?: string;
          date?: string;
          cover_url?: string | null;
          content?: string | null;
          published?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
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
          process: Json;
          outcome: string;
          metrics: Json;
          tools: string[];
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          number?: string;
          category?: string;
          description?: string;
          tags?: string[];
          year?: string;
          thumbnail_url?: string | null;
          cover_url?: string | null;
          case_study_url?: string | null;
          intro?: string;
          challenge?: string;
          process?: Json;
          outcome?: string;
          metrics?: Json;
          tools?: string[];
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          number?: string;
          title?: string;
          category?: string;
          description?: string;
          tags?: string[];
          year?: string;
          thumbnail_url?: string | null;
          cover_url?: string | null;
          case_study_url?: string | null;
          intro?: string;
          challenge?: string;
          process?: Json;
          outcome?: string;
          metrics?: Json;
          tools?: string[];
          published?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      client_logos: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: { id?: string; name: string; logo_url?: string | null; sort_order?: number };
        Update: { name?: string; logo_url?: string | null; sort_order?: number };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          number: string;
          title: string;
          description: string;
          tags: string[];
          sort_order: number;
          created_at: string;
        };
        Insert: { id?: string; number?: string; title: string; description?: string; tags?: string[]; sort_order?: number };
        Update: { number?: string; title?: string; description?: string; tags?: string[]; sort_order?: number };
        Relationships: [];
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
        Insert: { id?: string; email?: string; whatsapp_number?: string; linkedin_url?: string; instagram_url?: string; behance_url?: string; dribbble_url?: string };
        Update: { email?: string; whatsapp_number?: string; linkedin_url?: string; instagram_url?: string; behance_url?: string; dribbble_url?: string; updated_at?: string };
        Relationships: [];
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
        Insert: { id?: string; quote: string; name: string; title?: string; initials?: string; sort_order?: number };
        Update: { quote?: string; name?: string; title?: string; initials?: string; sort_order?: number };
        Relationships: [];
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
        Insert: { id?: string; company: string; role?: string; period?: string; location?: string; description?: string; highlights?: string[]; sort_order?: number };
        Update: { company?: string; role?: string; period?: string; location?: string; description?: string; highlights?: string[]; sort_order?: number };
        Relationships: [];
      };
      about_content: {
        Row: {
          id: string;
          heading: string;
          bio_paragraph_1: string;
          bio_paragraph_2: string;
          skills: string[];
          photo_url: string | null;
          resume_url: string | null;
          updated_at: string;
        };
        Insert: { id?: string; heading?: string; bio_paragraph_1?: string; bio_paragraph_2?: string; skills?: string[]; photo_url?: string | null; resume_url?: string | null };
        Update: { heading?: string; bio_paragraph_1?: string; bio_paragraph_2?: string; skills?: string[]; photo_url?: string | null; resume_url?: string | null; updated_at?: string };
        Relationships: [];
      };
      hero_content: {
        Row: {
          id: string;
          short_description: string;
          years_experience: string;
          projects_delivered: string;
          happy_clients: string;
          og_image_url: string | null;
          updated_at: string;
        };
        Insert: { id?: string; short_description?: string; years_experience?: string; projects_delivered?: string; happy_clients?: string; og_image_url?: string | null };
        Update: { short_description?: string; years_experience?: string; projects_delivered?: string; happy_clients?: string; og_image_url?: string | null; updated_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
