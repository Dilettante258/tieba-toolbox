import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from '@nextui-org/react';
import App from "./App";
import "./styles.css";
import NavigationHeader from "./components/NavigationHeader.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <NavigationHeader />
      <App />
    </NextUIProvider>
  </React.StrictMode>,
);
