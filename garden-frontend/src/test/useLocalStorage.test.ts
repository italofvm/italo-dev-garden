import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "../hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("retorna o valor inicial quando a chave não existe", () => {
    const { result } = renderHook(() => useLocalStorage("tema", "dark"));
    expect(result.current[0]).toBe("dark");
  });

  it("persiste o valor no localStorage ao setar", () => {
    const { result } = renderHook(() => useLocalStorage("tema", "dark"));

    act(() => {
      result.current[1]("light");
    });

    expect(result.current[0]).toBe("light");
    expect(localStorage.getItem("tema")).toBe('"light"');
  });

  it("recupera valor já existente no localStorage", () => {
    localStorage.setItem("tema", '"light"');
    const { result } = renderHook(() => useLocalStorage("tema", "dark"));
    expect(result.current[0]).toBe("light");
  });

  it("aceita função atualizadora como valor", () => {
    const { result } = renderHook(() => useLocalStorage("contador", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });
});
