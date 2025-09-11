import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();

  // Map paths → page names
  const pageTitles = {
    "/": "Home",
    "/gallery": "Gallery",
    "/playlist": "Playlist",
    "/gift": "Gift"
  };

  const currentTitle = pageTitles[location.pathname] || "";

  return (
    <nav className="navbar">
      {/* Left side: page title */}
      <div className="page-title">{currentTitle}</div>

      {/* Right side: links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
         <Link to="/playlist">Playlist</Link>
        <Link to="/gift" className="claim-btn">CLAIM</Link>
      </div>
    </nav>
  );
}

export default NavigationBar;
