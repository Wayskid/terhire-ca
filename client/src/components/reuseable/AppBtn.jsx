import React from "react";

export default function AppBtn({ label, onClick, type, isDisabled, version }) {
  let className;

  switch (version) {
    case "activeNav":
      className = "bg-secondary text-white border border-transparent";
      break;
    case "inActiveNav":
      className =
        "bg-transparent text-black border border-black hover:text-white hover:bg-secondary hover:border-transparent";
      break;
    case "neutral":
      className =
        "bg-transparent text-black border border-black hover:text-white hover:bg-main hover:border-transparent";
      break;
    case "primary":
      className =
        "bg-secondary border-transparent hover:text-black hover:border-black text-white hover:bg-transparent";
      break;
    case "secondary":
      className =
        "bg-tertiary border-transparent hover:text-black hover:border-black text-white hover:bg-transparent";
      break;
    case "tertiary":
      className =
        "bg-main border-transparent hover:text-black hover:border-black text-white hover:bg-transparent";
      break;
    default:
      className =
        "bg-secondary border-transparent hover:text-black hover:border-black text-white hover:bg-transparent";
      break;
  }
  return (
    <button
      className={`px-6 py-4 text-base tracking-[0.125rem] uppercase border-[1px] [transition:0.6s_ease] disabled:pointer-events-none disabled:opacity-40 ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
