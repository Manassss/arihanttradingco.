import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { useContext } from 'react';
import Navbar from './components/navbar';
import { LanguageContext } from './contexts/LanguageContext';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';


function App() {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login"  element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;