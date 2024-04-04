import * as React from "react";
import { screen, render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import RootStackNavigator from "../root-stack";
import { renderWithProviders } from "../../utils/test-utils";

test("Show Home screen.", () => {
  const tree = renderWithProviders(<RootStackNavigator />).toJSON();
  expect(tree).toMatchSnapshot();
});
