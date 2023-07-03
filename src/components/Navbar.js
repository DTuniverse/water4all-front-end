import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link, Typography } from "@mui/material";
// import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink } from "react-router-dom";
import { useJwt } from "react-jwt";
import LetterAvatars from "./LetterAvatars";
import "./Navbar.css";

const pages = ["WaterBlog", "WaterShop"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { logout, token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = () => {
    localStorage.removeItem("token");
    logout();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#E9FBFF" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            src={process.env.PUBLIC_URL + "/resources/mdi_drop.svg"}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: "24px",
              height: "24px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            // component="a"
            // href=""
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "roboto",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#1DA2D2",
              textDecoration: "none",
            }}
          >
            WATER4ALL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    to="/"
                    className="navlink"
                    activeClassName="active"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      padding: "6px 16px",
                    }}
                  >
                    Home
                  </NavLink>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    to="/mappage"
                    className="navlink"
                    activeClassName="active"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      padding: "6px 16px",
                    }}
                  >
                    Water Map
                  </NavLink>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    to="/blogpage"
                    className="navlink"
                    activeClassName="active"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      padding: "6px 16px",
                    }}
                  >
                    Water Hub
                  </NavLink>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    to="/shoppage"
                    className="navlink"
                    activeClassName="active"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      padding: "6px 16px",
                    }}
                  >
                    Water Shop
                  </NavLink>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Avatar
            src={process.env.PUBLIC_URL + "/resources/mdi_drop.svg"}
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 0,
              width: "24px",
              height: "24px",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            // component={Link}
            // to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "roboto",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: ".3rem",
              color: "#1DA2D2",
              textDecoration: "none",
            }}
          >
            WATER4ALL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {token === null && (
                  <Avatar
                    alt="out"
                    src=""
                    sx={{ width: "30px", height: "30px" }}
                  />
                )}
                {token !== null && (
                  // <Avatar
                  //   alt="in"
                  //   src={process.env.PUBLIC_URL + "/resources/astr.jpeg"}
                  // />
                  <LetterAvatars />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {token !== null && (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleClick();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
              {token === null && (
                <div>
                  <MenuItem>
                    <Typography textAlign="center">
                      <NavLink
                        to="/login"
                        className="navlink"
                        activeClassName="active"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          padding: "6px 16px",
                        }}
                      >
                        Log In
                      </NavLink>
                    </Typography>
                  </MenuItem>

                  <MenuItem>
                    <Typography textAlign="center">
                      <NavLink
                        to="/signup"
                        className="navlink"
                        activeClassName="active"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          padding: "6px 16px",
                        }}
                      >
                        Sign Up
                      </NavLink>
                    </Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
// import { Link } from "react-router-dom";
// import { useJwt } from "react-jwt";

/* // export default function Navbar() {
//   const { logout, token } = useContext(AuthContext);

//   const handleClick = () => {
//     localStorage.removeItem("token");
//     logout();
//   };

//   const { decodedToken } = useJwt(token);

//   return (
//     <div className="container">
//       <div className="title">
//         <Link to="/">My Cool Blog</Link>
//       </div>
//       <nav>
//         {token !== null && (
//           <div>
//             <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span>
//             <button onClick={handleClick}>Log out</button>
//           </div>
//         )}
//         {token === null && (
//           <div>
//             <Link to="login">Login</Link>
//             <Link to="signup">Signup</Link>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// }


  {/* {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    handleClick();
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem> */
