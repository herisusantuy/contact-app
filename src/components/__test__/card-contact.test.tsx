import { describe, expect, test } from "@jest/globals";
import CardContact from "../card-contact";
import { renderWithProviders } from "../../utils/test-utils";
import { testID } from "../../utils/constants";

describe("Testing Card ", () => {
  it("Should render Swipeable Wrapper, Photo Profile, Fullname Text and Age text", () => {
    const dummy = {
      firstName: "Bilbo",
      lastName: "Baggins",
      age: 111,
      photo:
        "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
      id: "cb41c300-f1c5-11ee-8e3f-71d14f52ed26",
    };

    const { getByTestId } = renderWithProviders(
      <CardContact contact={dummy} />
    );
    const swipeableWrapper = getByTestId(testID.swipeableWrapper);
    const photoProfile = getByTestId(testID.photoProfile);
    const fullnameText = getByTestId(testID.fullnameText);
    const ageText = getByTestId(testID.ageText);

    expect(swipeableWrapper).toBeTruthy();
    expect(photoProfile).toBeTruthy();
    expect(fullnameText).toBeTruthy();
    expect(ageText).toBeTruthy();
  });
});
