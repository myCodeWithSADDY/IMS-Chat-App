import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { darkPurple, grayColor, Purple } from "../../../constants/color";
import {
  Close as CloseIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useLocation, Link as RouterLink, Navigate } from "react-router-dom";

const Link = styled(RouterLink)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: ${Purple};
  }
`;

const adminTabs = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { name: "User", path: "/admin/user", icon: <ManageAccountsIcon /> },
  { name: "Chats", path: "/admin/Chats", icon: <GroupsIcon /> },
  { name: "Messages", path: "/admin/messages", icon: <MessageIcon /> },
];

const Sidebar = ({ width = "100%" }) => {
  const location = useLocation();

  const logoutHandler = () => {
    console.log("Logged out");
  };

  return (
    <Stack width={width} direction="column" p="2rem" spacing="3rem">
      <Typography variant="h5" textTransform="uppercase">
        BehnChod
      </Typography>
      <Stack spacing="1rem">
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            style={
              location.pathname === tab.path
                ? { backgroundColor: darkPurple, color: "white" }
                : {}
            }
          >
            <Stack direction="row" alignItems="center" spacing="1rem">
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction="row" alignItems="center" spacing="1rem">
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobileOpen, setMobileOpen] = useState(false);

  const toggleMobileDrawer = () => {
    setMobileOpen(!isMobileOpen);
  };
  if (!isAdmin) return <Navigate to={"/IMSadmin"} />;
  return (
    <Grid container minHeight="100vh">
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={toggleMobileDrawer}>
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: grayColor }}>
        {children}
      </Grid>
      <Drawer open={isMobileOpen} onClose={toggleMobileDrawer}>
        <Sidebar width="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
