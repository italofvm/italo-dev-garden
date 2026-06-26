import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "../hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("uses initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("loads value from localStorage when available", () => {
    window.localStorage.setItem("test-key", JSON.stringify("persisted"));
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("persisted");
  });

  it("updates state and localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(window.localStorage.getItem("test-key")).toBe(
      JSON.stringify("updated"),
    );
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    act(() => {
      result.current[1]((prev) => `${prev}-fn`);
    });

    expect(result.current[0]).toBe("initial-fn");
    expect(window.localStorage.getItem("test-key")).toBe(
      JSON.stringify("initial-fn"),
    );
  });
});