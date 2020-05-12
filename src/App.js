import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import YaziListesi from "./components/YaziListesi";
import YaziDetayi from "./components/YaziDetayi";

function App() {
  return (
    <Router>
      <div className="main_wrapper">
        <header></header>
        <div className="ui raised very padded text container segment">
          <Route path="/" exact component={YaziListesi} />
          <Route path="/posts/:id" component={YaziDetayi} />
        </div>
      </div>
    </Router>
  );
}

export default App;
