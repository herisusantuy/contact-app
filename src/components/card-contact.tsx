import { View, Text, Image, StyleSheet, Animated } from "react-native";
import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  Swipeable,
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { IContact } from "../redux/types";
import { useAppDispatch } from "../redux/store/hooks";
import {
  deleteContactAction,
  getContactsAction,
} from "../redux/action/contactAction";
import { testID } from "../utils/constants";

interface CardContactProps {
  contact: IContact;
  onUpdateContact?: () => void;
}
export default function CardContact(props: CardContactProps) {
  const { onUpdateContact } = props;
  const { id, firstName, lastName, photo, age } = props.contact;
  const dispatch = useAppDispatch();
  const imageUrl =
    photo == "N/A" || !photo.includes("http")
      ? `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&size=250`
      : photo;
  const fullname = `${firstName} ${lastName}`;

  const handleDeleteItem = async (id: string) => {
    const response = await dispatch(deleteContactAction(id));
    if (response.type === "deleteContactAction/fulfilled") {
      await dispatch(getContactsAction());
    }
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-50, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.swipedRow}>
        <Animated.View style={[styles.deleteButton, { opacity }]}>
          <TouchableOpacity onPress={onUpdateContact}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteItem(id)}>
            <Ionicons name="trash" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        testID={testID.swipeableWrapper}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: imageUrl }}
            width={50}
            height={50}
            resizeMode="cover"
            style={styles.image}
            testID={testID.photoProfile}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textName} testID={testID.fullnameText}>
              {fullname}
            </Text>
            <Text style={styles.textAge} testID={testID.ageText}>
              Age: {age}
            </Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingLeft: 5,
    marginVertical: 5,
    minHeight: 50,
  },
  textContainer: {
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  textName: {
    fontSize: 18,
    fontWeight: "600",
  },
  textAge: {
    fontSize: 14,
    fontWeight: "normal",
  },
  image: {
    borderRadius: 50,
    marginRight: 10,
  },
  swipedRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    justifyContent: "flex-end",
    width: 100,
  },
  deleteButton: {
    flexDirection: "row",
    height: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
  },
  deleteButtonText: {
    color: "#fcfcfc",
    fontWeight: "bold",
    padding: 3,
  },
});
