import Head from "next/head";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import TabPanel from "../../../../components/util/TabPanel";
import ProgrammeDetails from "../../../../components/programme/ProgrammeDetails";
import CreateRegistrant from "../../../../components/registrant/CreateRegistrant";
import Navbar from "../../../../components/layout/Navbar";

import ArchiveIcon from "@mui/icons-material/Archive";
import DashboardButton from "../../../../components/util/DashboardButton";
import EditProgramme from "../../../../components/programme/EditProgramme";
import RegistrantsTable from "../../../../components/registrant/RegistrantsTable";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Programme({ programme, registrants }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <CreateRegistrant
            programmeId={programme._id}
            providerId={programme.provider._id}
          />
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
      <Container>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            ml: 3,
            mr: 3,
            mt: 1,
            mb: 1,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Programme Details" {...a11yProps(0)} sx={{ ml: 2 }} />
            <Tab label="People" {...a11yProps(1)} sx={{ ml: 2 }} />
          </Tabs>
        </Box>
      </Container>
      <TabPanel value={value} index={0}>
        <Box sx={{ mt: -2 }}>
          <ProgrammeDetails programme={programme} />
        </Box>
        <Container maxWidth="md">
          <EditProgramme programme={programme} />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container maxWidth="lg">
          <RegistrantsTable registrants={registrants} />
        </Container>
      </TabPanel>
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
      registrants: res.data.registrants,
    },
  };
};
