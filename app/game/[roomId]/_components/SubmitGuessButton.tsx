import React from "react";

interface SubmitGuessButtonProps {
  onClick: () => void;
  isDisabled: boolean;
}

const SubmitGuessButton: React.FC<SubmitGuessButtonProps> = ({
  onClick,
  isDisabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        backgroundColor: isDisabled ? "#ccc" : "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Submit Guess
    </button>
  );
};

export default SubmitGuessButton;
