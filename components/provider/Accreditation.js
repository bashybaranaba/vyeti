import React from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";

export default function Accreditation({ documents }) {
  const document = documents[0];

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  return (
    <div>
      <Typography variant="h6" color="text.secondary" sx={{ m: 1 }}>
        Proof of Accreditation
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={8} lg={4}>
          <Paper sx={{ m: 1, display: "flex", width: "100%" }}>
            <Avatar
              variant="rounded"
              sx={{ width: 60, height: 60, m: 1, backgroundColor: "#4D776D" }}
            >
              <Typography variant="overline" sx={{ fontWeight: 600 }}>
                {document?.file_type}
              </Typography>
            </Avatar>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 3, ml: 0.7 }}
            >
              {document?.description}.{document?.file_type}
            </Typography>
            <Grid>
              <Tooltip title="download document" placement="top">
                <IconButton
                  onClick={() => {
                    handleDownload(document?.file_url, document?.description);
                  }}
                  sx={{ m: 2 }}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="caption" color="text.secondary" sx={{ m: 1 }}>
        Download to view Document
      </Typography>
    </div>
  );
}
