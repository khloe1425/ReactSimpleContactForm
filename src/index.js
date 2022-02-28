import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic';
const options = {
  position: positions.MIDDLE,
  timeout: 1000,
  offset: '150px',
  //margin offet
  transition: transitions.SCALE,
}
const AlertTemplate = ({style, message}) => (
  <div className="alert alert-primary p-2" style={style}>{message}</div>
);

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
