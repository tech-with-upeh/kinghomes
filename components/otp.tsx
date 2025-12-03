import React, { useRef } from "react";

export default function OtpInput() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (index: number, e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/[^0-9]/g, ""); // only digits

    if (input.value && index < 5) {
      inputsRef.current[index + 1]?.focus(); // auto jump
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus(); // auto go back
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el; // <- NO return value
          }}
          name={`otp-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onInput={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-15 h-15 text-center text-2xl rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        />
      ))}
    </div>
  );
}
