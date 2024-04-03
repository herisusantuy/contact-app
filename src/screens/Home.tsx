import {
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import FloatingButton from "../components/floating-button";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import CardContact from "../components/card-contact";
import { getContactsAction } from "../redux/action/contactAction";
import FormModal from "../components/form-modal";
import { IContact, TContactBody } from "../redux/types";

export default function Home() {
  const { contacts, loading, error } = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<IContact>();

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const res = await dispatch(getContactsAction());
  };

  const handleUpdateContact = (contact: IContact) => {
    setSelectedContact(contact);
    setIsEdit(true);
    setIsVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        isEdit={isEdit}
        contact={selectedContact}
      />
      {loading ? (
        <ActivityIndicator style={styles.spinner} />
      ) : (
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <CardContact
              contact={item}
              onUpdateContact={() => handleUpdateContact(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <FloatingButton onPress={() => setIsVisible(true)} />
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
