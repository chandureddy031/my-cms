export interface Donation {
  id: number;
  name: string;
  email: string;
  amount: string;
  cause: string;
  message: string | null;
  created_at: string;
}

export interface DonationInput {
  name: string;
  email: string;
  cause: string;
  amount: number;
  message: string;
}

/** A programme a visitor can give to (built from an activity). */
export interface DonationCause {
  slug: string;
  title: string;
  label: string;
  image: string | null;
  summary: string;
}
