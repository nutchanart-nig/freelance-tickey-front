import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Fab,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Add as AddIcon, FilterList as FilterIcon, Search as SearchIcon } from "@mui/icons-material";
import TicketCard from "../components/TicketCard";
import CreateTicket from "../components/CreateTicket";
import TicketCardEdit from "../components/TicketCardEdit";

const Ticker = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Fix Login Bug",
      details:
        "Users are experiencing issues when trying to log in with their email addresses. The system shows an error message even with valid credentials.",
      endTime: "2024-01-15 14:30",
      status: "in-progress",
      priority: "high",
      backgroundColor: "#fff3e0",
    },
    {
      id: 2,
      title: "Update User Profile",
      details:
        "Implement the ability for users to update their profile information including name, email, and profile picture.",
      endTime: "2024-01-20 16:00",
      status: "open",
      priority: "medium",
      backgroundColor: "#e8f5e8",
    },
    {
      id: 3,
      title: "Database Optimization",
      details:
        "Optimize database queries to improve application performance. Current load times are above acceptable thresholds.",
      endTime: "2024-01-25 12:00",
      status: "urgent",
      priority: "high",
      backgroundColor: "#ffebee",
    },
    {
      id: 4,
      title: "Add Dark Mode",
      details:
        "Implement dark mode theme toggle for better user experience, especially in low-light environments.",
      endTime: "2024-02-01 10:00",
      status: "open",
      priority: "low",
      backgroundColor: "#f3e5f5",
    },
  ]);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateTicket = (ticketData) => {
    const ticket = {
      id: tickets.length + 1,
      ...ticketData,
    };
    setTickets([...tickets, ticket]);
  };

  const handleEditTicket = (ticketId) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setOpenEditDialog(true);
    }
  };

  const handleUpdateTicket = (ticketId, updatedData) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, ...updatedData }
        : ticket
    ));
    setSelectedTicket(null);
  };

  const getTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  const getFilteredTicketsByStatus = (status) => {
    return filteredTickets.filter((ticket) => ticket.status === status);
  };

  const getFilteredTickets = () => {
    if (!searchTerm.trim()) {
      return tickets;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return tickets.filter((ticket) =>
      ticket.title.toLowerCase().includes(lowerSearchTerm) ||
      ticket.details.toLowerCase().includes(lowerSearchTerm) ||
      ticket.status.toLowerCase().includes(lowerSearchTerm) ||
      ticket.priority.toLowerCase().includes(lowerSearchTerm)
    );
  };

  const filteredTickets = getFilteredTickets();

  return (
    <Container 
      maxWidth={false}
      sx={{
        mt: 4,
        mb: 4,
        maxWidth: '1920px',
        width: '100%'
      }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Ticket
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Panel - Create and Filters */}
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateDialog(true)}
            sx={{ mb: 2 }}
          >
            Create New Ticket
          </Button>

          <Paper sx={{ p: 3, height: "fit-content" }}>
            <Typography variant="h6" gutterBottom>
              Filter
            </Typography>

            {/* <Button
              variant="outlined"
              fullWidth
              startIcon={<FilterIcon />}
              sx={{ mb: 3 }}
            >
              Filter Tickets
            </Button> */}

            {/* Quick Stats */}
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Quick Stats {searchTerm && `(Filtered: ${filteredTickets.length})`}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Total Tickets:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {searchTerm ? filteredTickets.length : tickets.length}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Open:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {searchTerm ? getFilteredTicketsByStatus("open").length : getTicketsByStatus("open").length}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">In Progress:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {searchTerm ? getFilteredTicketsByStatus("in-progress").length : getTicketsByStatus("in-progress").length}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Urgent:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {searchTerm ? getFilteredTicketsByStatus("urgent").length : getTicketsByStatus("urgent").length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Panel - Ticket Cards */}
        <Grid item xs={12} md={10}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
              All Tickets
            </Typography>

            <TextField
              placeholder="Search tickets..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 500, maxWidth:650 }}
            />
          </Box>

          <Grid container spacing={3}>
            {filteredTickets.map((ticket) => (
              <Grid item xs={12} sm={4} lg={3} key={ticket.id}>
                <TicketCard
                  title={ticket.title}
                  details={ticket.details}
                  endTime={ticket.endTime}
                  status={ticket.status}
                  priority={ticket.priority}
                  backgroundColor={ticket.backgroundColor}
                  onEdit={() => handleEditTicket(ticket.id)}
                />
              </Grid>
            ))}
          </Grid>

          {filteredTickets.length === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchTerm ? "No tickets match your search" : "No tickets found"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchTerm
                  ? "Try adjusting your search terms or clear the search to see all tickets"
                  : "Create your first ticket to get started"
                }
              </Typography>
              {searchTerm ? (
                <Button
                  variant="outlined"
                  onClick={() => setSearchTerm("")}
                  sx={{ mr: 2 }}
                >
                  Clear Search
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenCreateDialog(true)}
                >
                  Create Ticket
                </Button>
              )}
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenCreateDialog(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { xs: "flex", md: "none" },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Create Ticket Dialog */}
      <CreateTicket
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onCreate={handleCreateTicket}
      />

      {/* Edit Ticket Dialog */}
      <TicketCardEdit
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onUpdate={handleUpdateTicket}
        ticket={selectedTicket}
      />
    </Container>
  );
};

export default Ticker;
