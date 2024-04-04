import { describe, expect, test } from "@jest/globals";
import renderer from "react-test-renderer";
import { Modal } from "../custom-modal";

describe("Custom Modal", () => {
  it("Custom modal renders correctly", () => {
    const tree = renderer
      .create(
        <Modal isVisible={true} onBackdropPress={() => {}}>
          <Modal.Header title="Modal Header" />
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
