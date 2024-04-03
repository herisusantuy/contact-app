import {
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import FloatingButton from "../components/floating-button";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import CardContact from "../components/card-contact";
import { getContactsAction } from "../redux/action/contactAction";

export default function Home() {
  const { contacts, loading, error } = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getContacts = async () => {
      const res = await dispatch(getContactsAction());
    };
    getContacts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.spinner} />
      ) : (
        <FlatList
          data={contacts}
          renderItem={({ item }) => <CardContact contact={item} />}
          keyExtractor={(item) => item.id}
        />
      )}

      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  spinner: {
    marginTop: 20,
  },
});
