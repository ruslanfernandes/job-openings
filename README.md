# Job Openings Search & Display

A searchable job listings portal built with React, React Router v7, TypeScript, and Material UI.  
This project allows users to search, filter, and view detailed job listings, styled closely after the Teknorix job portal.

---

## 🚀 Features

- **Search Bar**: Full-text search for job titles or descriptions.
- **Filters**: Department, Location, Function filters. Users can apply multiple filters; active filters displayed as removable chips.
- **Listings Page**: Jobs are grouped by department. Responsive layout with styled job cards.
- **Job Details Page**:
  - Key sections extracted from the full HTML description (Overview & Requirements).
  - Prominent `Apply` button.
  - Related jobs in the same department listed with metadata (department, location).

- **UI & Styling**:
  - Consistent color palette (blue accent, light grey backgrounds).
  - Material UI for components and layout.
  - Responsive design.

---

## 🛠 Tech Stack

- **Frontend**: React, React Router v7, TypeScript
- **UI Components**: Material UI (MUI v5)
- **Styling**: MUI `sx` props, light background colors, icons
- **Data Fetching**: Loader functions in route components (loader-based fetching)
- **Development Environment**: Vite (assuming from the repo structure)

---

## 📁 Project Structure

job-openings/
├── src/
│ ├── routes/
│ │ ├── job-search.tsx
│ │ ├── job-detail.tsx
│ ├── components/
│ │ ├── SearchJobComponent.tsx
│ │ ├── DisplayFiltersComponent.tsx
│ │ ├── DisplayJobsComponent.tsx
│ │ ├── JobComponent.tsx
│ ├── utils/
│ │ ├── htmlExtractor.ts # (if implemented) for extracting overview/requirements
│ │ └── filterUtils.ts # (if implemented) for building filter chips etc.
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── react-router.config.ts

yaml
Copy code

---

## 💡 Setup / Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ruslanfernandes/job-openings.git
   cd job-openings
   Install dependencies:
   ```

bash
Copy code
npm install

# or

yarn install
Run development server:

bash
Copy code
npm run dev

# or

yarn dev
Open your browser at http://localhost:5173 (or the port Vite uses) to view the app.

📌 Environment & API Endpoints
Jobs API: https://teknorix.jobsoid.com/api/v1/jobs

Departments / Locations / Functions: from https://demo.jobsoid.com/api/v1/...
