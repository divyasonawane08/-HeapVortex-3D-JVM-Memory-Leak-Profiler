window.global = window;


import ReactDOM from "react-dom/client";
import App from "./App";
const oldWarn = console.warn;

console.warn = (...args) => {

  if (
    typeof args[0] === "string" &&
    args[0].includes(
      "THREE.Clock: This module has been deprecated"
    )
  ) {
    return;
  }

  oldWarn(...args);
};
const originalWarn = console.warn;

console.warn = (...args) => {

  if(
    args[0]?.includes(
      "THREE.Clock: This module has been deprecated"
    )
  ){
    return;
  }

  originalWarn(...args);
};
ReactDOM
.createRoot(
 document.getElementById("root")
)
.render(
 <App />
);