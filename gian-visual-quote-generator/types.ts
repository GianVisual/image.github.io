
export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Condition {
  id: string;
  title: string;
  description: string;
}

export interface QuoteData {
  clientName: string;
  clientSpecialty: string;
  clientImageUrl: string;
  projectName: string;
  projectBadge: string;
  heroSubtitle: string;
  services: Service[];
  price: number;
  currency: string;
  priceSectionText: string;
  conditions: Condition[];
  whatsappLink: string;
  phone: string;
  email: string;
}
