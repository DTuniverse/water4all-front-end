import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Login from "./Login";
import Signup from "./Signup";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#E9FBFF",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModalLogin() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        style={{ fontSize: "16px", margin: "5px" }}
        variant="outlined"
      >
        <LoginRoundedIcon
          style={{
            position: "relative",
            right: "5px",
          }}
        />
        Log In
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "95vw" }}>
          <Login />
          <Button
            style={{ fontSize: "16px" }}
            onClick={handleClose}
            color="error"
          >
            <CloseIcon />
            Close
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function ChildModalSignUp() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        style={{ fontSize: "16px", margin: "5px" }}
        onClick={handleOpen}
        variant="outlined"
      >
        {" "}
        <PersonAddAlt1RoundedIcon
          style={{
            position: "relative",
            right: "5px",
          }}
        />{" "}
        Sign Up{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "95vw" }}>
          <Signup />
          <Button
            style={{ fontSize: "16px" }}
            onClick={handleClose}
            color="error"
          >
            <CloseIcon />
            Close
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "5px",
        }}
      >
        <Button
          onClick={handleOpen}
          style={{
            width: "auto",
            height: "40px",
          }}
          variant="outlined"
        >
          <LoginRoundedIcon />
          Login to add new water point
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "95vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <h2 id="parent-modal-title">Please login</h2> */}
          <ChildModalLogin />
          <ChildModalSignUp />
          <Button
            style={{ fontSize: "16px", margin: "5px" }}
            onClick={handleClose}
            color="error"
          >
            <CloseIcon />
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

{
}
