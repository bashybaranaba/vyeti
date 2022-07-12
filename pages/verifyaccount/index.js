import Head from "next/head";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import WalletLogin from "../../components/auth/WalletLogin";
import SideSection from "../../components/layout/SideSection";
import PopUpAlert from "../../components/util/PopUpAlert";

export default function VerifyAccount({ email, token }) {
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const resendEmail = async () => {
    sendVerification();
  };

  const sendVerification = async () => {
    try {
      const data = {
        email: email,
      };
      await axios.post(`/api/mails/verification`, data);
      setSuccess(true);
      setAlert(true);
    } catch (err) {
      console.log(err);
      setErrors(err);
    }
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <SideSection />
        <Grid item xs={12} sm={12} md={9} component={Paper} elevation={6}>
          <Head>
            <title>Verify Account</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Container maxWidth="md">
            <Typography variant="h4" sx={{ ml: 1, mt: 7, mb: 4 }}>
              Account Verification Needed
            </Typography>
            <Typography variant="body1" sx={{ m: 1 }}>
              A verification link has been sent to
            </Typography>
            <Typography sx={{ fontWeight: 600, m: 1 }}>{email}</Typography>

            <Button onClick={resendEmail} variant="contained" sx={{ m: 1 }}>
              Resend
            </Button>

            <Box sx={{ m: 4 }} />
            <Typography variant="body1" sx={{ m: 1 }}>
              Click Login with Wallet once Verified
            </Typography>
            <Box sx={{ color: "#4D776D" }}>
              <WalletLogin />
            </Box>
          </Container>
        </Grid>
      </Grid>
      <PopUpAlert
        open={alert}
        success={success}
        message={`Verification email has been resent to ${email}`}
        setOpen={setAlert}
      />
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { cookies } = req;
  const token = cookies.vyeti_jwt;
  const decoded_token = jwt.decode(token);
  const account_id = decoded_token.id;
  const verified = decoded_token.verified;

  if (verified) {
    return {
      redirect: {
        destination: "/dashboard/employer",
        permanent: false,
      },
    };
  } else {
    const res = await axios.get(
      `http://localhost:3000/api/accounts/${account_id}`
    );
    return {
      props: {
        email: res.data.account.email,
      },
    };
  }
};