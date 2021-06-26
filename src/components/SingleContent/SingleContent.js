import { Badge } from "@material-ui/core";
import React from "react";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SingleContent = ({ id, poster, title, date, media_type, vote_average, backdrop_path, overview }) => {

    return (
        <ContentModal
            id={id}
            media_type={media_type}
            poster={poster}
            title={title}
            date={date}
            vote_average={vote_average}
            backdrop_path={backdrop_path}
            overview={overview}
        >
            <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"} />
            <LazyLoadImage style={{width: '100%'}} className="poster" src={poster ? `${img_300}${poster}` : unavailable} alt={title} effect="blur"  />
            {/* <img className="poster" src={poster ? `${img_300}${poster}` : unavailable} alt={title} /> */}
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
        </ContentModal>
    );
};

export default SingleContent;
