// routes/job-search.tsx
import type { Route } from "./+types/job-search";
import DisplayFiltersComponent from "components/DisplayFiltersComponent";
import SearchJobComponent from "components/SearchJobComponent";
import DisplayJobsComponent from "components/DisplayJobsComponent";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const searchInput = url.searchParams.get("search") || "";
  const department = url.searchParams.get("dept") || "";
  const location = url.searchParams.get("loc") || "";
  const func = url.searchParams.get("func") || "";

  // 1. Fetch jobs
  const apiUrl = new URL("https://teknorix.jobsoid.com/api/v1/jobs");
  if (searchInput) apiUrl.searchParams.set("search", searchInput);
  if (department) apiUrl.searchParams.set("dept", department);
  if (location) apiUrl.searchParams.set("loc", location);
  if (func) apiUrl.searchParams.set("fun", func);

  const res = await fetch(apiUrl.toString());
  if (!res.ok) {
    throw new Response("Failed to fetch jobs", { status: res.status });
  }
  const jobs: Job[] = await res.json();

  // 2. Fetch dropdown options
  let departments: { id: string; name: string }[] = [];
  let locations: { id: string; name: string }[] = [];
  let functions: { id: string; name: string }[] = [];

  try {
    const [deptRes, locRes, funcRes] = await Promise.all([
      fetch("https://demo.jobsoid.com/api/v1/departments"),
      fetch("https://demo.jobsoid.com/api/v1/locations"),
      fetch("https://demo.jobsoid.com/api/v1/functions"),
    ]);

    if (deptRes.ok) {
      const data = await deptRes.json();
      departments = data.map((d: any) => ({ id: String(d.id), name: d.title }));
    }
    if (locRes.ok) {
      const data = await locRes.json();
      // 🔹 include city+state here if you want
      locations = data.map((l: any) => ({
        id: String(l.id),
        name: `${l.title}${l.state ? `, ${l.state}` : ""}`,
      }));
    }
    if (funcRes.ok) {
      const data = await funcRes.json();
      functions = data.map((f: any) => ({ id: String(f.id), name: f.title }));
    }
  } catch {
    // swallow errors: filters just won't render if API fails
  }

  // 3. Build filter chips
  const filterChips: FilterChip[] = [
    department && {
      key: "department",
      id: department,
      label: departments.find((d) => d.id === department)?.name ?? department,
      param: "dept",
    },
    location && {
      key: "location",
      id: location,
      label: locations.find((l) => l.id === location)?.name ?? location,
      param: "loc",
    },
    func && {
      key: "function",
      id: func,
      label: functions.find((f) => f.id === func)?.name ?? func,
      param: "func",
    },
    searchInput && {
      key: "searchInput",
      id: searchInput,
      label: searchInput,
      param: "search",
    },
  ].filter(Boolean) as FilterChip[];

  return {
    jobs,
    filters: { searchInput, department, location, function: func },
    departments,
    locations,
    functions,
    filterChips, // ✅ pre-normalized chips ready for display
  };
}

// 👇 main page
export default function JobSearch({ loaderData }: Route.ComponentProps) {
  const { jobs, filters, departments, locations, functions, filterChips } =
    loaderData;

  return (
    <div className="container mx-auto space-y-6">
      <SearchJobComponent
        initialFilters={filters}
        departments={departments}
        locations={locations}
        functions={functions}
      />

      <DisplayFiltersComponent filterChips={filterChips} />

      <DisplayJobsComponent jobs={jobs} />
    </div>
  );
}
