import "@testing-library/jest-dom/vitest";

// ResizeObserver is not available in jsdom — required by react-compare-slider
if (typeof global.ResizeObserver === "undefined") {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// IntersectionObserver is not available in jsdom — required by motion whileInView
if (typeof global.IntersectionObserver === "undefined") {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
      void callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
    get root(): Element | Document | null { return null; }
    get rootMargin(): string { return "0px"; }
    get thresholds(): ReadonlyArray<number> { return []; }
  };
}
