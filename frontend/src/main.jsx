import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './main.css';

const viewPort = document.getElementById('root');
const root = createRoot(viewPort);
root.render(<App />);
