import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";

import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { useState, useEffect, useRef, useContext } from "react";

export default function LetterAvatars() {
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  //  const [username, setUsername] = useState("test");
  //   console.log("SATURDAY", decodedToken?.name);
  return (
    <Avatar sx={{ bgcolor: "#1da2d2", width: "30px", height: "30px" }}>
      {decodedToken?.name[0]}
    </Avatar>
  );
}
