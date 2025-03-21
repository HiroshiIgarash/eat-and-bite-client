import React from "react";

interface DebugInfoProps {
  roomId: string | string[] | undefined;
  clientCurrentTurn: number | null;
  socketId?: string;
  isMyTurn?: boolean;
  players: string[];
}

const DebugInfo: React.FC<DebugInfoProps> = ({
  roomId,
  clientCurrentTurn,
  socketId,
  isMyTurn,
  players,
}) => {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}
    >
      <h3>Debug Info</h3>
      <p>Room ID: {roomId}</p>
      <p>Client Current Turn: {clientCurrentTurn}</p>
      <p>Socket ID: {socketId}</p>
      <p>Is My Turn: {isMyTurn?.toString()}</p>
      <p>Players: {players.join(", ")}</p>
    </div>
  );
};

export default DebugInfo;
