import React from "react";
import { Card, Typography, Button, Box, Chip } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface JobComponentProps {
  job: Job;
  onApply: () => void;
  onView: () => void;
}

const JobComponent: React.FC<JobComponentProps> = ({
  job,
  onApply,
  onView,
}) => {
  return (
    <Card
      sx={{
        boxShadow: 1,
        "&:hover": { boxShadow: 3 },
        transition: "0.3s",
        p: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%", // full width
      }}
    >
      {/* Job Info */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          {job.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Department */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {job.department?.title}
            </Typography>
          </Box>

          {/* Location */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {job.location?.title}, {job.location?.state}
            </Typography>
          </Box>

          {/* Job Type */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Chip
              label={job.type}
              size="small"
              sx={{
                bgcolor: "#E5E7EB", // gray chip background
                fontWeight: 500,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 1, ml: 3 }}>
        <Button
          onClick={onApply}
          variant="outlined"
          sx={{
            borderColor: "#2563EB",
            color: "#2563EB",
            textTransform: "none",
            borderRadius: "9999px",
            px: 3,
          }}
        >
          Apply
        </Button>

        <Button
          onClick={onView}
          variant="text"
          sx={{
            color: "black",
            textTransform: "none",
          }}
        >
          View
        </Button>
      </Box>
    </Card>
  );
};

export default JobComponent;
