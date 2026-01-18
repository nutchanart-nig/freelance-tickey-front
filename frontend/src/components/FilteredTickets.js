import React from "react";
import {
  Box,
  Button,
  Typography,
  Chip,
} from "@mui/material";

const FilteredTickets = ({ activeFilter, onFilterChange, ticketStats }) => {
  const statusFilters = [
    { key: "all", label: "All Tickets", color: "default" },
    { key: "open", label: "Open", color: "success" },
    { key: "in-progress", label: "In Progress", color: "warning" },
    { key: "urgent", label: "Urgent", color: "error" },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter by Status
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {statusFilters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "contained" : "outlined"}
            size="small"
            onClick={() => {
              // If clicking the currently active filter, clear it (go to "all")
              // Otherwise, apply the new filter
              if (activeFilter === filter.key) {
                onFilterChange("all");
              } else {
                onFilterChange(filter.key);
              }
            }}
            sx={{
              minWidth: "auto",
              px: 2,
              py: 0.5,
              borderRadius: 2,
            }}
          >
            {filter.label}
            {ticketStats && ticketStats[filter.key] !== undefined && (
              <Chip
                label={ticketStats[filter.key]}
                size="small"
                color={filter.color}
                sx={{
                  ml: 1,
                  height: 18,
                  fontSize: "0.7rem",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            )}
          </Button>
        ))}
      </Box>

      {activeFilter !== "all" && (
        <Typography variant="body2" color="text.secondary">
          Showing {statusFilters.find(f => f.key === activeFilter)?.label.toLowerCase()} tickets
          {ticketStats && ` (${ticketStats[activeFilter] || 0})`}
          <br />
          <Typography component="span" variant="caption" sx={{ fontStyle: "italic" }}>
            Click the button again to clear filter
          </Typography>
        </Typography>
      )}
    </Box>
  );
};

export default FilteredTickets;