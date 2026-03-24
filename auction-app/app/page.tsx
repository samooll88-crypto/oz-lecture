"use client";

import { useState } from "react";

function parseCaseNumber(caseNumber: string) {
  const regex = /^(\d{4})타경(\d+)$/;
  const match = caseNumber.trim().match(regex);

  if (!match) return null;

  return {
    year: match[1],
    number: match[2],
  };
}

export default function Home() {
  const [caseNumber, setCaseNumber] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    const parsed = parseCaseNumber(caseNumber);

    if (!parsed) {
      setResult("사건번호 형식이 올바르지 않습니다. 예: 2024타경138635");
      return;
    }

    const res = await fetch("/api/auction-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courtName: "서울중앙지방법원",
        caseNumberYear: parsed.year,
        caseNumberNumber: parsed.number,
      }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>경매 조회 테스트</h1>

      <input
        value={caseNumber}
        onChange={(e) => setCaseNumber(e.target.value)}
        placeholder="예: 2024타경138635"
      />

      <button onClick={handleSearch}>조회</button>

      <pre>{result}</pre>
    </div>
  );
}