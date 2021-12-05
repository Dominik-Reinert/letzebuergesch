import * as React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Background } from "./background/background";
import { ClearStyles } from "./clear_styles/clear_styles";
import "./i18n";
import { Navbar } from "./navbar/navbar";
import { ArtikeleMatchenPage } from "./pages/artikele_matchen/artikele_matchen_page";
import { HomePage } from "./pages/home/home";
import { Routes } from "./routes/routes";
import { defaultStyles, styleContext } from "./style_context/style_context";

function App() {
  return (
    <styleContext.Provider value={defaultStyles}>
      <ClearStyles>
        <Background>
          <HashRouter>
            <Navbar />
            <Switch>
              <Route path={Routes.ARTIKELE_MATCHEN}>
                <ArtikeleMatchenPage />
              </Route>
              <Route path={Routes.HOME}>
                <HomePage />
              </Route>
              <Route path={"/"}>
                <Redirect to={Routes.HOME} />
              </Route>
            </Switch>
          </HashRouter>
        </Background>
      </ClearStyles>
    </styleContext.Provider>
  );
}

export default App;
