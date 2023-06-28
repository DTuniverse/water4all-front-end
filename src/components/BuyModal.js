import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BuyModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      "https://water4all-backend.onrender.com/user/order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, address, comment }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Buy</Button>
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
                <h3>
                  Please fill all fields of the form, press submit and we will
                  contact you with details about paying and delivery
                </h3>
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

                <label>Your comments on order: </label>
                <input
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />

                <button>Submit order</button>
                <Button onClick={handleClose}>Back</Button>
                {error && <div className="error">{error}</div>}
              </form>
            </LoadingOverlay>
          </div>
        </Box>
      </Modal>
    </div>
  );
}