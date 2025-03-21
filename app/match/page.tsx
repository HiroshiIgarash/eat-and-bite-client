"use client";

import { useEffect, useState } from "react";
import GoHomeButton from "./_components/GoHomeButton";
import { useRouter } from "next/navigation";
import { getSocket } from "../utils/socket";
import { Socket } from "socket.io-client";

export default function Match() {
  const router = useRouter();
  const [message, setMessage] = useState("対戦相手を探しています...");
  const [soc, setSoc] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket();

    socket.emit("enter_match");

    socket.on("match_found", ({ roomId }) => {
      setMessage("対戦相手が見つかりました。3秒後に移動します。");
      setTimeout(() => {
        router.push(`/game/${roomId}`);
      }, 3000);
    });

    setSoc(socket);
    return () => {
      socket.off("match_found");
    };
  }, [router]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="p-20 text-center">
      <h1>Eat and Bite</h1>
      <p>{message}</p>

      <GoHomeButton onClick={handleGoHome} />
      <div>{soc?.id}</div>
      <div>{soc?.connected}</div>
    </div>
  );
}
