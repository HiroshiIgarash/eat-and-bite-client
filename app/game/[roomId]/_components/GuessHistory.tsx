import React from "react";

interface GuessHistoryProps {
  history: {
    player: string;
    guess: string[];
    results: { eat: number; bite: number };
  }[];
  socketId?: string;
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ history, socketId }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>History</h3>
      {history.map((entry, index) => (
        <p key={index}>
          Turn {index + 1}: {entry.player === socketId ? "自分" : "相手"}:{" "}
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
          : EAT {entry.results.eat} BITE {entry.results.bite}
        </p>
      ))}
    </div>
  );
};

export default GuessHistory;
