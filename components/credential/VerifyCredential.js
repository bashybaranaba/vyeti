import { React, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

export default function VerifyCredential({ credential, data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Verify Details
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Credential Details</DialogTitle>
        <DialogContent>
          <Box sx={{ m: 1, backgroundColor: "#eeeeee", p: 1, borderRadius: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, ml: 1 }}>
              Issued by:
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Institution name:{" "}
              <a
                href={`/org/${data.institution.slug}`}
                target="blank"
                style={{ color: "#4D776D" }}
              >
                {data.institution?.institution_name}
              </a>
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Blockchain address: {data.institution?.wallet}
            </Typography>
          </Box>
          <Box sx={{ m: 1, backgroundColor: "#eeeeee", p: 1, borderRadius: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, ml: 1 }}>
              Programme:
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Programme name:{" "}
              <a
                href={`/programme/${data.programme._id}`}
                style={{ color: "#4D776D" }}
                target="blank"
              >
                {data.programme?.programme_name}
              </a>
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Programme Id: {data.programme?._id}
            </Typography>
          </Box>
          <Box sx={{ m: 1, backgroundColor: "#eeeeee", p: 1, borderRadius: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, ml: 1 }}>
              Issued To:
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Name : {data.issued_to?.name}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Gender: {data.registrant?.gender}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Date of Birth:{" "}
              {dayjs(data.registrant?.date_of_birth).format("MMMM DD YYYY")}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Birth Certificate: {data.registrant?.birth_certificate}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Enrolled from:{" "}
              {dayjs(data.registrant?.enrollment_date).format("MMMM DD YYYY")} -{" "}
              {dayjs(credential.createdAt).format("MMMM DD YYYY")}
            </Typography>
          </Box>
          <Box sx={{ m: 1, backgroundColor: "#eeeeee", p: 1, borderRadius: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, ml: 1 }}>
              Credential Token:
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Token Id : {credential.tokenId}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Issued on: {dayjs(credential.createdAt).format("MMMM DD YYYY")}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Status: {credential.claimed ? "Claimed" : "Unclaimed"}
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Blockchain address: {credential.owner}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
