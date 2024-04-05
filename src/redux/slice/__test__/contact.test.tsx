import axios from "axios";
import { UnknownAction } from "redux";
import configureStore, { MockStoreCreator } from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { getContactsAction } from "../../action/contactAction";
import contactSlice from "../contact";

type RootState = any;
const middlewares = [thunk];
type DispatchExts = ThunkDispatch<RootState, undefined, UnknownAction>;
const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> =
  configureStore<RootState, DispatchExts>(middlewares as any);

describe("Successfully call API.", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("Should return array of contacts.", async () => {
    const mockGet = jest.spyOn(axios, "get");
    const mockGetResponse = {
      message: "Get contacts",
      data: [
        {
          id: "93ad6070-c92b-11e8-b02f-cbfa15db428b",
          firstName: "Bilbo",
          lastName: "Baggins",
          age: 111,
          photo:
            "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
        },
        {
          id: "b3abd640-c92b-11e8-b02f-cbfa15db428b",
          firstName: "Luke",
          lastName: "Skywalker",
          age: 20,
          photo: "N/A",
        },
      ],
    };

    mockGet.mockImplementation(() =>
      Promise.resolve({ data: mockGetResponse.data })
    );
    const store = mockStoreCreator();
    const response = await store.dispatch(getContactsAction());
    const state = contactSlice(store.getState(), {
      type: response.type,
      payload: response.payload,
    });
    expect(response.type).toBe("getContactsAction.fulfilled");
    expect(response.payload.length).toBe(2);
    expect(state.contacts).toEqual(mockGetResponse.data);
  });
});
