import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx';
import AboutPage from './components/AboutPage.jsx'; // About 頁面

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 使用 BrowserRouter 包裹應用程式 */}
    <BrowserRouter>
      <ScrollToTop />
      {/* 定義路由集合 */}
      <Routes>
        
        {/* '/' 路徑：指向 App 元件 (主頁) */}
        <Route path="/" element={<App />} /> 
        
        {/* '/about' 路徑：指向 AboutPage 元件 (新的 About 頁面) */}
        <Route path="/about" element={<AboutPage />} />
        
        {/* 您可以添加其他路由，例如 /works, /contact 等 */}
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
