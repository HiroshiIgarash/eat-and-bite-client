"use client";

import { useRouter } from "next/navigation";
import { getSocket } from "./utils/socket";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    const socket = getSocket();
    socket.disconnect();
  }, []);

  const handleStartGame = () => {
    const socket = getSocket();
    socket.connect();
    route.push("/match");
  };
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Eat and Bite</h1>
      <Button onClick={handleStartGame}>ランダム対戦</Button>
    </div>
  );
}
