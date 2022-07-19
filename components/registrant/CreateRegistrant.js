import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Fab from "@mui/material/Fab";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import BasicDatePicker from "../util/BasicDatePicker";
import PopUpAlert from "../util/PopUpAlert";

export default function CreateRegistrant({
  providerId,
  programmeId,
  duration,
}) {
  const timeMeasure = duration.measure;
  const timeQuantity = duration.quantity;
  const currentDate = new Date();
  const initialExpectedDate =
    timeMeasure == "days"
      ? currentDate.setDate(currentDate.getDate() + timeQuantity)
      : timeMeasure == "months"
      ? currentDate.setMonth(currentDate.getMonth() + timeQuantity)
      : currentDate.setFullYear(currentDate.getFullYear() + timeQuantity);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [admission, setAdmission] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enrollment, setEnrollment] = useState(new Date());
  const [expCompletion, setExpCompletion] = useState(initialExpectedDate);
  const [dob, setDob] = useState(null);
  const [birthCert, setBirthCert] = useState("");
  const [passport, setPassport] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveDetails = async (e) => {
    e.preventDefault();
    try {
      const details = {
        fullname: name,
        gender: gender,
        admission_no: admission,
        email: email,
        phone: phone,
        enrollment_date: enrollment,
        expected_completion: expCompletion,
        date_of_birth: dob,
        birth_certificate: birthCert,
        national_id: nationalId,
        passport_no: passport,
        institution: providerId,
        programme: programmeId,
      };
      await axios.post(`/api/registrants`, details);
      setSuccess(true);
      setMessage("Registration successful");
      setAlert(true);
      router.replace(router.asPath);
      setOpen(false);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
  };
  return (
    <div>
      <Tooltip title="Register individual">
        <Fab
          onClick={handleClickOpen}
          aria-label="Register"
          color="primary"
          sx={{ m: 2 }}
        >
          <PersonAddAltIcon />
        </Fab>
      </Tooltip>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle> Register Individual to the Programme</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="FullName"
            fullWidth
            variant="filled"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            {errors?.fullname?.message}
          </Typography>

          <Box sx={{ m: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                fullWidth
                variant="filled"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors?.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone"
                fullWidth
                variant="filled"
                required
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors?.phone?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  label="gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors?.gender?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <BasicDatePicker
                  label="Date of Birth"
                  value={dob}
                  setValue={setDob}
                />
              </FormControl>
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors?.date_of_birth?.message}
              </Typography>
            </Grid>
            <Typography variant="body1" sx={{ ml: 2, mt: 2, mb: -1 }}>
              Personal Identification Documents
            </Typography>

            <Grid item xs={12} sm={12} md={12}>
              <TextField
                autoFocus
                margin="dense"
                id="birthCert"
                label="Birth Certificate No"
                fullWidth
                variant="filled"
                onChange={(e) => setBirthCert(e.target.value)}
                value={birthCert}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="nationalId"
                label="National ID No"
                fullWidth
                variant="filled"
                onChange={(e) => setNationalId(e.target.value)}
                value={nationalId}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="passport"
                label="Passport No"
                fullWidth
                variant="filled"
                onChange={(e) => setPassport(e.target.value)}
                value={passport}
              />
            </Grid>
            <Typography variant="body1" sx={{ ml: 2, mt: 2, mb: -1 }}>
              Personal Detalis in Regard to the Programme
            </Typography>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                autoFocus
                margin="dense"
                id="admission"
                label="Admission No"
                fullWidth
                variant="filled"
                onChange={(e) => setAdmission(e.target.value)}
                value={admission}
              />
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors?.admission?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <BasicDatePicker
                  label="Enrollment Date"
                  value={enrollment}
                  setValue={setEnrollment}
                />
              </FormControl>
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors?.enrollment_date?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <BasicDatePicker
                  label="Expected Completion"
                  value={expCompletion}
                  setValue={setExpCompletion}
                />
              </FormControl>
              <Typography variant="caption" sx={{ color: "red" }}>
                {errors?.expected_completion?.message}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveDetails}>Register</Button>
        </DialogActions>
      </Dialog>
      <PopUpAlert
        open={alert}
        success={success}
        message={message}
        setOpen={setAlert}
      />
    </div>
  );
}
