import "@testing-library/jest-dom/vitest";

// ResizeObserver is not available in jsdom — required by react-compare-slider
if (typeof global.ResizeObserver === "undefined") {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
