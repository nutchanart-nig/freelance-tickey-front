import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  AccountCircle,
  Security,
  Api,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'Dashboard',
      description: 'Welcome to your personal dashboard',
      icon: <Dashboard fontSize="large" color="primary" />,
    },
    {
      title: 'Profile Management',
      description: 'Manage your account settings and preferences',
      icon: <AccountCircle fontSize="large" color="primary" />,
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with Laravel backend',
      icon: <Api fontSize="large" color="primary" />,
    },
    {
      title: 'Security',
      description: 'Secure authentication and data protection',
      icon: <Security fontSize="large" color="primary" />,
    },
    {
      title: 'Ticket',
      description: 'Secure authentication and data protection',
      icon: <AccountCircle fontSize="large" color="primary" />,
      to: "/ticket"
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Here's what's happening with your account today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* User Info Card */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Paper>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ height: '100%' }} href={feature.to} >
                <CardActionArea>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Welcome Message */}
        {/* <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Getting Started
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to your Laravel React MUI application! This is a full-stack
              web application built with modern technologies:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1" paragraph>
                <strong>Backend:</strong> Laravel 11 API with PHP 8.2, featuring
                secure authentication using Laravel Sanctum
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Frontend:</strong> React 18 with Material-UI v5 for a
                beautiful, responsive user interface
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Features:</strong> User registration, login, protected
                routes, and API integration
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Security:</strong> JWT tokens, CSRF protection, and
                input validation
              </Typography>
            </Box>
          </Paper>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Home;
