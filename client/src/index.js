import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
