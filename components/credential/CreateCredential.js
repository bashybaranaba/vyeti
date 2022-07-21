import Head from "next/head";
import axios from "axios";
import { useEffect, useState, forwardRef, Fragment } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Web3Modal from "web3modal";
import ImageUpload from "../../components/util/ImageUpload";
import CredentialForm from "../../components/credential/CredentialForm";
import Steps from "../../components/layout/Steps";
import AddSignature from "../../components/util/AddSignature";
import NextButton from "../../components/util/NextButton";
import FinishButton from "../../components/util/FinishButton";
import PopUpAlert from "../util/PopUpAlert";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { credentialsRegistryAddress } from "../../config";
import CredentialRegistry from "../../lib/CredentialsRegistry.json";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateCredential({ registrantId }) {
  const [open, setOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [signatures, setSignatures] = useState([]);
  const [noOfsignatures, setNoOfsignatures] = useState(1);
  const [programmeId, setProgrammeId] = useState("");
  const [providerId, setProviderId] = useState("");
  const [providerName, setProviderName] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [next, setNext] = useState(false);
  const [finish, setFinish] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!title || !fullname || !email || !description || !fileUrl) {
      setNext(false);
    } else {
      setNext(true);
    }
  }, [title, fullname, email, description]);

  async function getDetails() {
    const res = await axios.get(`/api/registrants/${registrantId}`);
    const details = res.data.registrant;
    setTitle(details.programme?.programme_name);
    setProgrammeId(details.programme?._id);
    setProviderId(details.institution?._id);
    setProviderName(details.institution?.institution_name);
    setFullName(details.fullname);
    setEmail(details.email);
    const expetedDate = details.expected_completion;
    const currentDate = new Date().toISOString();
    if (expetedDate > currentDate) {
      setSuccess(false);
      setMessage("Cannot Isssue Credential Before Expected Completion Time");
      setAlert(true);
      setOpen(false);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    getDetails();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  };

  const handleBack = () => {
    const nextStep = activeStep - 1;
    setActiveStep(nextStep);
    setFinish(false);
  };

  const getSignature = (signature) => {
    setSignatures([...signatures, signature]);
  };

  const removeSignature = (signature) => {
    const currentIndex = signatures.findIndex((x) => x.signature === signature);
    let newSignatures = [...signatures];
    newSignatures.splice(currentIndex, 1);
    setSignatures(newSignatures);
  };

  const addField = () => {
    const fields = noOfsignatures + 1;
    setNoOfsignatures(fields);
  };

  const removeField = () => {
    const fields = noOfsignatures - 1;
    setNoOfsignatures(fields);
  };

  async function uploadToIPFS() {
    const data = JSON.stringify({
      title: title,
      awarded_to: fullname,
      description: description,
      image: fileUrl,
      signatures: signatures,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function CreateCredential() {
    try {
      const url = await uploadToIPFS();

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(
        credentialsRegistryAddress,
        CredentialRegistry.abi,
        signer
      );
      let transaction = await contract.createCredentialToken(url);
      setLoading(true);
      await transaction.wait().then((tx) => {
        console.log("This Tx", tx);
        let event = tx.events[0];
        console.log("This Event", event);
        console.log("This Args", event.args);
        let value = event.args[2];

        console.log("This Value", value);
        let tokenId = value.toNumber();
        console.log("This TokenId", tokenId);
        const data = {
          tokenId: tokenId,
          programme: programmeId,
          institution: providerId,
          institutionName: providerName,
          registrant: registrantId,
          title: title,
          issued_to: {
            name: fullname,
            email: email,
          },
          image: fileUrl,
          description: description,
        };
        console.log(data);
        axios.post(`/api/credentials`, data);
        axios.post(`/api/mails/credentials`, data);
        setOpen(false);
        setTitle("");
        setFullName("");
        setEmail("");
        setDescription("");
        setSignatures([]);
        setFinish(false);
        setActiveStep(0);
        setFileUrl(null);
        setNoOfsignatures(1);
        setSuccess(true);
        setMessage("Credential Issued Successfully");
        setLoading(false);
        setAlert(true);
      });

      console.log("Success", event);
    } catch (error) {
      console.log("An error occured", error);
    }
  }

  return (
    <div>
      <Tooltip title="Award Credential">
        <IconButton
          onClick={handleClickOpen}
          aria-label="Award"
          color="primary"
        >
          <NoteAddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent>
          <DialogActions>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <Container maxWidth="sm">
            <Grid align="center">
              {loading ? (
                <Grid align="center" sx={{ m: 6 }}>
                  <LinearProgress />
                </Grid>
              ) : null}
              <Typography variant="h6" sx={{ m: 1 }}>
                {" "}
                Award Credential
              </Typography>
            </Grid>
            <Steps
              activeStep={activeStep}
              steps={["Enter Details", "Sign Credential", "Finish"]}
            />
            <Box sx={{ m: 4 }} />
            {activeStep === 0 ? (
              <Container>
                <ImageUpload setFileUrl={setFileUrl} fileUrl={fileUrl} />
                <CredentialForm
                  title={title}
                  fullname={fullname}
                  email={email}
                  description={description}
                  setTitle={setTitle}
                  setFullName={setFullName}
                  setEmail={setEmail}
                  setDescription={setDescription}
                />
                <NextButton next={next} handleNext={handleNext} />
              </Container>
            ) : (
              <Container>
                {(function (rows, i, len) {
                  while (++i <= len) {
                    rows.push(
                      <AddSignature
                        getSignature={getSignature}
                        removeSignature={removeSignature}
                        addField={addField}
                        removeField={removeField}
                        setFinish={setFinish}
                        handleNext={handleNext}
                        instances={noOfsignatures}
                        key={i}
                      />
                    );
                  }
                  return rows;
                })([], 0, noOfsignatures)}

                <Box sx={{ display: "flex" }}>
                  <Button
                    sx={{ m: 1 }}
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <FinishButton
                    finish={finish}
                    handleFinish={CreateCredential}
                  />
                </Box>
              </Container>
            )}
          </Container>
        </DialogContent>
      </Dialog>
      <Fragment>
        <PopUpAlert
          open={alert}
          success={success}
          message={message}
          setOpen={setAlert}
        />
      </Fragment>
    </div>
  );
}
