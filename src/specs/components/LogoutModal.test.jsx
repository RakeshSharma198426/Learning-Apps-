import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LogoutModal from "../../components/Logout/LogoutModal";
import { LocaleStrings } from "../../constants/locale-strings";

vi.mock("@mui/material", async () => {
  const mod = await vi.importActual("@mui/material");
  return {
    ...mod,
    Dialog: ({ open, children }) => (open ? <div>{children}</div> : null),
  };
});

describe("LogoutModal", () => {
  const mockOnClose = vi.fn();
  const mockOnLogout = vi.fn();
  const { logoutModal } = LocaleStrings;

  const renderModal = (open = true) =>
    render(
      <LogoutModal open={open} onClose={mockOnClose} onLogout={mockOnLogout} />
    );

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnLogout.mockClear();
  });

  it("renders modal title correctly", () => {
    renderModal();
    expect(screen.getByText(logoutModal.title)).toBeInTheDocument();
  });

  it("renders both buttons with correct labels", () => {
    renderModal();
    expect(screen.getByText(logoutModal.primaryButtonText)).toBeInTheDocument();
    expect(
      screen.getByText(logoutModal.secondaryButtonText)
    ).toBeInTheDocument();
  });

  it("calls onLogout when primary button is clicked", () => {
    renderModal();
    const primaryButton = screen.getByTestId("left-button");
    fireEvent.click(primaryButton);
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when secondary button is clicked", () => {
    renderModal();
    const secondaryButton = screen.getByTestId("right-button");
    fireEvent.click(secondaryButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close icon is clicked", () => {
    renderModal();
    const closeIcon = screen.getByAltText("Close");
    fireEvent.click(closeIcon);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not render modal when open is false", () => {
    renderModal(false);
    expect(screen.queryByText(logoutModal.title)).not.toBeInTheDocument();
  });
});
