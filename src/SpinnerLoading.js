import { css } from "@emotion/react";
// eslint-disable-next-line
import { ClipLoader, MoonLoader } from "react-spinners";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #36d7b7;
`;

// *** authernative without package  ***
// const override = {
//     display: 'block',
//     margin: '0 auto',
//     borderColor: '#36d7b7',
// }

const SpinnerLoading = ({ loading }) => {
    return (
        <div className="sweet-loading" style={{ margin: "auto", position: "fixed", left: "50%", top: "40%", transform: "translateX(-50%)" }}>
            <MoonLoader css={override} size={70} color={"#fff"} loading={loading} speedMultiplier={1} />
        </div>
    );
};

export default SpinnerLoading;
