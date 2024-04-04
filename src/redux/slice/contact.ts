import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createContactAction,
  getContactsAction,
  getContactAction,
  deleteContactAction,
  updateContactAction,
} from "../action/contactAction";
import { ContactResponse, IContact } from "./../types";

interface InitialState {
  isFetching: boolean;
  isMutating: boolean;
  contacts: IContact[] | [];
  error: string;
  message: string;
}

export const initialState: InitialState = {
  isFetching: false,
  isMutating: false,
  contacts: [],
  error: "",
  message: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createContactAction.pending, (state, action) => {
      return {
        ...state,
        isFetching: true,
      };
    });
    builder.addCase(createContactAction.fulfilled, (state, action) => {
      return {
        ...state,
        isFetching: false,
        message: "Successfully create contact.",
      };
    });
    builder.addCase(createContactAction.rejected, (state, action) => {
      return {
        ...state,
        isFetching: false,
        error: "Failed to create contact.",
      };
    });

    builder.addCase(getContactsAction.pending, (state, action) => {
      return {
        ...state,
        isFetching: true,
      };
    });
    builder.addCase(
      getContactsAction.fulfilled,
      (state, action: PayloadAction<IContact[]>) => {
        return {
          ...state,
          isFetching: false,
          contacts: action.payload,
        };
      }
    );
    builder.addCase(getContactsAction.rejected, (state, action) => {
      return {
        ...state,
        isFetching: false,
        error: "Failed to get contacts.",
      };
    });

    builder.addCase(getContactAction.pending, (state, action) => {
      return {
        ...state,
        isFetching: true,
      };
    });
    builder.addCase(getContactAction.fulfilled, (state, action) => {
      return {
        ...state,
        isFetching: false,
        message: "Successfully get contact.",
      };
    });
    builder.addCase(getContactAction.rejected, (state, action) => {
      return {
        ...state,
        isFetching: false,
        error: "Failed to get contact!",
      };
    });

    builder.addCase(deleteContactAction.pending, (state, action) => {
      return {
        ...state,
        isMutating: true,
      };
    });
    builder.addCase(deleteContactAction.fulfilled, (state, action) => {
      return {
        ...state,
        isMutating: false,
        message: "Successfully delete contact.",
      };
    });
    builder.addCase(deleteContactAction.rejected, (state, action) => {
      return {
        ...state,
        isMutating: false,
        error: "Failed to delete contact!",
      };
    });

    builder.addCase(updateContactAction.pending, (state, action) => {
      return {
        ...state,
        isMutating: true,
      };
    });
    builder.addCase(updateContactAction.fulfilled, (state, action) => {
      return {
        ...state,
        isMutating: false,
        message: "Successfully update contact.",
      };
    });
    builder.addCase(updateContactAction.rejected, (state, action) => {
      return {
        ...state,
        isMutating: false,
        error: "Failed to update contact!",
      };
    });
  },
});
export const {} = contactSlice.actions;
export default contactSlice.reducer;
