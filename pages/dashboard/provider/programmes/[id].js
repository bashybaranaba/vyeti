import Head from "next/head";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ProgrammeDetails from "../../../../components/programme/ProgrammeDetails";
import CreateCredential from "../../../../components/credential/CreateCredential";
import Navbar from "../../../../components/layout/Navbar";

import ArchiveIcon from "@mui/icons-material/Archive";
import DashboardButton from "../../../../components/util/DashboardButton";

export default function Programme({ programme }) {
  return (
    <div>
      <Head>
        <title>{programme.programme_name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Box sx={{ m: 2 }}>
        <Box sx={{ position: "fixed" }}>
          <CreateCredential />
        </Box>

        <Box sx={{ mt: 10, position: "fixed" }}>
          <Tooltip title="archive programme">
            <Fab
              href="/dashboard"
              aria-label="dashboard"
              sx={{ bgcolor: "#fff", color: "#009688", m: 2 }}
            >
              <ArchiveIcon />
            </Fab>
          </Tooltip>
        </Box>
        <Box sx={{ mt: 20, position: "fixed" }}>
          <DashboardButton link={"/dashboard/provider"} />
        </Box>
      </Box>
      <ProgrammeDetails programme={programme} />
      <Container maxWidth="md">
        <Button variant="outlined" sx={{ m: 2 }}>
          {" "}
          Edit Details
        </Button>
      </Container>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/programmes/${params.id}`
  );
  return {
    props: {
      programme: res.data.programme,
    },
  };
};
