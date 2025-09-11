import { useState, useEffect, useRef } from "react";
import birthdaySong from "../audio/birthdaySong.mp3";
import noahImg from "../images/noah-pic.png";
import { supabase } from "../../lib/supabaseClient";
import "../../App.css";

function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClickMessage, setShowClickMessage] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const [countdownLabel, setCountdownLabel] = useState("");
  
// Reservation Button Logic
const [guests, setGuests] = useState([]);
const [guestName, setGuestName] = useState("");

// Load guest list when page loads
  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) console.error(error);
    else setGuests(data);
  };

  // Handle button click
  const handleReservation = async (name) => {
    if (!name.trim()) return; // prevent empty submissions
    const { error } = await supabase.from("reservations").insert([
      {
        name, // ✅ use the passed value
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      setGuestName(""); // clear the input
      fetchGuests();    // refresh list
    }
  };


  // handle first click to unmute + autoplay
  useEffect(() => {
    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.2;
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
        <h1 className="main-text">Noah's 21st Birthday Party</h1>

        <div className="countdown">
          {timeLeft.message ? (
            <h2>{timeLeft.message}</h2>
          ) : (
            <h2>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </h2>
          )}
          {countdownLabel && <h3 className="cd-label">{countdownLabel}</h3>}
        </div>

        <p className={`click-message ${!showClickMessage ? "hidden" : ""}`}>
          (Click anywhere to start the music)
        </p>

        {/* Reservation Section */}
        <div className="reservation">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Enter your name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              className="im-there-btn"
              onClick={() => handleReservation(guestName)}
            >
              I'M THERE 🎉
            </button>
          </div>

          <h3 className="attendees">Attendees:</h3>
          <ul>
            {guests.map((guest) => (
              <li key={guest.id}>{guest.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom elements grouped */}
      <div>
        <audio ref={audioRef} src={birthdaySong} autoPlay loop muted />
        <button className="music-btn" onClick={handleToggle}>
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
        <img className="noahImg" src={noahImg} alt="picture of noah" />
      </div>
    </>
  );
}

export default Home;
