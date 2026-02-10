export interface AspireEvent {
  id: string;
  date: Date;
  title: string;
  time: string;
  location: string;
  locationFull: string;
  registrationUrl: string;
  status: "upcoming" | "registration-open" | "sold-out";
}

export const aspireEvents2026: AspireEvent[] = [
  {
    id: "march-2026",
    date: new Date(2026, 2, 28), // March 28, 2026
    title: "ASPIRE GenAI Fluency Workshop",
    time: "10:00 AM - 6:00 PM",
    location: "Langston Tulsa",
    locationFull: "Langston University - Tulsa Campus",
    registrationUrl: "https://tally.so/embed/EkWBo2",
    status: "registration-open",
  },
  {
    id: "june-2026",
    date: new Date(2026, 5, 27), // June 27, 2026
    title: "ASPIRE GenAI Fluency Workshop",
    time: "10:00 AM - 6:00 PM",
    location: "Langston Tulsa",
    locationFull: "Langston University - Tulsa Campus",
    registrationUrl: "https://tally.so/embed/kd6Yyo",
    status: "upcoming",
  },
  {
    id: "september-2026",
    date: new Date(2026, 8, 26), // September 26, 2026
    title: "ASPIRE GenAI Fluency Workshop",
    time: "10:00 AM - 6:00 PM",
    location: "Langston Tulsa",
    locationFull: "Langston University - Tulsa Campus",
    registrationUrl: "https://tally.so/r/PLACEHOLDER_SEPTEMBER",
    status: "upcoming",
  },
  {
    id: "december-2026",
    date: new Date(2026, 11, 5), // December 5, 2026
    title: "ASPIRE GenAI Fluency Workshop",
    time: "10:00 AM - 6:00 PM",
    location: "Langston Tulsa",
    locationFull: "Langston University - Tulsa Campus",
    registrationUrl: "https://tally.so/r/PLACEHOLDER_DECEMBER",
    status: "upcoming",
  },
];

export const getEventDates = (): Date[] => {
  return aspireEvents2026.map((event) => event.date);
};

export const getEventByDate = (date: Date): AspireEvent | undefined => {
  return aspireEvents2026.find(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  );
};
