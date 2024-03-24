import React from "react";
// import ReactDOM from "react-dom/client";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {NextUIProvider} from '@nextui-org/react';
import App from "./App";
import "./styles.css";
import NavigationHeader from "./components/NavigationHeader.tsx";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <NavigationHeader />
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
