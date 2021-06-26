import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SpinnerLoading from "../../SpinnerLoading";
import ThemeContext from "../../themeContext";

const Series = () => {
    const {theme} = useContext(ThemeContext)
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenres);
    const [loading, setLoading] = useState(false);
    // console.log(selectedGenres);

    const fetchMovies = async () => {
        setLoading(true);
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
        setLoading(false);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
        // eslint-disable-next-line
    }, [genreforURL, page]);

    // if (loading) {
    //     return (
    //         <SpinnerLoading loading={loading} />
    //     );
    // }

    return (
        <div>
            <span className="pageTitle" style={{color: theme.color, fontWeight: 700}}>TV Series</span>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            {loading ? (
                <SpinnerLoading loading={loading} />
            ) : (
                <>
                    <div className="trending">
                        {content &&
                            content.map((c) => (
                                <SingleContent
                                    key={c.id}
                                    id={c.id}
                                    poster={c.poster_path}
                                    title={c.title || c.name}
                                    date={c.first_air_date || c.release_date}
                                    media_type="tv"
                                    vote_average={c.vote_average}

                                    backdrop_path={c.backdrop_path}
                                    overview={c.overview}
                                />
                            ))}
                    </div>
                </>
            )}
            {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
        </div>
    );
};

export default Series;
