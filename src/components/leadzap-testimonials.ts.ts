// leadzap-testimonials.ts
export type LeadZapTestimonial = {
  name: string;
  username: string;
  body: string;
  img: string;
  country: string;
  rating?: number;
  metrics?: string;   // e.g. "ROAS 4.2x", "Leads +187%"
  service?: "SEO" | "Ads" | "Software" | "Push" | "Pull";
};

export const leadzapTestimonials: LeadZapTestimonial[] = [
 
];
