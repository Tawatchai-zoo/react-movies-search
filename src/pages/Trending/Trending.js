import axios from "axios";
import "./Trending.css";
import { useEffect, useState, useContext } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SpinnerLoading from "../../SpinnerLoading";
import ThemeContext from "../../themeContext";

const Trending = () => {
    const {theme} = useContext(ThemeContext)
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTrending = async () => {
        setLoading(true);
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        setContent(data.results);
        setLoading(false);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
        return () => setContent([]);
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            {loading ? (
                <SpinnerLoading loading={loading} />
            ) : (
                <>
                    <span className="pageTitle" style={{color: theme.color, fontWeight: 700}}>Trending Today</span>
                    <div className="trending">
                        {content &&
                            content.map((c) => (
                                <SingleContent
                                    key={c.id}
                                    id={c.id}
                                    poster={c.poster_path}
                                    title={c.title || c.name}
                                    date={c.first_air_date || c.release_date}
                                    media_type={c.media_type}
                                    vote_average={c.vote_average}

                                    backdrop_path={c.backdrop_path}
                                    overview={c.overview}
                                />
                            ))}
                    </div>
                </>
            )}
            <CustomPagination setPage={setPage} />
        </div>
    );
};

export default Trending;
