import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import VerifiedIcon from "@mui/icons-material/Verified";
import EditProvider from "./EditProvider";
import Accredit from "./Accredit";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Accreditation from "./Accreditation";

export default function ProviderProfile({ provider, credentials, programmes }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3 }}>
        <Box sx={{ m: 1 }}>
          <Box sx={{ display: "flex", m: 2 }}>
            {provider.profile_img ? (
              <img src={provider.profile_img} style={{ width: 150 }} />
            ) : (
              <Avatar variant="rounded" sx={{ width: 110, height: 110 }} />
            )}
          </Box>
          <Typography variant="h4" sx={{ m: 1 }}>
            {provider.institution_name}
          </Typography>
          {provider.is_accredited ? null : (
            <Box sx={{ display: "flex" }}>
              <ReportGmailerrorredIcon
                sx={{ ml: 1, mt: 0.7, color: "#616161" }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 0.4, mt: 1 }}
              >
                Proof of Accreditation is Required
              </Typography>
              <Box sx={{ ml: 0.9, mt: -0.8 }}>
                <Accredit providerId={provider._id} />
              </Box>
            </Box>
          )}
          {provider.headline ? (
            <Typography variant="body1" sx={{ m: 1 }}>
              {provider.headline}
            </Typography>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ m: 1 }}>
              Organization Headline: Select EDIT DETAILS to add headline
            </Typography>
          )}
          <Box sx={{ m: 1 }}>
            <EditProvider provider={provider} />
          </Box>
          <Box sx={{ display: "flex", m: 1 }}>
            {programmes && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mr: 2 }}
              >
                {programmes} programmes
              </Typography>
            )}
            {credentials && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mr: 2 }}
              >
                {credentials} credentials issued
              </Typography>
            )}
          </Box>
        </Box>
        {provider.is_accredited ? (
          <Box sx={{ display: "flex", ml: 1 }}>
            <VerifiedIcon sx={{ color: "#26c6da", m: 1 }} />

            <Typography variant="body1" sx={{ m: 1, ml: 0 }}>
              Is accredited
            </Typography>
          </Box>
        ) : null}

        <Paper sx={{ backgroundColor: "#eeeeee", m: 2, p: 2 }}>
          <Typography variant="h5" sx={{ m: 2 }}>
            About
          </Typography>

          {provider.description ? (
            <Box sx={{ textAlign: "justify" }}>
              <Typography variant="body1" sx={{ m: 2 }}>
                {provider.description}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
              Select EDIT DETAILS to add description
            </Typography>
          )}
        </Paper>
      </Box>
      {provider.is_accredited ? (
        <Box sx={{ mt: 4, ml: 1 }}>
          <Accreditation documents={provider.documents} />
        </Box>
      ) : null}
    </Container>
  );
}
