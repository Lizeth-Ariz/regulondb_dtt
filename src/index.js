import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals"
// librerias
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider } from "@apollo/react-hooks";
import Client from "./conf/apollo/apollo_client";

import "./regulonDB_global.css";

const main = document.getElementById("root");
const renderOrHydrate = main.innerHTML.trim().length ? "hydrate" : "render";

ReactDOM[renderOrHydrate](
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ApolloProvider client={Client}>
          <App />
        </ApolloProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
  main
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
