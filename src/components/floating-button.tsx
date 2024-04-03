import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProps } from "../navigations/root-stack";

const FloatingButton = () => {
  const navigation = useNavigation<ScreenNavigationProps>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("AddUpdate")}
    >
      <AntDesign name="plus" size={32} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 100,
    right: 30,
    height: 70,
    backgroundColor: "green",
    borderRadius: 100,
  },
});

export default FloatingButton;
