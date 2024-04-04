import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { testID } from "../utils/constants";

interface FloatingButtonProps {
  onPress: () => void;
}
const FloatingButton = ({ onPress }: FloatingButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      testID={testID.pressableView}
    >
      <AntDesign name="plus" size={32} color="white" testID={testID.plusIcon} />
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
