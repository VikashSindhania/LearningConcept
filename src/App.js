import React from "react";
import RoutingPath from "./components/RoutingPath";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RoutingPath />
      </Provider>
    </>
  );
}

export default App;
