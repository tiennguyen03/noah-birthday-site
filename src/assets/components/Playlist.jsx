function Playlist() {
  return (
    <>
      <div className="pl-container">

        <h1>Background Playlist (Collaborative)</h1>
        <iframe
          className="party-playlist"
          src="https://open.spotify.com/embed/playlist/6SkdwwFZpY8g8GWcAGrAmt?utm_source=generator"
          height="450"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          allowFullScreen
        ></iframe>


        <h1> Karaoke Playlist (Collaborative)</h1>
        <iframe
          className="party-playlist"
          src="https://open.spotify.com/embed/playlist/4aCDNIqf0XzYmhzT8CUGJa?utm_source=generator"
          height="450"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default Playlist;
