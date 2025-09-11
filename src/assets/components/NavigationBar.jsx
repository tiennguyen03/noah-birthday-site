import { Link } from "react-router-dom"

function NavigationBar(){
    return (
        <nav className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/wall">Gallery</Link>
            <Link to="/playlist">Playlist</Link>
            <Link className="claim-btn" to="/gift">CLAIM</Link>
        </nav>
    );
}
export default NavigationBar;