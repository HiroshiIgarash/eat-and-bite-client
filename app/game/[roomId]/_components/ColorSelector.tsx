import React from "react";

interface ColorSelectorProps {
  guess: string[];
  selectColor: (color: string) => void;
  isMyTurn?: boolean;
}

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const ColorSelector: React.FC<ColorSelectorProps> = ({
  guess,
  selectColor,
  isMyTurn,
}) => {
  return (
    <div className="flex justify-center gap-2.5 mb-2.5 relative">
      {!isMyTurn && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(128, 128, 128, 0.5)",
            zIndex: 1,
          }}
        ></div>
      )}
      {colors.map((color, index) => (
        <button
          key={index}
          className="size-12 rounded-md active:scale-125 transition-transform"
          style={{
            backgroundColor: color,
          }}
          onClick={() => selectColor(color)}
          disabled={!isMyTurn || guess.length >= 4 || guess.includes(color)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
