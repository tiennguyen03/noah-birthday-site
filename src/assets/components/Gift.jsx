import { useState, useEffect, useRef } from "react";
import giftSong from "../audio/giftSong.mp3"; // 🎵 change to your audio file
import "../../App.css";

function Gift() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // Autoplay logic
  useEffect(() => {
    const onFirstClick = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current.volume = 0.3;
      audioRef.current.play();
      setIsPlaying(true);

      document.removeEventListener("click", onFirstClick);
    };

    document.addEventListener("click", onFirstClick);
    return () => document.removeEventListener("click", onFirstClick);
  }, []);

  // Toggle play/pause
  const handleToggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Check password
  const handleUnlock = (e) => {
    e.preventDefault(); // ✅ stops page reload
    if (password === "iamtheking") {
      setUnlocked(true);
    } else {
      alert("Wrong password! 👑");
    }
  };

  return (
    <div className="gift-page">
      <h1>
        MUST BE <span className="rainbow-text">KING</span> to claim
      </h1>

      <div className="gift-container">
        <p className="gift-instruction">🎁 Enter the password to reveal your gift</p>
        <form onSubmit={handleUnlock} className="gift-form">
          <input
            className="gift-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="gift-btn" type="submit">
            Unlock
          </button>
        </form>

        {unlocked && (
          <div className="gift-reveal">
            <h2>AMAZON: AQGV-XP4SJ2-MMEAV</h2>
          </div>
        )}
      </div>

      <audio ref={audioRef} src={giftSong} autoPlay loop muted />
      <button className="music-btn" onClick={handleToggle}>
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
    </div>
  );
}

export default Gift;
