import React, { useState } from "react";
import { useSearchParams } from "react-router";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  CircularProgress,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  initialFilters: Filters;
  departments: { id: string; name: string }[];
  locations: { id: string; name: string }[];
  functions: { id: string; name: string }[];
  lookupError?: string | null;
}

const SearchJobComponent: React.FC<Props> = ({
  initialFilters,
  departments,
  locations,
  functions,
  lookupError,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [formData, setFormData] = useState<Filters>({
    searchInput: initialFilters.searchInput || "",
    department: initialFilters.department || "",
    location: initialFilters.location || "",
    function: initialFilters.function || "",
  });

  const handleChange = (field: keyof Filters, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newParams = new URLSearchParams();
    if (formData.searchInput) newParams.set("search", formData.searchInput);
    if (formData.department) newParams.set("dept", formData.department);
    if (formData.location) newParams.set("loc", formData.location);
    if (formData.function) newParams.set("func", formData.function);

    setSearchParams(newParams);
  };

  const isLoading =
    !departments.length &&
    !locations.length &&
    !functions.length &&
    !lookupError;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        bgcolor: "#E5E7EB", // Tailwind's gray-100
        p: 4, // padding: 32px
        //  subtle shadow like card
      }}
    >
      {/* 🔍 Search Input with Icon Button inside */}
      <TextField
        placeholder="Search for jobs"
        variant="outlined"
        value={formData.searchInput}
        sx={{ bgcolor: "white", border: "none", borderRadius: 0 }}
        onChange={(e) => handleChange("searchInput", e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" color="primary">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* 3 dropdowns in one row */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Department */}
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            label="Department"
            disabled={isLoading || !!lookupError}
            sx={{
              bgcolor: "white", // white background
              border: "none", // remove border
              borderRadius: 0,
            }}
          >
            {isLoading && (
              <MenuItem disabled>
                <CircularProgress size={16} sx={{ mr: 1 }} /> Loading...
              </MenuItem>
            )}
            {lookupError && (
              <MenuItem disabled>
                <Typography color="error">{lookupError}</Typography>
              </MenuItem>
            )}
            {!isLoading &&
              !lookupError &&
              departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {/* Location */}
        <FormControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            label="Location"
            disabled={isLoading || !!lookupError}
            sx={{
              bgcolor: "white", // white background
              border: "none", // remove border
              borderRadius: 0,
            }}
          >
            {isLoading && <MenuItem disabled>Loading...</MenuItem>}
            {lookupError && (
              <MenuItem disabled>
                <Typography color="error">{lookupError}</Typography>
              </MenuItem>
            )}
            {!isLoading &&
              !lookupError &&
              locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {/* Function */}
        <FormControl fullWidth>
          <InputLabel>Function</InputLabel>
          <Select
            value={formData.function}
            onChange={(e) => handleChange("function", e.target.value)}
            label="Function"
            disabled={isLoading || !!lookupError}
            sx={{
              bgcolor: "white", // white background
              border: "none", // remove border
              borderRadius: 0,
            }}
          >
            {isLoading && <MenuItem disabled>Loading...</MenuItem>}
            {lookupError && (
              <MenuItem disabled>
                <Typography color="error">{lookupError}</Typography>
              </MenuItem>
            )}
            {!isLoading &&
              !lookupError &&
              functions.map((func) => (
                <MenuItem key={func.id} value={func.id}>
                  {func.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SearchJobComponent;
