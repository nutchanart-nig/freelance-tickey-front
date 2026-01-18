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

const CreateTicket = ({ open, onClose, onCreate }) => {
  const [newTicket, setNewTicket] = useState({
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

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setNewTicket({
        title: '',
        details: '',
        endTime: '',
        status: 'open',
        priority: 'medium',
        backgroundColor: '#ffffff',
      });
    }
  }, [open]);

  const handleCreate = () => {
    if (newTicket.title && newTicket.details) {
      onCreate(newTicket);
      onClose();
    }
  };

  const handleClose = () => {
    setNewTicket({
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
      <DialogTitle>Create New Ticket</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={newTicket.title}
            onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
            required
          />
          <TextField
            label="Details"
            fullWidth
            multiline
            rows={4}
            value={newTicket.details}
            onChange={(e) => setNewTicket({ ...newTicket, details: e.target.value })}
            required
          />
          <TextField
            label="End Time"
            type="datetime-local"
            fullWidth
            value={newTicket.endTime}
            onChange={(e) => setNewTicket({ ...newTicket, endTime: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Status"
            select
            fullWidth
            value={newTicket.status}
            onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
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
            value={newTicket.priority}
            onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            label="Background Color"
            select
            fullWidth
            value={newTicket.backgroundColor}
            onChange={(e) => setNewTicket({ ...newTicket, backgroundColor: e.target.value })}
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
        <Button onClick={handleClose} variant="outlined" color='cancel'>Cancel</Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          disabled={!newTicket.title || !newTicket.details}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTicket;
