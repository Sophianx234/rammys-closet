"use client";

import { GridLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
      <GridLoader size={24} color="#ffaf9f" />
    </div>
  );
}
