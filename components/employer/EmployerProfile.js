import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditEmployer from "./EditEmployer";

export default function EmployerProfile({ employer }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3 }}>
        <Box sx={{ m: 1 }}>
          <Box sx={{ display: "flex", ml: 4, mb: -12 }}>
            {employer.profile_img ? (
              <img src={employer.profile_img} style={{ width: 110 }} />
            ) : (
              <Avatar variant="rounded" sx={{ width: 110, height: 110 }} />
            )}
          </Box>
        </Box>

        <Paper sx={{ backgroundColor: "#fafafa", m: 2, p: 2 }}>
          <Box sx={{ m: 11 }} />
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h4" sx={{ ml: 2 }}>
              {employer.organization_name}
            </Typography>
          </Grid>
          <Grid align="right" item xs={12} sm={12} md={6}>
            <Box sx={{ mr: 2 }}>
              <EditEmployer employer={employer} />
            </Box>
          </Grid>
          <Typography variant="h5" sx={{ m: 2 }}>
            About
          </Typography>

          {employer.description ? (
            <Box sx={{ textAlign: "justify" }}>
              <Typography variant="body1" sx={{ m: 2 }}>
                {employer.description}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
              Select EDIT DETAILS to add description
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
