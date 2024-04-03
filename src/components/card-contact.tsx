import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { IContact } from "../redux/types";

interface CardContactProps {
  contact: IContact;
}
export default function CardContact(props: CardContactProps) {
  const { firstName, lastName, photo, age } = props.contact;
  const imageUrl =
    photo == "N/A"
      ? `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&size=250`
      : photo;
  const fullname = `${firstName} ${lastName}`;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        width={50}
        height={50}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textName}>{fullname}</Text>
        <Text style={styles.textAge}>Age: {age}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
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
});
