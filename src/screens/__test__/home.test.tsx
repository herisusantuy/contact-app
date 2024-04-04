import { describe, expect, test } from "@jest/globals";
import renderer from "react-test-renderer";
import Home from "../Home";
import { renderWithProviders } from "../../utils/test-utils";

describe("Home", () => {
  it("Home renders correctly", () => {
    const tree = renderWithProviders(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
