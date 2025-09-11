import { Routes, Route } from "react-router-dom";
import NavigationBar from "./assets/components/NavigationBar.jsx";
import Home from "./assets/components/Home.jsx";
import Gallery from "./assets/components/Gallery.jsx";
import Gift from "./assets/components/Gift.jsx";
import Playlist from "./assets/components/Playlist.jsx";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wall" element={<Gallery />} />
        <Route path="/gift" element={<Gift />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </>
  );
}

export default App;
