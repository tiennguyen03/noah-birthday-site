import { useState, useEffect, useRef} from 'react'
import birthdaySong from "./assets/audio/birthdaySong.mp3"
import './App.css'

// Reservation( basically showing that you went name and note) that once done, you name will be featured on the front page
// Photo Gallery/ Memory Wall of the night, where after the party you can upload your photos to the gallery
// Digital Gift card with a password only the king knows
// Birthday Wishes page?
// Obviously A song that plays at the party
// a collaborative Spotify Playlist
// Countdown till birthday
// Some type of animations


function App() {

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClickMessage, setShowClickMessage] = useState(true);

  useEffect(() => {
  const handleFirstClick = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;   // 🔊 unmute
      audioRef.current.volume = 0.7;    // set volume
      audioRef.current.play();          // ensure it plays
      setIsPlaying(true);
      setShowClickMessage(false);
    }
    // Remove the listener after the first click
    document.removeEventListener("click", handleFirstClick);
  };

  document.addEventListener("click", handleFirstClick);

  return () => {
    document.removeEventListener("click", handleFirstClick);
  };
}, []);


  const handleToggle = () => {
    if(!audioRef.current) return;

    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Countdown Untill Birthday
  const[timeLeft, setTimeLeft] = useState({});

  useEffect(() => { 
    const birthday = new Date("2025-09-12T00:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const diff = birthday - now;

      if(diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ message: "YOU ARE NOW UNC" });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds});
      }
    }, 1000);

    return () => clearInterval(interval);
  },[]);

  return (
    <>
    <div className='center-text'>
      <h1 className="main-text">HAPPY BIRTHDAY</h1>
      <h1 className="main-text">Noah's 21st Birthday</h1>

      <div className="countdown">
        {timeLeft.message ? (
          <h2>{timeLeft.message}</h2>
        ) : (
          <h2>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}seconds          
          </h2>
        )}
      </div>
      <p className={`click-message ${!showClickMessage ? "hidden" : ""}`}>(Click anywhere to start the music)</p>
    </div>



  <audio ref={audioRef} src={birthdaySong} autoPlay loop muted />

  <button className="music-btn" onClick={handleToggle}>{isPlaying ? "Pause Music" : "Play Music"} </button>

    </>
  );
}

export default App
