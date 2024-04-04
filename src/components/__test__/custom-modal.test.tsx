import { describe, expect, test } from "@jest/globals";
import { Modal } from "../custom-modal";
import { renderWithProviders } from "../../utils/test-utils";
import { testID } from "../../utils/constants";

describe("Custom modal.", () => {
  it("Custom modal render correctly..", async () => {
    const mockOnBackdropPress = jest.fn();
    const tree = renderWithProviders(
      <Modal isVisible={true} onBackdropPress={mockOnBackdropPress}>
        <Modal.Header title="Header" />
      </Modal>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
