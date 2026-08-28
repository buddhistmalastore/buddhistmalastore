"use client";

import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="
        mt-6
        inline-flex
        items-center
        gap-2
        text-xs
        font-medium
        text-[#8A8074]
        transition
        hover:text-[#C79B2A]
      "
    >
      <FiArrowLeft size={14} />

      Go back to previous page
    </button>
  );
}