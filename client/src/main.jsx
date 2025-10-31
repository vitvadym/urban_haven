import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
// import { saveData } from './utils/browserStorage.js';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

// store.subscribe(() => {
//   saveData(store.getState());
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>,
);
