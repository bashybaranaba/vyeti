import Head from "next/head";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LinearProgress from "@mui/material/LinearProgress";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import ArchiveIcon from "@mui/icons-material/Archive";

import CreateProgramme from "../../../components/programme/CreateProgramme";
import ProgrammeList from "../../../components/programme/ProgrammeList";

import jwt from "jsonwebtoken";
import ProviderProfile from "../../../components/provider/ProviderProfile";
import Overview from "../../../components/analytics/OverView";
import TotalsCard from "../../../components/analytics/TotalsCard";
import AssessmentIcon from "@mui/icons-material/Assessment";

import {
  AppBar,
  Drawer,
  DrawerHeader,
} from "../../../components/util/NavDrawerOptions";
import LogOutButton from "../../../components/auth/LogOutButton";

const buttonsinfo = [
  { text: "Institution Profile", link: "/campaigns", value: 0 },
  { text: "Programmes", link: "/contacts", value: 1 },
  { text: "Analytics", link: "/analytics", value: 2 },
  { text: "Archived Items", link: "/analytics", value: 3 },
];

export default function ProviderDashboard({ provider, programmes }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function loadAnalytics() {
    setLoading(true);
    const res = await axios.get(`/api/providers/stats/${provider._id}`);
    setAnalytics(res.data);
    setLoading(false);
  }

  const getActiveProgrammes = (programmes) => {
    let programmesArray = [];
    for (let i = 0; i < programmes.length; i++) {
      if (programmes[i].is_archived === false) {
        programmesArray.push(programmes[i]);
      }
    }
    return programmesArray;
  };
  const getArchivedProgrammes = (programmes) => {
    let archivedArray = [];
    for (let i = 0; i < programmes.length; i++) {
      if (programmes[i].is_archived === true) {
        archivedArray.push(programmes[i]);
      }
    }
    return archivedArray;
  };
  const activeProgrammes = getActiveProgrammes(programmes);
  const archivedProgrammes = getArchivedProgrammes(programmes);

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Typography variant="body1" component="div" sx={{ mr: 1 }}>
              {provider.institution_name}
            </Typography>
            <LogOutButton />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Typography
              variant="body1"
              component="div"
              sx={{ flexGrow: 1, ml: 2 }}
            >
              VYETI .
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {buttonsinfo.map((info, index) => (
              <ListItem
                button
                onClick={(e) => handleChangeValue(e, info.value)}
                key={index}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <AccountBalanceIcon
                      color={index === value ? "primary" : "inherit"}
                    />
                  ) : index === 1 ? (
                    <SchoolIcon
                      color={index === value ? "primary" : "inherit"}
                    />
                  ) : index === 2 ? (
                    <AssessmentIcon
                      color={index === value ? "primary" : "inherit"}
                    />
                  ) : (
                    <ArchiveIcon
                      color={index === value ? "primary" : "inherit"}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={info.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div hidden={value !== 0}>
            <ProviderProfile
              provider={provider}
              credentials={analytics?.credentials[0]?.total_credentials}
              programmes={analytics?.totalProgrammes[0]?.total_programmes}
            />
          </div>
          <div hidden={value !== 1}>
            <CreateProgramme providerId={provider._id} />
            <ProgrammeList programmes={activeProgrammes} />
          </div>
          <div hidden={value !== 2}>
            {loading ? (
              <Grid align="center" sx={{ m: 6 }}>
                <LinearProgress />
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} lg={8}>
                  <Overview analytics={analytics} />
                </Grid>
                <Grid item xs={12} sm={12} lg={4}>
                  <TotalsCard
                    value={analytics?.credentials[0]?.total_credentials}
                    label={"Credentials Issued"}
                  />
                  <TotalsCard
                    value={analytics?.totalProgrammes[0]?.total_programmes}
                    label={"Programmes"}
                  />
                  <TotalsCard
                    value={analytics?.totalRegistrants[0]?.total_registrants}
                    label={"Total Registrants"}
                  />
                </Grid>
              </Grid>
            )}
          </div>
          <div hidden={value !== 3}>
            <Typography variant="h6">Archived</Typography>
            <ProgrammeList programmes={archivedProgrammes} />
          </div>
        </Box>
      </Box>
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { cookies } = req;
  const token = cookies.vyeti_jwt;
  const decoded_token = jwt.decode(token);
  const account_id = decoded_token.id;
  const verified = decoded_token.verified;

  if (!verified) {
    return {
      redirect: {
        destination: "/verifyaccount",
        permanent: false,
      },
    };
  }

  if (decoded_token.type === "employer") {
    return {
      redirect: {
        destination: "/dashboard/employer",
        permanent: false,
      },
    };
  } else if (decoded_token.type === "earner") {
    return {
      redirect: {
        destination: "/dashboard/earner",
        permanent: false,
      },
    };
  } else {
    const account = await axios.get(
      `http://localhost:3000/api/accounts/providers/${account_id}`
    );
    const providerId = account.data.provider._id;

    const res = await axios.get(
      `http://localhost:3000/api/providers/${providerId}`
    );
    return {
      props: {
        provider: res.data.provider,
        programmes: res.data.programmes,
      },
    };
  }
};
