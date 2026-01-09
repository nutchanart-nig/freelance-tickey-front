import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
} from '@mui/material';

const TicketCardEdit = ({ open, onClose, onUpdate, ticket }) => {
  const [editTicket, setEditTicket] = useState({
    title: '',
    details: '',
    endTime: '',
    status: 'open',
    priority: 'medium',
    backgroundColor: '#ffffff',
  });

  const backgroundColors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Light Blue', value: '#e3f2fd' },
    { name: 'Light Green', value: '#e8f5e8' },
    { name: 'Light Orange', value: '#fff3e0' },
    { name: 'Light Red', value: '#ffebee' },
    { name: 'Light Purple', value: '#f3e5f5' },
    { name: 'Light Yellow', value: '#fffde7' },
  ];

  // Populate form when ticket prop changes or dialog opens
  useEffect(() => {
    if (ticket && open) {
      setEditTicket({
        title: ticket.title || '',
        details: ticket.details || '',
        endTime: ticket.endTime || '',
        status: ticket.status || 'open',
        priority: ticket.priority || 'medium',
        backgroundColor: ticket.backgroundColor || '#ffffff',
      });
    }
  }, [ticket, open]);

  const handleUpdate = () => {
    if (editTicket.title && editTicket.details && ticket) {
      onUpdate(ticket.id, editTicket);
      onClose();
    }
  };

  const handleClose = () => {
    setEditTicket({
      title: '',
      details: '',
      endTime: '',
      status: 'open',
      priority: 'medium',
      backgroundColor: '#ffffff',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Ticket</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={editTicket.title}
            onChange={(e) => setEditTicket({ ...editTicket, title: e.target.value })}
            required
          />
          <TextField
            label="Details"
            fullWidth
            multiline
            rows={4}
            value={editTicket.details}
            onChange={(e) => setEditTicket({ ...editTicket, details: e.target.value })}
            required
          />
          <TextField
            label="End Time"
            type="datetime-local"
            fullWidth
            value={editTicket.endTime}
            onChange={(e) => setEditTicket({ ...editTicket, endTime: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Status"
            select
            fullWidth
            value={editTicket.status}
            onChange={(e) => setEditTicket({ ...editTicket, status: e.target.value })}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="urgent">Urgent</MenuItem>
          </TextField>
          <TextField
            label="Priority"
            select
            fullWidth
            value={editTicket.priority}
            onChange={(e) => setEditTicket({ ...editTicket, priority: e.target.value })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            label="Background Color"
            select
            fullWidth
            value={editTicket.backgroundColor}
            onChange={(e) => setEditTicket({ ...editTicket, backgroundColor: e.target.value })}
          >
            {backgroundColors.map((color) => (
              <MenuItem key={color.value} value={color.value}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color.value,
                      border: '1px solid #ccc',
                      borderRadius: 1,
                    }}
                  />
                  {color.name}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleUpdate}
          variant="contained"
          disabled={!editTicket.title || !editTicket.details}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketCardEdit;
