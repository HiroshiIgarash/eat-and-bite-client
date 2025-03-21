"use client";

export default function GoHomeButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      TOPへ戻る
    </button>
  );
}
