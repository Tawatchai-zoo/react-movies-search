import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
// eslint-disable-next-line
import { img_300, img_500, unavailable, unavailableLandscape } from "../../config/config";
import "./ContentModal.css";
import { Button, Modal, Fade, Backdrop } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";
// import SpinnerLoading from "../../SpinnerLoading";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "90%",
        height: "80%",
        // backgroundColor: "#39445a",
        backgroundColor: "#333",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));

export default function TransitionsModal({ children, id, poster, title, date, media_type, vote_average, backdrop_path, overview }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({ children, id, poster, title, date, media_type, vote_average, backdrop_path, overview });
    const video = useRef("");
    // const [video, setVideo] = useState();
    // const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        // setLoading(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    // *****old version have to fetch api too many time
    // const fetchData = async () => {
    //     setLoading(true);
    //     const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

    //     setContent(data);
    //     // console.log(data);
    //     setLoading(false);
    // };

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        // setVideo(data.results[0]?.key);
        video.current = data.results[0]?.key;
    };

    useEffect(() => {
        // fetchData();
        fetchVideo();
        return () => {
            setContent([]);
        };
        // eslint-disable-next-line
    }, []);

    // if (loading) return <SpinnerLoading />;

    return (
        <>
            <div className="media" style={{ cursor: "pointer" }} color="inherit" onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className="ContentModal">
                                <div className="close-btn-container" onClick={handleClose}>
                                    <span className="sample-1-close"></span>
                                </div>

                                <LazyLoadImage
                                    // LazyLoadImage is img its will show when modal is showing/on view port
                                    style={{ width: "100%" }}
                                    // This mean if modal is not showing it will no set src location
                                    src={open ? (content.poster ? `${img_500}/${content.poster}` : unavailable) : ""}
                                    alt={content.name || content.title}
                                    className="ContentModal__portrait"
                                    effect="blur"
                                    // beforeLoad={setLoading(true)}
                                    // afterLoad={setLoading(false)}
                                />
                                <LazyLoadImage
                                    style={{ width: "100%" }}
                                    src={open ? (content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape) : ""}
                                    alt={content.name || content.title}
                                    className="ContentModal__landscape"
                                    effect="blur"
                                />
                                {/* <img
                                    // Old img version
                                    src={content.poster ? `${img_500}/${content.poster}` : unavailable}
                                    alt={content.name || content.title}
                                    className="ContentModal__portrait"
                                    onLoad={() => console.log("loaded")}
                                />
                                <img
                                    src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                                    alt={content.name || content.title}
                                    className="ContentModal__landscape"
                                    onLoad={() => console.log("loaded")}
                                /> */}
                                <div className="ContentModal__about">
                                    <span className="ContentModal__title">
                                        {content.name || content.title} ({(content.date || "-----").substring(0, 4)})
                                    </span>
                                    {content.tagline && <i className="tagline">{content.tagline}</i>}

                                    <span className="ContentModal__description">{content.overview}</span>

                                    <div>
                                        <Carousel id={id} media_type={media_type} open={open} />
                                    </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<YouTubeIcon />}
                                        // color="secondary"
                                        style={{backgroundColor: 'red', color: '#fff'}}
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video.current}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}
