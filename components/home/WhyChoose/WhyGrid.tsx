"use client";

import WhyCard from "./WhyCard";
import { whyData } from "./whyData";

export default function WhyGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {whyData.map((item) => (
        <WhyCard key={item.title} {...item} />
      ))}
    </div>
  );
}