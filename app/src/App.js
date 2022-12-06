import {Route, Routes} from "react-router-dom";
import DiscordBot from "./components/DiscordBot";
import TwitterBot from "./components/TwitterBot";
import LiveFeed from "./components/LiveFeed";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Register from "./components/Register";
import React from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
      </Route>
      <Route path={"/discord"} element={<DiscordBot />}>

      </Route>
      <Route path={"/twitter"} element={<TwitterBot />}>

      </Route>
      <Route path={'/feed'} element={<LiveFeed />}>

      </Route>
      <Route path={"/settings"} element={<Settings />}>

      </Route>
      <Route path={"/login"} element={<Login />}>

      </Route>
      <Route path={"/register"} element={<Register />}>

      </Route>
      <Route path={"*"} element={<Dashboard />}></Route>
    </Routes>
  )
}