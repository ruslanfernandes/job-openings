import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("job-search", "routes/job-search.tsx"),
  route("job-detail/:id", "routes/job-detail.tsx"),
] satisfies RouteConfig;
