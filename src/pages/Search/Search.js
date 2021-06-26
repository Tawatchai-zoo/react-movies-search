import { Button, createMuiTheme, Tab, Tabs, TextField, ThemeProvider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import SpinnerLoading from "../../SpinnerLoading";
import ThemeContext, {themeStyle} from "../../themeContext";

const Search = () => {
    const {theme} = useContext(ThemeContext)
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [loading, setLoading] = useState(false);

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });
    const lightTheme = createMuiTheme({
        palette: {
            type: "light",
            primary: {
                main: "#000",
            },
        },
    });

    const fetchSearch = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
                    process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumOfPages(data.total_pages);
            // console.log(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSearch();
    };

    useEffect(() => {
        window.scroll(0, 0);
        searchText && fetchSearch();
        return () => setContent([]);
        // eslint-disable-next-line
    }, [type, page]);

    if (loading) {
        return <SpinnerLoading loading={loading} />;
    }

    return (
        <div style={{ width: "100%" }}>
            {loading ? (
                <SpinnerLoading loading={loading} />
            ) : (
                <>
                    <ThemeProvider theme={theme === themeStyle.dark ? darkTheme : lightTheme}>
                        <form style={{ display: "flex", margin: "15px 0" }} onSubmit={handleSubmit}>
                            <TextField
                                style={{ flex: 1 }}
                                className="searchBox"
                                label="Search"
                                variant="filled"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <Button onClick={fetchSearch} variant="contained" style={{ marginLeft: 10 }}>
                                <SearchIcon fontSize="large" />
                            </Button>
                        </form>
                        <Tabs
                            value={type}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(event, newValue) => {
                                setType(newValue);
                                setPage(1);
                            }}
                            variant="fullWidth"
                            style={{ paddingBottom: 5 }}
                            aria-label="disabled tabs example"
                        >
                            <Tab style={{ width: "50%" }} label="Search Movies" />
                            <Tab style={{ width: "50%" }} label="Search TV Series" />
                        </Tabs>
                    </ThemeProvider>
                    <div className="trending">
                        {content &&
                            content.map((c) => (
                                <SingleContent
                                    key={c.id}
                                    id={c.id}
                                    poster={c.poster_path}
                                    title={c.title || c.name}
                                    date={c.first_air_date || c.release_date}
                                    media_type={type ? "tv" : "movie"}
                                    vote_average={c.vote_average}

                                    backdrop_path={c.backdrop_path}
                                    overview={c.overview}
                                />
                            ))}
                        {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
                    </div>
                </>
            )}
            {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
        </div>
    );
};

export default Search;
