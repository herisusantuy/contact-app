import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AddUpdateContact from "../screens/AddUpdateContact";
import Home from "../screens/Home";

export type RootStackParam = {
  Home: undefined;
  AddUpdate: undefined;
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
      <Stack.Screen
        name="AddUpdate"
        component={AddUpdateContact}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: "Add Contact",
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
