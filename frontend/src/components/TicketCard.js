import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Fab,
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';

const TicketCard = ({
  title,
  details,
  endTime,
  status = 'open',
  priority = 'medium',
  onEdit,
  onDelete,
  backgroundColor = '#ffffff',
  ...props
}) => {
  // Define color schemes based on status and priority
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return '#4caf50';
      case 'in-progress':
        return '#2196f3';
      case 'closed':
        return '#9e9e9e';
      case 'urgent':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: backgroundColor,
        borderRadius: '25px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
        ...props.sx,
      }}
      {...props}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header with Title and Priority/Status chips */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                backgroundColor: getStatusColor(status),
                color: 'white',
                fontSize: '0.75rem',
              }}
            />
            <Chip
              label={priority}
              size="small"
              variant="outlined"
              sx={{
                borderColor: getPriorityColor(priority),
                color: getPriorityColor(priority),
                fontSize: '0.75rem',
              }}
            />
          </Box>
        </Box>

        {/* Details */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            flexGrow: 1,
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          {details}
        </Typography>

        {/* Bottom section with time and edit button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          {/* End time on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12}}>
              {endTime}
            </Typography>
          </Box>

          {/* Action buttons on the right */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Fab
              size="small"
              color="error"
              onClick={onDelete}
              sx={{
                minWidth: 'auto',
                width: 35,
                height: 30,
              }}
            >
              <DeleteIcon />
            </Fab>
            <Fab
              size="small"
              color="secondary"
              onClick={onEdit}
              sx={{
                minWidth: 'auto',
                width: 35,
                height: 30,
              }}
            >
              <EditIcon />
            </Fab>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
