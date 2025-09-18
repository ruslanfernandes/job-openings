// routes/job-detail.tsx
import type { Route } from "./+types/job-detail";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Paper,
} from "@mui/material";
import { Link, useSearchParams } from "react-router";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";

const ACCENT_BLUE = "#2563EB"; // Tailwind's blue-600

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  if (!id) {
    throw new Response("Job ID is required", { status: 400 });
  }

  // Fetch job details
  const jobRes = await fetch(`https://teknorix.jobsoid.com/api/v1/jobs/${id}`);
  if (!jobRes.ok) {
    throw new Response("Failed to fetch job details", {
      status: jobRes.status,
    });
  }
  const job: Job = await jobRes.json();

  // Fetch other jobs in the same department
  let deptJobs: Job[] = [];
  if (job.department?.id) {
    const deptJobsRes = await fetch(
      `https://teknorix.jobsoid.com/api/v1/jobs?dept=${job.department.id}`
    );
    if (deptJobsRes.ok) {
      deptJobs = await deptJobsRes.json();
    }
  }

  return { job, deptJobs };
}

export default function JobDetails({ loaderData }: Route.ComponentProps) {
  const { job, deptJobs } = loaderData as { job: Job; deptJobs: Job[] };
  const [searchParams] = useSearchParams();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 4, bgcolor: "#F9FAFB" }}>
        {/* 1. Job Info Header */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
          {/* Job Info */}
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              {job.department?.title} Department at Teknorix Systems,{" "}
              {job.location?.state}
            </Typography>

            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
              {job.title}
            </Typography>

            {/* Meta details with icons */}
            <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BusinessIcon fontSize="small" color="action" />
                <Typography variant="body2">{job.department?.title}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2">
                  {job.location?.city}, {job.location?.state}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WorkIcon fontSize="small" color="action" />
                <Typography variant="body2">{job.type}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Apply Button below Job Info */}
          {job.applyUrl && (
            <Button
              variant="contained"
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: "220px",
                fontWeight: 600,
                color: "white",
                bgcolor: ACCENT_BLUE,
                "&:hover": { bgcolor: "#1D4ED8" }, // darker on hover
                borderRadius: "9999px", // rounded
                py: 1.5,
              }}
            >
              Apply
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* 2 & 3. Job Description + Related Jobs */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Job Description (flex: 2) */}
          <Box sx={{ flex: 2 }}>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </Box>

          {/* Related Jobs (flex: 1) */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "#F3F4F6", // light grey background
              p: 3,
              borderRadius: 2,
              maxHeight: "500px", // scrollable
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                borderBottom: `2px solid ${ACCENT_BLUE}`,
                display: "inline-block",
                pb: 0.5,
                mb: 2,
              }}
            >
              Other Job Openings
            </Typography>

            {deptJobs
              .filter((j) => j.id !== job.id)
              .map((j) => (
                <Box
                  key={j.id}
                  component={Link}
                  to={`/job-detail/${j.id}?${searchParams.toString()}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mb: 2,
                    p: 2,
                    bgcolor: "#F3F4F6", // same grey as parent
                    border: "1px solid #E5E7EB",
                    borderRadius: 1,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {j.title}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <BusinessIcon fontSize="small" color="action" />
                      <Typography variant="caption">
                        {j.department?.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="caption">
                        {j.location?.city}, {j.location?.state}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
