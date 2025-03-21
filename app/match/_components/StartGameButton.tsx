"use client";

import { useRouter } from "next/navigation";

interface StartGameButtonProps {
  roomId: string | null;
}

export default function StartGameButton({ roomId }: StartGameButtonProps) {
  const router = useRouter();

  const handleStartGame = () => {
    if (roomId) {
      router.push(`/game/${roomId}`);
    }
  };

  return (
    <button
      onClick={handleStartGame}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        marginRight: "10px",
      }}
    >
      対戦開始
    </button>
  );
}
