import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function ProgrammeDetails({ programme }) {
  return (
    <div>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" sx={{ m: 2 }}>
            {programme.programme_name}
          </Typography>
          {programme.is_archived ? (
            <Typography variant="body2" color="text.secondary" sx={{ m: 2 }}>
              * This Programme is currently archived and you alone can view it
            </Typography>
          ) : null}
          <Box sx={{ display: "flex", ml: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, m: 1 }}>
              Programme by
            </Typography>
            <Link href={`/org/${programme.provider.slug}`}>
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontWeight: 600, m: 1, ml: 0 }}
              >
                {programme.provider.institution_name}
              </Typography>
            </Link>
          </Box>

          <Paper sx={{ backgroundColor: "#eeeeee", m: 2, p: 2 }}>
            <Typography variant="h5" sx={{ m: 2 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ m: 2 }}>
              {programme.description}
            </Typography>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
