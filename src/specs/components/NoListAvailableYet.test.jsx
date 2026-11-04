import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import NoListAvailableYet from "../../components/NoListAvailableYet";

vi.mock("../../components/Button/RoundedButton", () => ({
  default: ({ text, testId, onClick }) => (
    <button data-testid={testId} onClick={onClick}>
      {text}
    </button>
  ),
}));

describe("NoListAvailableYet", () => {
  const baseProps = {
    imageSrc: "/assets/svg/Plus_White.svg",
    title: "No Projects yet",
    description:
      "Looks like you haven’t created any projects yet. Create your first project to get started.",
  };

  it("renders with one button", () => {
    const onClickMock = vi.fn();

    render(
      <NoListAvailableYet
        {...baseProps}
        buttons={[{ title: "Create Project", onClick: onClickMock }]}
      />
    );

    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
    expect(screen.getByAltText("No Projects")).toHaveAttribute(
      "src",
      "/assets/svg/Plus_White.svg"
    );

    const button = screen.getByTestId("left-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Create Project");

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders with two buttons", () => {
    const onClickMock1 = vi.fn();
    const onClickMock2 = vi.fn();

    render(
      <NoListAvailableYet
        {...baseProps}
        buttons={[
          { title: "Create Project", onClick: onClickMock1 },
          { title: "Import Project", onClick: onClickMock2 },
        ]}
      />
    );

    const leftButton = screen.getByTestId("left-button");
    const rightButton = screen.getByTestId("right-button");

    expect(leftButton).toHaveTextContent("Create Project");
    expect(rightButton).toHaveTextContent("Import Project");

    fireEvent.click(leftButton);
    fireEvent.click(rightButton);

    expect(onClickMock1).toHaveBeenCalledTimes(1);
    expect(onClickMock2).toHaveBeenCalledTimes(1);
  });
});
