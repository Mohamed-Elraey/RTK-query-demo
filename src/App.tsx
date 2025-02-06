import "./App.css";
import NavBar from "./components/NavBar";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CardContainer from "./components/CardContainer";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <CardContainer></CardContainer>
    </Provider>
  );
}

export default App;
