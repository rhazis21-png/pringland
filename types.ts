export interface ProductFeature {
  label: string;
  value: string;
}

export interface Product {
  id: 'jogja' | 'bogor' | 'borneo';
  title: string;
  subtitle: string;
  location: string;
  priceStart: string;
  focus: string;
  targetAudience: string;
  image: string;
  colorTheme: 'jogja' | 'bogor' | 'borneo';
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}