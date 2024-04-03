import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import RootStackNavigator from "./src/navigations/root-stack";

export default function App() {
  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  );
}
