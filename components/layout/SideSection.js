import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import Link from "next/link";

export default function SideSection() {
  return (
    <Grid
      item
      xs={false}
      sm={false}
      md={3}
      sx={{
        backgroundColor: "#4D776D",
      }}
    >
      <Box sx={{ m: 4 }}>
        <Typography variant="h5" component="div" sx={{ color: "#fff" }}>
          <Link href="/">
            <a style={{ textDecoration: "none", color: "#fff" }}>VYETI .</a>
          </Link>
        </Typography>
      </Box>
      <Box sx={{ m: 4 }} />
      <Box sx={{ m: 4 }}>
        <LibraryAddCheckIcon sx={{ color: "#b2dfdb", fontSize: 50, mb: 0.5 }} />
        <Typography variant="h5" component="div" sx={{ color: "#b2dfdb" }}>
          Verifiable Blockchain Credentials.
        </Typography>
      </Box>
      <Box sx={{ m: 4, mt: 6 }}>
        <Typography variant="body1" component="div" sx={{ color: "#e0f2f1" }}>
          Create an Account to Get Started
        </Typography>
      </Box>
    </Grid>
  );
}
