import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import PopUpAlert from "../util/PopUpAlert";
import DeleteIcon from "@mui/icons-material/Delete";

import { useRouter } from "next/router";

export default function DeleteRegistrant({ registrantId }) {
  const [open, setOpen] = useState(false);
  const [registrantName, setRegistantName] = useState("");
  const [confirmedName, setConfirmedName] = useState("");
  const [alert, setAlert] = useState(false);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (confirmedName != registrantName) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [confirmedName, registrantName]);

  const handleClickOpen = () => {
    setOpen(true);
    getDetails();
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getDetails() {
    setLoading(true);
    const res = await axios.get(`/api/registrants/${registrantId}`);
    const details = res.data.registrant;
    setRegistantName(details.fullname);
    setLoading(false);
  }

  const deleteRegistrant = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/registrants/${registrantId}`);
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
      <Tooltip title="delete Registrant">
        <IconButton onClick={handleClickOpen} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Delete Rrecord?</DialogTitle>
        <DialogContent>
          {loading ? (
            <div align="center">
              <CircularProgress />
            </div>
          ) : (
            <div>
              <DialogContentText>
                Are you sure you want to delete{" "}
                <strong>{registrantName}</strong>? Type the individuals name to
                confirm deletion.
              </DialogContentText>
              <Box sx={{ m: 2 }} />
              <TextField
                autoFocus
                margin="dense"
                id="confirm-name"
                label="Confirm name"
                fullWidth
                variant="filled"
                required
                onChange={(e) => setConfirmedName(e.target.value)}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {active ? (
            <Button
              variant="contained"
              sx={{ m: 1 }}
              onClick={deleteRegistrant}
            >
              Delete
            </Button>
          ) : (
            <Button variant="contained" disabled sx={{ m: 1 }}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <PopUpAlert
        open={alert}
        success={success}
        message={`${registrantName}'s record Deleted`}
        setOpen={setAlert}
      />
    </div>
  );
}
