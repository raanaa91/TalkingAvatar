import { useEffect, useState } from "react";
import styled from "styled-components";

const Svg = styled.svg`
  width: 160px;
  height: 160px;
  margin-bottom: 20px;
`;

export default function TalkingAvatar({ lipSync }) {
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    if (!lipSync || lipSync.length === 0) return;

    const timers = lipSync.map((step) =>
      setTimeout(() => {
        setMouthOpen(step.mouth === "open");
      }, step.time * 1000)
    );

    // cleanup
    return () => timers.forEach(clearTimeout);
  }, [lipSync]);

  return (
    <Svg viewBox="0 0 200 200">
      {/* Head */}
      <circle cx="100" cy="100" r="80" fill="#FFD6A0" />

      {/* Eyes */}
      <circle cx="70" cy="80" r="8" fill="#000" />
      <circle cx="130" cy="80" r="8" fill="#000" />

      {/* Mouth */}
      <ellipse
        cx="100"
        cy="140"
        rx="28"
        ry={mouthOpen ? 18 : 6}
        fill="red"
        style={{ transition: "ry 0.12s ease-in-out" }}
      />
    </Svg>
  );
}
