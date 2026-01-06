import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx';
import AboutPage from './components/AboutPage.jsx'; // About 頁面
import WorksPage from './components/WorksPage.jsx'; // Works 頁面
import WorksDetail from './components/WorksDetail.jsx'; // Works 頁面


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 使用 BrowserRouter 包裹應用程式 */}
    <BrowserRouter>
      <ScrollToTop />
      {/* 定義路由集合 */}
      <Routes>
        
        {/* '/' 路徑：指向 App 元件 (主頁) */}
        <Route path="/" element={<App />} /> 
        
        <Route path="/about" element={<AboutPage />} />
        <Route path="/works" element={<WorksPage />} />
        {/* 動態路由關鍵點：:id */}
        <Route path="/works/:id" element={<WorksDetail />} />
      
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
