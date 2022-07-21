import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";

import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SignatureCanvas from "react-signature-canvas";

import ClearIcon from "@mui/icons-material/Clear";

export default function AddSignature(props) {
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  let sigPad = {};

  const clearCanvas = () => {
    const signature = sigPad.getTrimmedCanvas().toDataURL("image/png");
    props.removeSignature(signature);
    setDone(false);
    props.setFinish(false);
    sigPad.clear();
  };

  const remove = () => {
    const signature = sigPad.getTrimmedCanvas().toDataURL("image/png");
    props.removeSignature(signature);
    props.setFinish(true);
    props.removeField();
  };

  const getData = () => {
    const signature = sigPad.getTrimmedCanvas().toDataURL("image/png");
    const signatureDetails = { name, signature };
    props.getSignature(signatureDetails);
  };

  const addSignature = () => {
    getData();
    props.addField();
    setDone(true);
  };

  const complete = () => {
    getData();
    setDone(true);
    props.setFinish(true);
    props.handleNext();
  };

  return (
    <div>
      <TextField
        id="signatory"
        label="Signatory"
        variant="outlined"
        fullWidth
        sx={{ m: 1 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Typography variant="body2" color="text.secondary" sx={{ ml: 1, mt: 1 }}>
        Sign Here
      </Typography>
      <Box
        sx={{
          border: 1,
          borderRadius: 2,
          borderColor: "#b0bec5",
          m: 1,
          mr: -1,
        }}
      >
        <SignatureCanvas
          penColor="black"
          minWidth={0.2}
          maxWidth={1.5}
          canvasProps={{ width: 300, height: 100, className: "sigCanvas" }}
          ref={(ref) => {
            sigPad = ref;
          }}
        />
      </Box>
      <Tooltip title="Clear">
        <Fab
          size="small"
          color="primary"
          aria-label="clear"
          onClick={clearCanvas}
          sx={{ mt: -6 }}
        >
          <ClearIcon />
        </Fab>
      </Tooltip>

      {!done ? (
        <Box>
          {props.instances > 1 ? (
            <Button sx={{ m: 1 }} onClick={remove} variant="outlined">
              Remove
            </Button>
          ) : null}
          <Button variant="outlined" sx={{ m: 1 }} onClick={addSignature}>
            Add Another
          </Button>
          <Button variant="outlined" sx={{ m: 1 }} onClick={complete}>
            Done
          </Button>
        </Box>
      ) : null}
    </div>
  );
}
