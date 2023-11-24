import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories";
import AccountButton from "../../components/PrimaryAppBar/AccountButton";
import logo from "../../assets/Logo.png";
import { useAuthServiceContext } from "../../context/AuthContext";
import AddServerButton from "../AddServerButton";
import axios from "axios";

const PrimaryAppBar = () => {
  //////////////////////
  interface Server {
    id: number;
    name: string;
    // ... other properties
  }

  const [serverData, setServerData] = useState<Server[]>([]); // Adjust the type accordingly

  const handleServerAdded = () => {
    fetchData(); // Refresh server data after addition
  };

  const fetchData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/server/");
      setServerData(response.data);
    } catch (error) {
      // console.error("Error fetching server data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { isLoggedIn, logout } = useAuthServiceContext();

  const [sideMenu, setSideMenu] = useState(false);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setSideMenu(open);
    };

  const list = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ExploreCategories />
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 2,
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            height: theme.primaryAppBar.height,
            minHeight: theme.primaryAppBar.height,
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>

          <Link href="/home" underline="none" color="inherit">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { fontWeight: 700, letterSpacing: "-0.5px" } }}
            >
              <Link>
                {" "}
                <img
                  style={{ width: "200px", height: "40px", paddingTop: "3px" }}
                  src={logo}
                  alt=""
                />{" "}
              </Link>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          <AccountButton />

          {isLoggedIn ? (
            // If logged in, show Logout button
            <div style={{ margin: "10px" }}>
              <Button
                sx={{ margin: "1px" }}
                variant="outlined"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            // If not logged in, show Login button (you can replace this with your actual login link)
            <div style={{ margin: "10px" }}>
              <Button variant="outlined" href="/login">
                Login
              </Button>
            </div>
          )}

          {/* AddServerButton with the handleServerAdded function */}
          <AddServerButton onServerAdded={handleServerAdded} />

        </Toolbar>
      </AppBar>
    </>
  );
};
export default PrimaryAppBar;
