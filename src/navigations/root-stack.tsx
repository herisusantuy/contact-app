import React, { FC } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

import Home from "../screens/Home";

export type RootStackParam = {
  Home: undefined;
};

export type ScreenProps<T extends keyof RootStackParam> = FC<
  NativeStackScreenProps<RootStackParam, T>
>;

export type ScreenNavigationProps = NativeStackNavigationProp<RootStackParam>;

const Stack = createNativeStackNavigator<RootStackParam>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: "Contacts",
          headerTitleAlign: "left",
        })}
      />
    </Stack.Navigator>
  );
};

const RootStackNavigator = () => (
  <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>
);

export default RootStackNavigator;
