import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
    // const handlePageChange = (page) => {
    //     console.log(page);
    //     setPage(page);
    //     window.scroll(0, 0);
    // };
    const handlePageChange = (event, value) => {
        // console.log(value);
        setPage(value);
        window.scroll(0, 0);
    };

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
            }}
        >
            <ThemeProvider theme={darkTheme}>
                <Pagination count={numOfPages} onChange={handlePageChange} />
            </ThemeProvider>
        </div>
    );
};

export default CustomPagination;
