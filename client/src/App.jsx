import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import TalkingAvatar from "./components/TalkingAvatar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #3f3e3e;
  color: white;
`;

const TextArea = styled.textarea`
  text-align: right;
  width: 320px;
  height: 100px;
  margin-bottom: 12px;
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
`;

export default function App() {
  const [text, setText] = useState("");
  const [lipSync, setLipSync] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const audioRef = useRef(null);

  const handleSubmit = async () => {
    if (!text) return;

    setLoading(true);
    setError("");
    setLipSync([]);

    try {
      const res = await fetch("http://localhost:5000/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Invalid response from server");
      }

      const data = await res.json();

      setLipSync(data.lipSync);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = data.audio;
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      }
    } catch (err) {
      console.error("TTS error:", err);
      setError("Failed to generate speech");
    } finally {
      setLoading(false);
    }
  };

  // cleanup هنگام unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <Container>
      <TalkingAvatar lipSync={lipSync} />

      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="متن را وارد کنید"
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "در حال تولید صدا" : "تولید صدا"}
      </Button>

      {error && <p style={{ color: "salmon" }}>{error}</p>}

      <audio ref={audioRef} />
    </Container>
  );
}
