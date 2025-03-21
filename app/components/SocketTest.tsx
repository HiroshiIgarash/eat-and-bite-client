"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function SocketTest() {
  const [message, setMessage] = useState<string>("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [guess, setGuess] = useState<string[]>([]);
  const [result, setResult] = useState<{ eat: number; bite: number } | null>(
    null
  );
  const [clientCurrentTurn, setClientCurrentTurn] = useState<number | null>(
    null
  );
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [history, setHistory] = useState<
    {
      turn: number;
      player: string;
      guess: string[];
      result: { eat: number; bite: number };
    }[]
  >([]);
  const [turnCount, setTurnCount] = useState<number>(1);

  useEffect(() => {
    socket.on("match_found", ({ roomId }) => {
      setRoomId(roomId);
      setMessage(`Matched! Room ID: ${roomId}`);
      console.log(`Matched! Room ID: ${roomId}`);
    });

    socket.on("start_game", ({ roomId, serverCurrentTurn, players }) => {
      console.log(`Game started in room: ${roomId}`);
      setMessage(`Game started in room: ${roomId}`);
      setClientCurrentTurn(serverCurrentTurn);
      setPlayers(players);
      setIsMyTurn(socket.id === players[serverCurrentTurn]);
      console.log(
        `serverCurrentTurn: ${serverCurrentTurn}, socket.id: ${
          socket.id
        }, isMyTurn: ${socket.id === players[serverCurrentTurn]}`
      );
    });

    socket.on("guess_result", ({ playerId, result, guess }) => {
      setResult(result);
      setHistory((prevHistory) => [
        ...prevHistory,
        { turn: turnCount, player: playerId, guess, result },
      ]);
      setTurnCount((prevTurnCount) => prevTurnCount + 1);
      console.log(`Guess result: ${JSON.stringify(result)}`);
    });

    socket.on("game_over", ({ winner }) => {
      if (winner === socket.id) {
        alert("You win!");
      } else {
        alert("You lose!");
      }
      console.log(`Game over. Winner: ${winner}`);
    });

    socket.on("next_turn", ({ serverCurrentTurn }) => {
      setClientCurrentTurn(serverCurrentTurn);
      setIsMyTurn(socket.id === players[serverCurrentTurn]);
      if (socket.id === players[serverCurrentTurn]) {
        setGuess([]); // 自分のターンが来たときにguess配列をリセット
      }
      console.log(
        `Next turn. serverCurrentTurn: ${serverCurrentTurn}, socket.id: ${
          socket.id
        }, isMyTurn: ${socket.id === players[serverCurrentTurn]}`
      );
    });

    return () => {
      socket.off("match_found");
      socket.off("start_game");
      socket.off("guess_result");
      socket.off("game_over");
      socket.off("next_turn");
    };
  }, [players, turnCount]);

  const findMatch = () => {
    console.log("findMatch");
    socket.emit("find_match");
  };

  const submitGuess = () => {
    if (roomId && isMyTurn && guess.length === 4) {
      console.log("Submitting guess:", guess); // デバッグ用ログ
      socket.emit("submit_guess", { roomId, guess });
    }
  };

  const selectColor = (color: string) => {
    if (isMyTurn && guess.length < 4 && !guess.includes(color)) {
      setGuess([...guess, color]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Eat and Bite Game</h2>
      <button
        onClick={findMatch}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Find Match
      </button>
      <div>
        <h3>Guess the colors</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          {["red", "blue", "green", "yellow", "purple", "orange"].map(
            (color, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: color,
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "5px",
                }}
                onClick={() => selectColor(color)}
                disabled={
                  !isMyTurn || guess.length >= 4 || guess.includes(color)
                }
              />
            )
          )}
        </div>
        <div>
          <p>Selected colors: {guess.join(", ")}</p>
        </div>
        <button
          onClick={submitGuess}
          disabled={!isMyTurn || guess.length !== 4}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: isMyTurn && guess.length === 4 ? "pointer" : "not-allowed",
            backgroundColor:
              isMyTurn && guess.length === 4 ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit Guess
        </button>
      </div>
      {result && (
        <div>
          <h3>Result</h3>
          <p>Eat: {result.eat}</p>
          <p>Bite: {result.bite}</p>
        </div>
      )}
      <p>{message}</p>
      <p>{isMyTurn ? "Your turn" : "Opponent's turn"}</p>
      <div
        style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}
      >
        <h3>Debug Info</h3>
        <p>Room ID: {roomId}</p>
        <p>Client Current Turn: {clientCurrentTurn}</p>
        <p>Socket ID: {socket.id}</p>
        <p>Is My Turn: {isMyTurn.toString()}</p>
        <p>Players: {players.join(", ")}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>History</h3>
        {history.map((entry, index) => (
          <p key={index}>
            Turn {entry.turn}: {entry.player === socket.id ? "自分" : "相手"}:{" "}
            {entry.guess.map((color, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  backgroundColor: color,
                  margin: "0 5px",
                  borderRadius: "3px",
                }}
              ></span>
            ))}
            : EAT {entry.result.eat} BITE {entry.result.bite}
          </p>
        ))}
      </div>
    </div>
  );
}
