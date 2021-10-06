import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);

reportWebVitals();
