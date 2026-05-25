import type { ServiceSlug } from './services';

export interface GroupCohort {
  serviceSlug: ServiceSlug;
  name: string;
  duration: string;        // e.g., "10-week course"
  schedule: string;        // e.g., "Tue + Thu, 6pm ET"
  startDate: string;       // e.g., "Starts June 10"
  seatsLeft: number;
  capSize: number;         // e.g., 8
  totalPrice: number;      // e.g., 1800
  perHour: number;
}

export const groupCohorts: GroupCohort[] = [
  {
    serviceSlug: 'sat',
    name: 'SAT Mastery',
    duration: '10-week course',
    schedule: 'Tue + Thu · 6pm ET',
    startDate: 'Starts June 10',
    seatsLeft: 3,
    capSize: 8,
    totalPrice: 1800,
    perHour: 60,
  },
  {
    serviceSlug: 'sat',
    name: 'SAT Mastery',
    duration: '10-week course',
    schedule: 'Sat · 10am ET',
    startDate: 'Starts July 5',
    seatsLeft: 6,
    capSize: 8,
    totalPrice: 1800,
    perHour: 60,
  },
  {
    serviceSlug: 'act',
    name: 'ACT Sprint',
    duration: '6-week sprint',
    schedule: 'Mon + Wed · 7pm ET',
    startDate: 'Starts June 17',
    seatsLeft: 5,
    capSize: 8,
    totalPrice: 1080,
    perHour: 60,
  },
  {
    serviceSlug: 'ap',
    name: 'AP Calculus AB / BC',
    duration: '8-week course',
    schedule: 'Sat · 1pm ET',
    startDate: 'Starts June 8',
    seatsLeft: 4,
    capSize: 8,
    totalPrice: 1440,
    perHour: 60,
  },
  {
    serviceSlug: 'ap',
    name: 'AP Biology',
    duration: '8-week course',
    schedule: 'Sun · 2pm ET',
    startDate: 'Starts June 9',
    seatsLeft: 7,
    capSize: 8,
    totalPrice: 1440,
    perHour: 60,
  },
  {
    serviceSlug: 'college-counseling',
    name: 'Rising Senior Cohort',
    duration: '12-week course',
    schedule: 'Thu · 7pm ET',
    startDate: 'Starts June 12',
    seatsLeft: 2,
    capSize: 6,
    totalPrice: 2400,
    perHour: 67,
  },
];

export const groupFormatSummary = {
  capSize: 8,
  perHourRange: '$60–80/hr',
  vsPrivate: 'Half the price of 1-on-1, set start dates',
};
