import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store, { persistor } from './Redux/store';

// import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </React.StrictMode> */}
    {/* </PersistGate> */}
  </Provider>
);

//* чтобы работал локальный стор, раскомменть 7, 11, 17
