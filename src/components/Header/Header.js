import "./Header.css";
import { useHistory } from "react-router-dom";
import ThemeContext from "../../themeContext";
import { useContext } from "react";

const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    // eslint-disable-next-line
    const history = useHistory();

    const logoClicked = () => {
        // history.push('/')
        window.scroll(0, 0);
    };

    return (
        <div className="nav-container" style={{...theme, backgroundColor: '#333'}}>
            <div onClick={logoClicked} className="header">
                Movies Searcher
            </div>
            <div className="toggle-control-container">
                <label className="toggle-control" >
                    <input type="checkbox" onClick={toggleTheme} />
                    <span className="control"></span>
                </label>
            </div>
        </div>
    );
};

export default Header;
