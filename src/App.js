import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import { Movies, Trending, Series, Search } from "./pages";
import SimpleBottomNavigation from "./components/MainNav";
import "./App.css";
import ThemeContext, {themeStyle} from './themeContext'

function App() {
    const [theme, setTheme] = useState(themeStyle.dark);

    const toggleTheme = () => {
        if (theme === themeStyle.dark) setTheme(themeStyle.light)
        if (theme === themeStyle.light) setTheme(themeStyle.dark)
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <BrowserRouter>
                <Header />
                <div className="app" style={theme}>
                    <Container>
                        <Switch>
                            <Route path="/" component={Trending} exact />
                            <Route path="/movies" component={Movies} />
                            <Route path="/series" component={Series} />
                            <Route path="/Search" component={Search} />

                            {/* <Route path='/' exact>
                            <Trending content={content} setContent={setContent}/>
                        </Route>
                        <Route path='/movies'>
                            <Movies content={content} setContent={setContent}/>
                        </Route>
                        <Route path='/series'>
                            <Series content={content} setContent={setContent}/>
                        </Route>
                        <Route path='/Search'>
                            <Search content={content} setContent={setContent}/>
                        </Route> */}
                        </Switch>
                    </Container>
                </div>
                <SimpleBottomNavigation />
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export default App;
