import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";
import "@testing-library/jest-dom";

import Example, { Basic as ExampleBasic } from "./Example.stories"; // 👈 Import the story and its metadata
import { expect } from "@storybook/test";

const BasicExample = composeStory(ExampleBasic, Example);

test("Checks if the Example component renders with children and triggers onClick", () => {
  render(<BasicExample {...ExampleBasic.args} />);

  const component = screen.getByText("positive-intentions");
  expect(component).toHaveTextContent("positive-intentions");

  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);

  // Adjust the assertion based on your actual implementation of the Example component
  // For example, you might want to check if the onClick function is called.
  // Example: expect(mockOnClick).toHaveBeenCalled();
});
