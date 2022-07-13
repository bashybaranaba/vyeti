import React from "react";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
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

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function FileUpload({ getFileDetails }) {
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState("");

  async function uploadFile(e) {
    const file = e.target.files[0];
    const type_of_file = getFileNameWithExt(e);
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const fileDetails = {
        fileUrl: url,
        fileType: type_of_file,
        description: fileName,
      };
      setFileUrl(url);
      getFileDetails(fileDetails);
      setFileType(type_of_file);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  function getFileNameWithExt(event) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf(".");
    const ext = name.substring(lastDot + 1);
    return ext;
  }

  return (
    <div>
      <TextField
        id="file-name"
        label="File name"
        variant="outlined"
        fullWidth
        required
        sx={{ m: 1 }}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      {fileUrl ? (
        <div>
          <Paper sx={{ m: 1, display: "flex", width: "100%" }}>
            <Avatar
              variant="rounded"
              sx={{ width: 50, height: 50, m: 1, backgroundColor: "#4D776D" }}
            >
              <Typography variant="overline" sx={{ fontWeight: 600 }}>
                {fileType}
              </Typography>
            </Avatar>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2.5, ml: 0.7 }}
            >
              {fileName}.{fileType}
            </Typography>
          </Paper>

          <Tooltip title="change image file" placement="top">
            <Fab
              size="small"
              aria-label="clear"
              sx={{ mt: -6, ml: 0, color: "#4D776D", backgroundColor: "#fff" }}
            >
              <ClearIcon />
            </Fab>
          </Tooltip>
        </div>
      ) : (
        <div>
          <Box
            sx={{
              border: 1,
              borderRadius: 2,
              borderColor: "#b0bec5",
              m: 1,
              mr: -1,
              height: 100,
            }}
          >
            <Container align="center" sx={{ m: 2 }}>
              <label htmlFor="file-input">
                <Tooltip title="Upload File" placement="bottom">
                  <IconButton
                    size="large"
                    component="div"
                    color="primary"
                    aria-label="clear"
                  >
                    <UploadFileIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Tooltip>
              </label>
              <Typography variant="caption" color="text.secondary">
                Upload File
              </Typography>
            </Container>
          </Box>
          <input
            type="file"
            accept="image/*"
            id="file-input"
            hidden
            onChange={uploadFile}
          />
        </div>
      )}
    </div>
  );
}
