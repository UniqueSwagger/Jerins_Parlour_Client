import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink, useRouteMatch, Route, Switch } from "react-router-dom";
import Booking from "../Booking/Booking";
import PrivateRoute from "../../PrivateRoute/PrivateRoute";
import BookingList from "../BookingList/BookingList";
import Review from "../Review/Review";
const drawerWidth = 240;

const BookingDashboard = (props) => {
  let { path, url } = useRouteMatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [title, setTitle] = React.useState("");
  const drawer = (
    <div>
      <Toolbar />
      <List>
        <NavLink
          onClick={() => setTitle("Book")}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to="/home"
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#6c6c6c" }} primary="Home" />
          </ListItem>
        </NavLink>
        <NavLink
          onClick={() => setTitle("Book")}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`${url}`}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#6c6c6c" }} primary="Book" />
          </ListItem>
        </NavLink>
        <NavLink
          onClick={() => setTitle("Service List")}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`${url}/booking-list`}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#6c6c6c" }} primary="Booking List" />
          </ListItem>
        </NavLink>
        <NavLink
          onClick={() => setTitle("Review")}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`${url}/review`}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#6c6c6c" }} primary="Review" />
          </ListItem>
        </NavLink>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to="/services"
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#6c6c6c" }} primary="Services" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ background: " #f63e7b" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className="d-block mx-auto fs-4"
            noWrap
            component="div"
          >
            {title ? title : "Book"}
          </Typography>
        </Toolbar>

        <div style={{ height: "100vh" }} className="bg-light ">
          <Switch>
            <PrivateRoute exact path={path}>
              <Booking />
            </PrivateRoute>
            <Route path={`${path}/booking-list`}>
              <BookingList />
            </Route>
            <Route path={`${path}/review`}>
              <Review />
            </Route>
          </Switch>
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            "& .css-10hburv-MuiTypography-root": {
              color: "#6c757d",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            "& .css-10hburv-MuiTypography-root": {
              color: "#6c757d",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

BookingDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default BookingDashboard;
