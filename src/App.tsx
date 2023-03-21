import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthProvider } from "./providers/AuthProvider";
import { RouterConfig } from "./RouterConfig";
import { Footer } from "./components/Footer";

function App() {
  const styleCss = {
    minHeight: "100vh",
    position: "relative",
    paddingBottom: "30px",
  } as const;

  const Wrapper = ({ children }: any) => {
    return (
      <>
        <div style={styleCss}>{children}</div>
      </>
    );
  };

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Wrapper>
            <Header />
            <RouterConfig />
            <Footer />
          </Wrapper>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
