"use client";

import { getSocket } from "@/app/utils/socket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ColorSelector from "./_components/ColorSelector";
import DebugInfo from "./_components/DebugInfo";
import GuessHistory from "./_components/GuessHistory";
import SubmitGuessButton from "./_components/SubmitGuessButton";

export default function Game() {
  const { roomId } = useParams();
  const router = useRouter();
  const [guess, setGuess] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState<number | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [history, setHistory] = useState<
    {
      player: string;
      guess: string[];
      results: { eat: number; bite: number };
    }[]
  >([]);

  const socket = getSocket();

  const isMyTurn = currentTurn !== null && socket.id === players[currentTurn];

  useEffect(() => {
    if (!roomId) return;

    socket.on("send_game_info", (data) => {
      console.log(data);
      setPlayers(data.players);
      setCurrentTurn(data.serverCurrentTurn);
      setHistory(data.history);
    });
    socket.emit("enter_game", { roomId });

    const handleGameOver = ({ winner }: { winner: string }) => {
      alert(winner === socket.id ? "You win!" : "You lose!");
      router.push("/"); // TOPページにリダイレクト
    };
    socket.on("game_over", handleGameOver);

    return () => {
      socket.off("game_over", handleGameOver);
    };
  }, [roomId, router, socket]);

  const submitGuess = () => {
    if (roomId && isMyTurn && guess.length === 4) {
      socket.emit("submit_guess", { roomId, guess });
      setGuess([]);
    }
  };

  const selectColor = (color: string) => {
    if (isMyTurn && guess.length < 4 && !guess.includes(color)) {
      setGuess([...guess, color]);
    }
  };

  return (
    <div className="flex flex-col h-full p-5">
      <div className="grow-1">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Eat and Bite Game
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Guess the colors
          </h3>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p>Selected colors:</p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              {guess.map((color, index) => (
                <span
                  key={index}
                  className="inline-block size-5 rounded-md"
                  style={{
                    backgroundColor: color,
                  }}
                ></span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <SubmitGuessButton
              onClick={submitGuess}
              isDisabled={!isMyTurn || guess.length !== 4}
            />
          </div>
        </div>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          {isMyTurn ? "Your turn" : "Opponent's turn"}
        </p>
        <DebugInfo
          roomId={roomId}
          clientCurrentTurn={currentTurn}
          socketId={socket.id}
          isMyTurn={isMyTurn}
          players={players}
        />
        <GuessHistory history={history} socketId={socket.id} />
      </div>
      <ColorSelector
        guess={guess}
        selectColor={selectColor}
        isMyTurn={isMyTurn}
      />
    </div>
  );
}
