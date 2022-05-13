import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import About from "./Components/About/About";
import New from "./Components/New/New";
import PinNews from "./Components/PinNews/PinNews";
import News from "./Components/News/News";
import NotFound from "./Components/NotFound/NotFound";
import NewPage from "./Components/NewPage/NewPage";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/news" element={<News />} />
          <Route path="/" element={<Navigate replace to="/news" />} />
          <Route path="/news/:id" element={<NewPage />} />  
          <Route path="/about" element={<About />} />
          <Route path="/bookmarks" element={<PinNews />} />   
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
