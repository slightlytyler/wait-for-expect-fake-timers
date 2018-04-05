import React from "react";
import { render, Simulate, wait } from "react-testing-library";
import "react-testing-library/extend-expect";
import SlowSearchBox from "./SlowSearchBox";

// This test fails without fake timers due to long debounce.
// It passes if you lower the debounce and remove the fake timers.
// Would be awesome if we could keep using fake timers AND wait ^^
jest.useFakeTimers();

describe("SlowSearchBox", () => {
  it("should show results", async () => {
    const { getByTestId } = render(<SlowSearchBox />);
    Simulate.change(getByTestId("input"), {
      target: {
        value: "baco"
      }
    });
    jest.runAllTimers();
    await wait(() => expect(getByTestId("result-list")).toBeInTheDOM());
    await wait(() => expect(getByTestId("result-item")).toBeInTheDOM());
    await wait(() =>
      expect(getByTestId("result-list")).toHaveTextContent("🥓")
    );
  });
});
