import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#333",
        zIndex: 100,
    },
});

const navSelected = {
    selected: {
        color: "#892cdc",
    },
    notSelected: {
        color: "#fff",
    },
};

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    useEffect(() => {
        if (value === 0) {
            history.push("/");
        } else if (value === 1) {
            history.push("/movies");
        } else if (value === 2) {
            history.push("/series");
        } else if (value === 3) {
            history.push("/search");
        }

        window.scroll(0, 0);
    }, [value, history]);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction style={value === 0 ? navSelected.selected : navSelected.notSelected} label="Trending" icon={<WhatshotIcon />} />
            <BottomNavigationAction style={value === 1 ? navSelected.selected : navSelected.notSelected} label="Movies" icon={<MovieIcon />} />
            <BottomNavigationAction style={value === 2 ? navSelected.selected : navSelected.notSelected} label="TV Series" icon={<TvIcon />} />
            <BottomNavigationAction style={value === 3 ? navSelected.selected : navSelected.notSelected} label="Search" icon={<SearchIcon />} />
        </BottomNavigation>
    );
}
