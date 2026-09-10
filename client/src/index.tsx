import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./App";
import { HashRouter } from "react-router-dom";

const container = document.getElementById("root");

if (!container) {
    throw new Error("Root container element '#root' not found");
}

const root = createRoot(container);
root.render(
    <HashRouter>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </HashRouter>
);  