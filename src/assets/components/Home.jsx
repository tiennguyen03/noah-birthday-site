import { useState, useEffect, useRef } from "react";
import birthdaySong from "../audio/birthdaySong.mp3";
import noahImg from "../images/noah-pic.png";
import "../../App.css";

function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClickMessage, setShowClickMessage] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const [countdownLabel, setCountdownLabel] = useState("");

  // handle first click to unmute + autoplay
  useEffect(() => {
    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.7;
        audioRef.current.play();
        setIsPlaying(true);
        setShowClickMessage(false);
      }
      document.removeEventListener("click", handleFirstClick);
    };

    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
  }, []);

  // toggle music
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

  // countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(`${currentYear}-09-12T00:00:00`);

      if (now > birthday) {
        birthday = new Date(`${currentYear + 1}-09-12T00:00:00`);
        setCountdownLabel("Countdown until your NEXT birthday 🎂");
      } else {
        setCountdownLabel("Countdown until your birthday 🎂");
      }

      if (now.getMonth() === 8 && now.getDate() === 12) {
        setTimeLeft({ message: "🎉 THIS IS YOUR BIG DAY 🎉" });
        setCountdownLabel("");
        return;
      }

      const diff = birthday - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="center-text">
        <h1 className="main-text">HAPPY BIRTHDAY</h1>
        <h1 className="main-text">Noah's 21st Birthday</h1>

        <div className="countdown">
          {countdownLabel && <h3 className="cd-label">{countdownLabel}</h3>}
          {timeLeft.message ? (
            <h2>{timeLeft.message}</h2>
          ) : (
            <h2>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </h2>
          )}
        </div>

        <p className={`click-message ${!showClickMessage ? "hidden" : ""}`}>
          (Click anywhere to start the music)
        </p>
      </div>

      <audio ref={audioRef} src={birthdaySong} autoPlay loop muted />
      <button className="music-btn" onClick={handleToggle}>
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
      <img className="noahImg" src={noahImg} alt="picture of noah" />
    </>
  );
}

export default Home;
