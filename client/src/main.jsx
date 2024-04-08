import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { AppContextProvider } from "./context/AppContext.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <AppContextProvider>
          <SocketProvider>
            <Router>
              <App />
            </Router>
          </SocketProvider>
        </AppContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
