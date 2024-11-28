import React, { useEffect, useState } from "react";
import bus from "../../../utils/bus";

function Message() {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  useEffect(() => {
    const closeButton = document.querySelector(".close");
    if (closeButton) {
      closeButton.addEventListener("click", () => setVisibility(false));
    }
  });

  return (
    visibility && (
      <div
        className={`alert alert-${type} text-center mx-auto`}
        style={{ maxWidth: "60%" }}
        role="alert"
      >
        {message}
      </div>
    )
  );
}

export default Message;
