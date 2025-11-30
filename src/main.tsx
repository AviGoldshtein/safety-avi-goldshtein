import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { ThemeModeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')!).render(
  <ThemeModeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeModeProvider>
)
