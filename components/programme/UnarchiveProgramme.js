import { useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import PopUpAlert from "../util/PopUpAlert";
import Tooltip from "@mui/material/Tooltip";

import { useRouter } from "next/router";

export default function UnarchiveProgramme({ programmeId }) {
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

  const unarchiveProgramme = async (e) => {
    e.preventDefault();
    try {
      const data = {
        is_archived: false,
      };
      await axios.put(`/api/programmes/${programmeId}`, data);
      setSuccess(true);
      setAlert(true);
      router.replace(router.asPath);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Tooltip title="restore programme">
        <Fab
          onClick={handleClickOpen}
          aria-label="archive"
          sx={{ bgcolor: "#fff", color: "#009688", m: 2 }}
        >
          <SettingsBackupRestoreIcon />
        </Fab>
      </Tooltip>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Restore Programme?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you restore this Programme you and everyone else will be able
            to view it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={unarchiveProgramme}>Restore</Button>
        </DialogActions>
      </Dialog>
      <PopUpAlert
        open={alert}
        success={success}
        message={"Programme Restored"}
        setOpen={setAlert}
      />
    </div>
  );
}
