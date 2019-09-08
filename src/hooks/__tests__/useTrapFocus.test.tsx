import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useTrapFocus } from "../useTrapFocus";
// import "@testing-library/jest-dom/extend-expect";

describe("useTrapFocus", () => {
  it("should focus on the container element if it is focusable", () => {
    function TestComponent() {
      const elementRef = useTrapFocus();
      return (
        <div ref={elementRef} id={"container"} tabIndex={-1}>
          <input id={"first-input"} type={"text"} />
          <button>submit</button>
        </div>
      );
    }
    const {
      queryByText,
      getByLabelText,
      getByText,
      baseElement,
      debug
    } = render(<TestComponent></TestComponent>);
    const activeElement = document.activeElement as HTMLElement;
    expect(activeElement.getAttribute("id")).toEqual("container");
  });
  it("should focus on the first focusable element if the container element is not focusable", () => {
    function TestComponent2() {
      const elementRef = useTrapFocus();
      return (
        <div ref={elementRef} id={"container"}>
          <input id={"first-input"} type={"text"} />
          <button>submit</button>
        </div>
      );
    }
    const {
      queryByText,
      getByLabelText,
      getByText,
      baseElement,
      debug
    } = render(<TestComponent2></TestComponent2>);
    const activeElement = document.activeElement as HTMLElement;
    expect(activeElement.getAttribute("id")).toEqual("first-input");
  });
});
