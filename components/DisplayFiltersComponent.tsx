import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useSearchParams } from "react-router";

interface Props {
  filterChips: FilterChip[];
}

const DisplayFiltersComponent: React.FC<Props> = ({ filterChips }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (!filterChips.length) return null;

  const removeFilter = (chip: FilterChip) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(chip.param); // ✅ remove just that filter
    navigate(`/job-search?${params.toString()}`);
  };

  const clearAll = () => {
    navigate("/job-search"); // ✅ clears everything
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#E5E7EB",
        p: 3,
        borderRadius: 2,
      }}
    >
      {/* Active Filters */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {filterChips.map((chip) => (
          <Box
            key={chip.key}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "white",
              border: "1px solid #E5E7EB",
              px: 2,
              py: 1,
              borderRadius: 1,
              fontSize: "0.875rem",
            }}
          >
            <Typography variant="body2">{chip.label}</Typography>
            <IconButton
              size="small"
              onClick={() => removeFilter(chip)}
              sx={{ color: "#16A34A", p: 0.5 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* Clear All */}
      <Typography
        variant="body2"
        sx={{
          color: "#16A34A",
          fontWeight: 500,
          cursor: "pointer",
          ml: 2,
        }}
        onClick={clearAll}
      >
        Clear All
      </Typography>
    </Box>
  );
};

export default DisplayFiltersComponent;
