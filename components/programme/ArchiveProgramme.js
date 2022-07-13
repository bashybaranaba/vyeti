import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import ArchiveIcon from "@mui/icons-material/Archive";
import Tooltip from "@mui/material/Tooltip";
import PopUpAlert from "../util/PopUpAlert";

import { useRouter } from "next/router";

export default function ArchiveProgramme({ programmeId }) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const archiveProgramme = async (e) => {
    e.preventDefault();
    try {
      const data = {
        is_archived: true,
      };
      await axios.put(`/api/programmes/${programmeId}`, data);
      setSuccess(true);
      setAlert(true);
      router.replace("/dashboard/provider");
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Tooltip title="archive programme">
        <Fab
          onClick={handleClickOpen}
          aria-label="archive"
          sx={{ bgcolor: "#fff", color: "#009688", m: 2 }}
        >
          <ArchiveIcon />
        </Fab>
      </Tooltip>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Archive Programme?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you archive this Programme, it will be moved to your archived
            programmes. This Programme will no longer be visible to other people
            unless it is are restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={archiveProgramme} color="secondary">
            Archive
          </Button>
        </DialogActions>
      </Dialog>
      <PopUpAlert
        open={alert}
        success={success}
        message={"Programme Archived"}
        setOpen={setAlert}
      />
    </div>
  );
}
