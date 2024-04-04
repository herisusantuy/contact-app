import { describe, expect, test } from "@jest/globals";
import { fireEvent } from "@testing-library/react-native";
import FloatingButton from "../floating-button";
import { renderWithProviders } from "../../utils/test-utils";
import { testID } from "../../utils/constants";

describe("Floating Button", () => {
  it("Should render Pressable view", () => {
    const { getByTestId } = renderWithProviders(
      <FloatingButton onPress={() => console.log("Button press!")} />
    );
    const pressableView = getByTestId(testID.pressableView);

    expect(pressableView).toBeTruthy();
  });
  it("Button call onPress function when it is pressed.", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = renderWithProviders(
      <FloatingButton onPress={mockOnPress} />
    );
    const pressableView = getByTestId(testID.pressableView);
    fireEvent.press(pressableView);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it("Floating button render correctly..", () => {
    const mockOnPress = jest.fn();
    const tree = renderWithProviders(
      <FloatingButton onPress={mockOnPress} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
