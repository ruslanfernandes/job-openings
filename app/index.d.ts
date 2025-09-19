declare interface Job {
  id: number;
  code: string;
  title: string;
  description: string; // API gives plain string, but treat as HTML string if rendering
  type: string; // e.g. "Full Time"
  positions: string; // 👈 string, not number
  experience: string;
  salary: string;
  industry: string;
  postedDate: string; // ISO string
  closingDate: string | null;

  location: {
    id: number;
    title: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };

  department: {
    id: number;
    title: string;
  };

  division: {
    id: number;
    title: string;
  }; // 👈 single object, not array

  function: {
    id: number;
    title: string;
  };

  hostedUrl: string;
  applyUrl: string;
}

declare interface Filters {
  searchInput: string;
  department: string;
  location: string;
  function: string;
}

declare type FilterChip = {
  key: "department" | "location" | "function" | "searchInput";
  id: string;
  label: string;
  param: string; // maps back to query param
};
