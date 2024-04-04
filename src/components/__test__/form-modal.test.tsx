import { describe, expect, test } from "@jest/globals";
import { fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import FormModal from "../form-modal";

describe("Form Modal", () => {
  it("Form modal renders correctly", () => {
    const tree = renderer
      .create(<FormModal isVisible={true} onClose={() => {}} isEdit={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
