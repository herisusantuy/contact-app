import {
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FloatingButton from "../components/floating-button";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import CardContact from "../components/card-contact";
import { getContactsAction } from "../redux/action/contactAction";
import FormModal from "../components/form-modal";
import { IContact, TContactBody } from "../redux/types";

export default function Home() {
  const { contacts, isFetching, error } = useAppSelector(
    (state) => state.contact
  );
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

  const handleAddContact = () => {
    setIsEdit(false);
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
      {isFetching ? (
        <ActivityIndicator style={styles.spinner} />
      ) : (
        <FlatList
          testID=""
          data={contacts}
          renderItem={({ item }) => (
            <CardContact
              contact={item}
              onUpdateContact={() => handleUpdateContact(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Data contact is not available!
              </Text>
            </View>
          }
        />
      )}

      <FloatingButton onPress={handleAddContact} />
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
