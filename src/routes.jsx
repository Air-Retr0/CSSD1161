import Home from "./pages/home";
import Docs from "./pages/docs";
import Lost from "./pages/lost";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from "./pages/about";
import Login from "./components/login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="docs" element={<Docs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Lost />} />
      </Routes>
    </BrowserRouter>
  )
}