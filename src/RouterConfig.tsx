import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { GameResultPage } from "./pages/GameResult";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route
        path="/game/result"
        element={<RequireAuth component={<GameResultPage />} />}
      />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
