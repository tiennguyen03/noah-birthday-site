import { useState, useRef, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient";
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

    // Post saving Logic

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false }); // newest first

        if (error) console.error(error);
        else setPosts(data);
    };


    const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedMsg = message.trim();
    if (!trimmedName || !trimmedMsg) return;

    let uploadedUrl = null;

    // ✅ If image exists, upload to Supabase storage
    if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data: fileData, error: fileError } = await supabase.storage
        .from("gallery") // make sure you created this bucket
        .upload(fileName, image);

        if (fileError) {
        console.error("Upload error:", fileError);
        return; // stop if upload fails
        } else {
        // ✅ Fetch public URL after upload
        const { data: publicData } = supabase.storage
            .from("gallery")
            .getPublicUrl(fileName);

        uploadedUrl = publicData.publicUrl;
        }
    }

    // ✅ Save post in Supabase database
    const { error } = await supabase.from("posts").insert([
        { name: trimmedName, message: trimmedMsg, image_url: uploadedUrl },
    ]);

    if (error) {
        console.error("Insert error:", error);
    } else {
        setName("");
        setMessage("");
        setImage(null);
        fetchPosts(); // refresh posts after insert
    }
    };

    return (
    <>
        <div className="gallery-wall">
        {/* Posts grid (form card comes first) */}
        <div className="posts">
            {/* Form card */}
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

            {/* Render posts after the form card */}
            {posts.map((p) => (
            <div key={p.id} className="post">
                {p.image_url && (
                <img src={p.image_url} alt="upload" className="post-img" />
                )}
                <h3>{p.name}</h3>
                <p>{p.message}</p>
                <small>{new Date(p.created_at).toLocaleString()}</small>
            </div>
            ))}
        </div>
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