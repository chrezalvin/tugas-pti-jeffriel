import React from 'react';
import ReactDOM from 'react-dom';
import "./bootstrap.css";
// import './bootstrap5/js/bootstrap.js';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>

  <body className="d-flex flex-column gap-2">
    <header className="navbar navbar-light bg-info">
        <div className="container-fluid justify-content-center">
            <div className="icon d-flex flex-column">
                <div className="img d-flex justify-content-center">
                    <img 
                      src={`${process.env.PUBLIC_URL}/assets/icons/trophy.svg`} 
                      alt="" 
                      style={{height: "52px"}}
                    />
                </div>
                <div className="title container-fluid justify-content-center">
                    <div className="wrapper">7 days student</div>
                </div>
            </div>
        </div>
    </header>
    <App/>
    </body>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
