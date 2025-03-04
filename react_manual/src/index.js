import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot를 가져옵니다.
import App from './App';
const root = createRoot(document.getElementById('root')); // createRoot를 사용하여 루트를 생성합니다.
root.render(/*#__PURE__*/React.createElement(App, null)); // App 컴포넌트를 렌더링합니다.
