import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Users</Typography>
              <Typography variant="body2" color="textSecondary">
                View, edit, or delete user accounts.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Products</Typography>
              <Typography variant="body2" color="textSecondary">
                Add, edit, or remove products from the inventory.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">View Reports</Typography>
              <Typography variant="body2" color="textSecondary">
                Analyze sales, revenue, and other key metrics.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
