import React from "react";
import { useNavigate } from "react-router";
import JobComponent from "./JobComponent";
import { Box, Typography, Paper, Divider } from "@mui/material";

interface DisplayJobsProps {
  jobs: Job[];
}

const DisplayJobsComponent: React.FC<DisplayJobsProps> = ({ jobs }) => {
  const navigate = useNavigate();

  // Group jobs by department
  const jobsByDepartment = jobs.reduce<Record<string, Job[]>>((acc, job) => {
    const deptKey = job.department?.title ?? "Unknown Department";

    if (!acc[deptKey]) acc[deptKey] = [];
    acc[deptKey].push(job);

    return acc;
  }, {});

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {Object.entries(jobsByDepartment).map(([department, deptJobs]) => (
        <Paper
          key={department}
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          {/* Department Heading */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              pb: 1,
              mb: 3,
              borderBottom: "2px solid #2563EB", // consistent accent color
              width: "fit-content",
            }}
          >
            {department}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {deptJobs.map((job) => (
              <JobComponent
                key={job.id}
                job={job}
                onApply={() => window.open(job.applyUrl, "_blank")}
                onView={() => navigate(`/job-detail/${job.id}`)}
              />
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default DisplayJobsComponent;
