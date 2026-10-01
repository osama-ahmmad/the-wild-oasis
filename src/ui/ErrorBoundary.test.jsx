import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ErrorBoundary from "./ErrorBoundary";

function BrokenComponent() {
  throw new Error("Test failure");
}

function HealthyComponent() {
  return <p>Application recovered</p>;
}

describe("ErrorBoundary", () => {
  let consoleError;

  beforeEach(() => {
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it("shows the fallback when a child throws", () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Test failure")).toBeInTheDocument();
  });

  it("retries rendering children after clicking Try again", () => {
    let shouldThrow = true;

    function RecoverableComponent() {
      if (shouldThrow) throw new Error("Temporary failure");
      return <HealthyComponent />;
    }

    const { rerender } = render(
      <ErrorBoundary>
        <RecoverableComponent />
      </ErrorBoundary>,
    );

    shouldThrow = false;
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    rerender(
      <ErrorBoundary>
        <RecoverableComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Application recovered")).toBeInTheDocument();
  });
});
