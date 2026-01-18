import React, { useState, useEffect } from "react";
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
  Modal,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import TicketCard from "../components/TicketCard";
import CreateTicket from "../components/CreateTicket";
import TicketCardEdit from "../components/TicketCardEdit";
import { ticketAPI } from "../services/api";
import FilteredTickets from "../components/FilteredTickets";

const Ticker = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketsTest, setTicketsTest] = useState([
    {
      id: 1,
      title: "Fix Login Bug",
      details:
        "Users are experiencing issues when trying to log in with their email addresses. The system shows an error message even with valid credentials.",
      end_time: "2024-01-15 14:30",
      status: "in-progress",
      priority: "high",
      background_color: "#fff3e0",
    },
  ])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Delete modal state
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign:'center',
    borderRadius: '16px',

  };

  // Fetch tickets on component mount
  useEffect(() => {
    // fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ticketAPI.getTickets();
      if (response.success) {
        setTickets(response.data);
      } else {
        setError(response.error || 'Failed to fetch tickets');
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      // Transform camelCase to snake_case for API
      const apiData = {
        title: ticketData.title,
        details: ticketData.details,
        end_time: ticketData.endTime || null,
        status: ticketData.status,
        priority: ticketData.priority,
        background_color: ticketData.backgroundColor,
      };

      const response = await ticketAPI.createTicket(apiData);
      if (response.success) {
        setTickets(prevTickets => [response.data, ...prevTickets]);
        setOpenCreateDialog(false);
      } else {
        console.error('Failed to create ticket:', response.error);
        // You could add a toast notification or error display here
      }
    } catch (err) {
      console.error('Error creating ticket:', err);
    }
  };

  const handleEditTicket = (ticketId) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setOpenEditDialog(true);
    }
  };

  const handleUpdateTicket = async (ticketId, updatedData) => {
    try {
      // Transform camelCase to snake_case for API
      const apiData = {
        title: updatedData.title,
        details: updatedData.details,
        end_time: updatedData.endTime || null,
        status: updatedData.status,
        priority: updatedData.priority,
        background_color: updatedData.backgroundColor,
      };

      const response = await ticketAPI.updateTicket(ticketId, apiData);
      if (response.success) {
        setTickets(prevTickets =>
          prevTickets.map(ticket =>
            ticket.id === ticketId ? response.data : ticket
          )
        );
        setSelectedTicket(null);
        setOpenEditDialog(false);
      } else {
        console.error('Failed to update ticket:', response.error);
        // You could add a toast notification or error display here
      }
    } catch (err) {
      console.error('Error updating ticket:', err);
    }
  };

  ///test เดี่ยวลบ
  // const [openEditDialogTest, setOpenEditDialogTest] = useState(false);
  // const [selectedTicketTest, setSelectedTicketTest] = useState(null);

  // const handleEditTicketTest = (ticketIdTest) => {
  //   const ticket = ticketsTest.find((t) => t.id === ticketIdTest);
  //   if (ticket) {
  //     setSelectedTicketTest(ticket);
  //     setOpenEditDialogTest(true);

  //   }
  // };

  // const handleUpdateTicketTest = (ticketId, updatedData) => {
  //   setTickets(
  //     ticketsTest.map((ticket) =>
  //       ticket.id === ticketId ? { ...ticket, ...updatedData } : ticket
  //     )
  //   );
  //   setSelectedTicketTest(null);
  // };
  //test end

  const getTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);
    // return ticketsTest.filter((ticket) => ticket.status === status);
  };


  const getFilteredTickets = () => {
    let filtered = tickets;
    // let filtered = ticketsTest;

    // Apply search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(lowerSearchTerm) ||
          ticket.details.toLowerCase().includes(lowerSearchTerm) ||
          ticket.status.toLowerCase().includes(lowerSearchTerm) ||
          ticket.priority.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    return filtered;
  };

  const filteredTickets = getFilteredTickets();

  const getTicketStats = () => {
    const baseTickets = searchTerm.trim() ? getFilteredTicketsBySearch() : tickets;

    return {
      all: baseTickets.length,
      open: baseTickets.filter(t => t.status === "open").length,
      "in-progress": baseTickets.filter(t => t.status === "in-progress").length,
      urgent: baseTickets.filter(t => t.status === "urgent").length,
    };
  };

  const getFilteredTicketsBySearch = () => {
    if (!searchTerm.trim()) {
      return tickets;
      // return ticketsTest;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    // return tickets.filter(
    return ticketsTest.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(lowerSearchTerm) ||
        ticket.details.toLowerCase().includes(lowerSearchTerm) ||
        ticket.status.toLowerCase().includes(lowerSearchTerm) ||
        ticket.priority.toLowerCase().includes(lowerSearchTerm)
    );
  };

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        const response = await ticketAPI.deleteTicket(ticketId);
        if (response.success) {
          setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
        } else {
          console.error('Failed to delete ticket:', response.error);
          // You could add a toast notification or error display here
        }
      } catch (err) {
        console.error('Error deleting ticket:', err);
      }
    }
  };

  const handleOpenDeleteModal = (ticketId) => {
    setTicketToDelete(ticketId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setTicketToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (ticketToDelete) {
      try {
        const response = await ticketAPI.deleteTicket(ticketToDelete);
        if (response.success) {
          setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketToDelete));
          // setTicketsTest(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketToDelete));
        } else {
          console.error('Failed to delete ticket:', response.error);
          // You could add a toast notification or error display here
        }
      } catch (err) {
        console.error('Error deleting ticket:', err);
      }
    }
    handleCloseDeleteModal();
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        mt: 4,
        mb: 4,
        maxWidth: "1920px",
        width: "100%",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Ticket
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Panel - Create and Filters */}
        <Grid item xs={12} md={3}>
          <Button
            id="createNewTicket"
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateDialog(true)}
            sx={{ mb: 2 }}
          >
            Create New Ticket
          </Button>

          <Paper sx={{ p: 3, height: "fit-content" }}>
            <FilteredTickets
              activeFilter={statusFilter}
              onFilterChange={handleStatusFilterChange}
              ticketStats={getTicketStats()}
            />

            {/* Quick Stats */}
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Quick Stats
              {(searchTerm || statusFilter !== "all") && (
                <span> ({filteredTickets.length} shown)</span>
              )}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Total Tickets:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {tickets.length}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Open:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {getTicketsByStatus("open").length}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">In Progress:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {getTicketsByStatus("in-progress").length}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Urgent:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {getTicketsByStatus("urgent").length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Panel - Ticket Cards */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
              {statusFilter === "all" ? "All Tickets" :
                statusFilter === "open" ? "Open Tickets" :
                  statusFilter === "in-progress" ? "In Progress Tickets" :
                    statusFilter === "urgent" ? "Urgent Tickets" :
                      "All Tickets"}
              {filteredTickets.length !== tickets.length && (
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({filteredTickets.length})
                </Typography>
              )}
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
              sx={{ minWidth: 500, maxWidth: 650 }}
            />
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 8,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Loading tickets...
              </Typography>
            </Box>
          ) : error ? (
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
              {/* <Typography variant="h6" color="error" gutterBottom>
                Error loading tickets
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {error}
              </Typography>
              <Button
                variant="outlined"
                onClick={fetchTickets}
                sx={{ mt: 2 }}
              >
                Try Again
              </Button> */}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredTickets.map((ticket) => (
                <Grid item xs={12} sm={4} lg={3} key={ticket.id}>
                  <TicketCard
                    title={ticket.title}
                    details={ticket.details}
                    endTime={ticket.end_time}
                    status={ticket.status}
                    priority={ticket.priority}
                    backgroundColor={ticket.background_color}
                    onEdit={() => handleEditTicket(ticket.id)}
                    onDelete={() => handleOpenDeleteModal(ticket.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* test card เดี่ยวลบ*/}
          {/* <Grid container spacing={3}>
            {filteredTickets.map((ticket) => (
              <Grid item xs={12} sm={4} lg={3} key={ticket.id}>
                <TicketCard
                  title={ticket.title}
                  details={ticket.details}
                  endTime={ticket.end_time}
                  status={ticket.status}
                  priority={ticket.priority}
                  backgroundColor={ticket.background_color}
                  onEdit={() => handleEditTicketTest(ticket.id)}
                  onDelete={() => handleOpenDeleteModal(ticket.id)}
                />
              </Grid>
            ))}
          </Grid> */}
          {/* test card end*/}


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
                {searchTerm
                  ? "No tickets match your search"
                  : "No tickets found"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchTerm
                  ? "Try adjusting your search terms or clear the search to see all tickets"
                  : "Create your first ticket to get started"}
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

      {/* Delete Ticket Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            You confirm that you wish to delete it.
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center'}}>
            <Button onClick={handleCloseDeleteModal} variant="contained" color="secondary">No</Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="primary"
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Ticker;
