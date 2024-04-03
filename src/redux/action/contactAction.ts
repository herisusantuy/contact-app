import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContact, TContactBody } from "../types";
import _ from "underscore";

const BASE_URL = "https://contact.herokuapp.com/contact";

export const createContactAction = createAsyncThunk(
  "createContactAction",
  async (contact: TContactBody, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, contact);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const getContactsAction = createAsyncThunk(
  "getContactsAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const getContactAction = createAsyncThunk(
  "getContactAction",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteContactAction = createAsyncThunk(
  "deleteContactAction",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(error.response);
    }
  }
);

export const updateContactAction = createAsyncThunk(
  "updateContactAction",
  async (contact: IContact, { rejectWithValue }) => {
    const contactBody = _.omit(contact, "id");
    try {
      const response = await axios.put(
        `${BASE_URL}/${contact.id}`,
        contactBody
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);
