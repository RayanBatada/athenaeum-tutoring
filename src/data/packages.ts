export type Package = {
  hours: number;
  price: number;
  perHour: number;
  tagline: string;
};

export const packages: Package[] = [
  { hours: 8,  price: 1200, perHour: 150, tagline: 'Targeted prep for one section or topic' },
  { hours: 16, price: 2240, perHour: 140, tagline: 'Full-test prep with weekly cadence' },
  { hours: 24, price: 3120, perHour: 130, tagline: 'Deep prep plus practice tests and review' },
];
