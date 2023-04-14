import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Home component", () => {
  const navigateMock = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigateMock);

  it("renders the emoji picker", () => {
    render(<Home />);
    const title = screen.getByText("Pick a emoji");
    expect(title).toBeInTheDocument();
  });
});
