import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useContext } from "react";
import LoadingOverlay from "react-loading-overlay";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BuyModal() {
  const [openAlert, setOpenAlert] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { token } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrdered, setIsOrdered] = useState(true);
  const { decodedToken } = useJwt(token);
  console.log(token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newOrder = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      address: address,
      comments: comment,
      user_id: decodedToken?._id,
    };
    setIsLoading(true);
    setError(null);
    setIsOrdered(false);
    try {
      const response = await fetch(
        "https://water4all-backend.onrender.com/order",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        }
      );
      console.log(response);
      setIsLoading(false);
      setOpenAlert(true);
      setOpen(false);
      setAddress(null);
      setComment(null);
      setEmail(null);
      setFirstName(null);
      setLastName(null);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ backgroundColor: "#2669BA" }}
      >
        ORDER
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <LoadingOverlay
              active={isLoading}
              spinner
              text="Sending your order..."
            >
              <form className="signup" onSubmit={handleSubmit}>
                <p style={{ fontWeight: "bold" }}>
                  Please fill all fields and press Submit Order.
                </p>
                <p style={{ fontWeight: "bold" }}>
                  We will contact you with paying and delivery details.
                </p>

                <br />

                <label>First Name: </label>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <label>Last Name: </label>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />

                <label>Email: </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <label>Delivery address: </label>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />

                <label>Additional comments: </label>
                {/* <input
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                /> */}
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  rows={3}
                  placeholder="Quantity, delivery details, etc.."
                />

                <Button
                  onClick={handleClose}
                  color="error"
                  sx={{ marginTop: "10px" }}
                >
                  <CloseIcon />
                  Close
                </Button>
                <button
                  style={{
                    backgroundColor: "#2669ba",
                    height: "37px",
                    float: "right",
                    marginTop: "10px",
                  }}
                >
                  SUBMIT ORDER
                </button>
                {error && <div className="error">{error}</div>}
              </form>
            </LoadingOverlay>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="success">
          Order sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
