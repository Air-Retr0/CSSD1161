import Home from "./pages/home";
import Docs from "./pages/docs";
import Login from "./pages/login";
import Lost from "./pages/lost";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="docs" element={<Docs />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Lost />} />
      </Routes>
    </BrowserRouter>
  )
}