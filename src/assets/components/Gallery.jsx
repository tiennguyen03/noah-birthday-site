import { useState, useRef, useEffect } from "react"
import gallerySong from "../audio/gallerySong.mp3"; // 🔊 your gallery music
import "../../App.css";

function Gallery() {

    // Audio Logic
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const onFirstClick = () => {
            if (!audioRef.current) return;
            audioRef.current.muted = false;
            audioRef.current.volume = 0.1;
            audioRef.current.play();
            setIsPlaying(true);
    
        document.removeEventListener("click", onFirstClick);
        };

        document.addEventListener("click", onFirstClick);
        return () => document.removeEventListener("click", onFirstClick);

    },[]);

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


    // Posting Logic
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault(); // Stops the browser from refreshing

        const trimmedName = name.trim();
        const trimmedMsg = message.trim();
        if (!trimmedName || !trimmedMsg) return; // don’t allow empty/whitespace posts

        const newPost = {
            id: Date.now(),
            name: trimmedName,
            message: trimmedMsg,
            image: image ? URL.createObjectURL(image) : null, // ✅ local preview
            createdAt: new Date().toISOString()
        }

        setPosts((prev) => [newPost, ...prev]); 
        setName("");
        setMessage("");
        setImage(null);
    };

    return (
    <>
        <div className="gallery-wall">
        {/* Form is the first "card" */}
            <div className="form-card">
                <form onSubmit={handleSubmit} className="gallery-form">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder="Write a birthday message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button type="submit">Post</button>
                </form>
            </div>

            {/* Each post is also a card */}
            {posts.map((p) => (
                <div key={p.id} className="post">
                {p.image && <img src={p.image} alt="upload" className="post-img" />}
                <h3>{p.name}</h3>
                <p>{p.message}</p>
                </div>
            ))}
        </div>

        {/* Audio + music controls */}
        <audio ref={audioRef} src={gallerySong} autoPlay loop muted />
        <button className="music-btn" onClick={handleToggle}>
        {isPlaying ? "Pause Music" : "Play Music"}
        </button>
    </>
    );

}

export default Gallery;