import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthProvider } from "./providers/AuthProvider";
import { RouterConfig } from "./RouterConfig";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <RouterConfig />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
