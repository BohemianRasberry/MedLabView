import './App.css';
import { Routes, Route } from "react-router-dom"
import PageHome from './PageHome'
import PageLogin from './PageLogin'

function App() {
  return (
    <div>
      <Routes><Route path="/" element={<PageLogin/>}/></Routes>
      <Routes><Route path="/login" element={<PageLogin/>}/></Routes>
      <Routes><Route path="/home" element={<PageHome/>}/></Routes>
    </div>
  );
}

export default App;
