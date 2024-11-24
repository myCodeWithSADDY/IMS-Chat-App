import React from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../specific/Charts";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Search,
} from "@mui/icons-material";
import moment from "moment";
import { SearchField } from "../../components/styles/StyledComponents";
import { darkPurple } from "../../../constants/color";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem",
        borderRadius: "1rem",
      }}
    >
      <Stack direction="row" alignItems="center" spacing="1rem">
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem", color: darkPurple }} />
        <SearchField />
        <Button
          variant="contained"
          sx={{
            bgcolor: darkPurple,
            borderRadius: "2rem",
          }}
        >
          <Search />
        </Button>
        <Box flexGrow={1} />
        <Typography
          sx={{
            display: {
              xs: "none",
              sm: "block",
              textAlign: "right",
            },
          }}
        >
          {moment().format("MMMM Do, YYYY")}
        </Typography>
        <NotificationsIcon
          sx={{
            display: {
              xs: "none",
              sm: "block",
              color: darkPurple,
              fontSize: "2rem",
            },
          }}
        />
      </Stack>
    </Paper>
  );

  const WidgetsSection = () => (
    <Stack
      direction={{ sm: "row", xs: "column" }}
      spacing="2rem"
      justifyContent="space-between"
      margin="2rem 0"
      alignItems="center"
    >
      <Widget
        title="Users"
        value={34}
        Icon={<PersonIcon sx={{ color: darkPurple }} />}
      />
      <Widget
        title="Chats"
        value={3}
        Icon={<GroupIcon sx={{ color: darkPurple }} />}
      />
      <Widget
        title="Messages"
        value={453}
        Icon={<MessageIcon sx={{ color: darkPurple }} />}
      />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component="main">
        {Appbar}
        <Stack
          direction={{
            lg: "row",
            xs: "column",
          }}
          spacing="2rem"
          flexWrap="wrap"
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "40rem",
            }}
          >
            <Typography variant="h4" margin="1rem 0">
              Last Messages
            </Typography>
            <LineChart />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem 3rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              maxWidth: "30rem",
              position: "relative",
              top: "1rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[23, 46]}
            />
            <Stack
              sx={{
                position: "absolute",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                spacing: "0.5rem",
                width: "100%",
                height: "100%",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2rem",
                  marginTop: "2rem",
                }}
              >
                <GroupIcon />
                <Typography>VS</Typography>
                <PersonIcon />
              </Stack>
            </Stack>
          </Paper>
        </Stack>

        <WidgetsSection />
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    sx={{
      padding: " 1rem ",
      textAlign: "center",
      borderRadius: "1rem",
      width: "100%",
      maxWidth: "15rem",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Stack alignItems="center" spacing="1rem">
      <Typography
        sx={{
          color: darkPurple,
          borderRadius: "50%",
          border: `5px solid ${darkPurple}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {value}
      </Typography>
      {Icon}
      <Typography sx={{ color: darkPurple }}>{title}</Typography>
    </Stack>
  </Paper>
);

export default Dashboard;
