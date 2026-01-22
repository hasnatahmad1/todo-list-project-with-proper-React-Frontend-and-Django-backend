import { LoginPage } from './pages/loginpage/LoginPage';
import { Routes, Route } from 'react-router';
import './App.css'
import { RegisterPage } from './pages/registerpage/RegisterPage';
import { HomePage } from './pages/homepage/HomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  );
}

export default App
