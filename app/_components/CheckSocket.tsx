"use client";

import { getSocket } from "../utils/socket";

const CheckSocket = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        borderTop: "1px solid black",
        width: "100%",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={() => {
          const socket = getSocket();
          console.log(socket);
        }}
        style={{
          padding: "10px",
          width: "100%",
        }}
      >
        socket取得
      </button>
    </div>
  );
};

export default CheckSocket;
