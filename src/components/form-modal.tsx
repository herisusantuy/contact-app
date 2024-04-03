import React, { useEffect } from "react";
import { StyleSheet, Button, View, Image } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { Modal } from "./custom-modal";
import { IContact, TContactBody } from "../redux/types";
import FormTextField from "./form-text-field";
import { useAppDispatch } from "../redux/store/hooks";
import {
  createContactAction,
  getContactsAction,
  updateContactAction,
} from "../redux/action/contactAction";

interface FormModalProps {
  isVisible: boolean;
  onClose: () => void;
  contact?: IContact;
  isEdit?: boolean;
}

const FormModal = ({
  isVisible,
  onClose,
  isEdit = false,
  contact,
}: FormModalProps) => {
  const dispatch = useAppDispatch();
  const formMethods = useForm<TContactBody>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: String(0),
      photo:
        "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
    },
  });

  useEffect(() => {
    if (contact) {
      formMethods.reset({
        firstName: contact.firstName,
        lastName: contact.lastName,
        age: contact.age.toString(),
        photo: contact.photo,
      });
    }
  }, [contact]);

  const onSubmit = async (model: TContactBody) => {
    const newContact = model;
    newContact.photo =
      "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550";

    if (isEdit) {
      await handleUpdateContact(model);
    } else {
      await handleAddContact(newContact);
    }
  };

  const handleAddContact = async (model: TContactBody) => {
    const newModal = model;
    newModal.photo =
      "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550";

    const response = await dispatch(createContactAction(newModal));

    if (response.type === "createContactAction/fulfilled") {
      onClose();
      await dispatch(getContactsAction());
      formMethods.reset({
        firstName: "",
        lastName: "",
        age: "",
        photo: "",
      });
    }
  };

  const handleUpdateContact = async (model: TContactBody) => {
    const updatedContact: IContact = {
      ...model,
      id: contact?.id!,
    };
    const response = await dispatch(updateContactAction(updatedContact));

    if (response.type === "updateContactAction/fulfilled") {
      onClose();
      await dispatch(getContactsAction());
      formMethods.reset({
        firstName: "",
        lastName: "",
        age: "",
        photo: "",
      });
    }
  };

  const handleCancelButton = () => {
    onClose();
    formMethods.reset({
      firstName: "",
      lastName: "",
      age: "",
      photo: "",
    });
  };
  const modalTitle: string = isEdit ? "Edit Contact" : "Add Contact";
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <FormProvider {...formMethods}>
        <Modal.Container>
          <Modal.Header title={modalTitle} />
          <Modal.Body>
            <FormTextField
              name="firstName"
              style={styles.input}
              placeholder="First Name"
              rules={{
                required: "First name is required.",
              }}
              defaultValue={isEdit ? contact?.firstName : ""}
            />
            <FormTextField
              name="lastName"
              style={styles.input}
              placeholder="Last Name"
              rules={{
                required: "Last name is required.",
              }}
            />
            <FormTextField
              name="age"
              style={styles.input}
              placeholder="Age"
              keyboardType="number-pad"
              rules={{
                required: "Age is required.",
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <View style={{ flexDirection: "row" }}>
              <Button title="Cancel" onPress={handleCancelButton} color="red" />
              <Button
                title={
                  formMethods.formState.isSubmitting ? "Loading..." : "Save"
                }
                onPress={formMethods.handleSubmit(onSubmit)}
                disabled={formMethods.formState.isSubmitting}
                color="green"
              />
            </View>
          </Modal.Footer>
        </Modal.Container>
      </FormProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 8,
  },
});

export default FormModal;
