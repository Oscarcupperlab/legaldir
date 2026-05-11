export interface Lawyer {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  specialty: string;
  description: string | null;
  city: string | null;
  province: string | null;
  rating: number | null;
  review_count: number | null;
  years_experience: number | null;
  free_consultation: boolean | null;
  online_available: boolean | null;
  in_person_available: boolean | null;
  schedule: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  languages: string[] | null;
  tags: string[] | null;
  price_range: string | null;
  whatsapp: string | null;
  verified: boolean | null;
  created_at: string;
}

export interface SuccessCase {
  id: string;
  lawyer_id: string;
  title: string;
  description: string | null;
  year: number | null;
  created_at: string;
}

export function safeArray<T>(val: unknown): T[] {
  if (Array.isArray(val)) return val as T[];
  return [];
}
