import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProps } from "../navigations/root-stack";

interface FloatingButtonProps {
  onPress: () => void;
}
const FloatingButton = ({ onPress }: FloatingButtonProps) => {
  const navigation = useNavigation<ScreenNavigationProps>();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
