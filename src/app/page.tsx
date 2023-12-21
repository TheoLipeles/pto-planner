"use client";

import Calendar from "@/components/calendar";
import MonthSelector from "@/components/month-selector";
import Image from "next/image";
import { useState } from "react";
import { type MonthIndex } from "@/lib/date";

export default function Home() {
  const [month, setMonth] = useState<MonthIndex>(1);
  const [year, setYear] = useState(2023);

  return (
    <main className="flex color-white min-h-screen flex-col items-center justify-between p-24">
      <MonthSelector
        monthState={[month, setMonth]}
        yearState={[year, setYear]}
      />
      <Calendar month={month} year={year}></Calendar>
    </main>
  );
}
