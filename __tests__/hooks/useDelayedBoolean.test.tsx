// Tests for the useDelayedBoolean hook (app/admin/_components/useDelayedBoolean.ts).
//
// This hook delays a boolean from becoming true — useful for showing spinners
// only after a short pause so fast operations don't flash the UI.
//
// Testing hooks in isolation: React Testing Library provides renderHook(),
// which mounts a hook inside a tiny invisible component so we can observe
// its return value without building a real UI.
//
// Controlling time: instead of actually waiting 1000ms in the test, we use
// Jest's fake timers. Jest replaces setTimeout with its own version that we
// can advance manually — tests stay fast and deterministic.

import { renderHook, act } from "@testing-library/react";
import { useDelayedBoolean } from "@/app/admin/_components/useDelayedBoolean";

// beforeEach runs before every individual test in this file.
// We switch to fake timers so setTimeout calls don't use real wall-clock time.
beforeEach(() => {
  jest.useFakeTimers();
});

// afterEach runs after every test.
// Restoring real timers prevents fake-timer state from leaking into other test files.
afterEach(() => {
  jest.useRealTimers();
});

describe("useDelayedBoolean", () => {
  // ─── initial state ──────────────────────────────────────────────────────────

  it("returns false immediately when value starts as false", () => {
    // renderHook() mounts the hook and gives us result.current — the hook's
    // return value at any given moment.
    const { result } = renderHook(() => useDelayedBoolean(false, 1000));
    expect(result.current).toBe(false);
  });

  it("returns false immediately even when value starts as true (before delay)", () => {
    // The hook should NOT flip to true instantly — it waits for the timer.
    const { result } = renderHook(() => useDelayedBoolean(true, 1000));
    expect(result.current).toBe(false);
  });

  // ─── after the delay elapses ────────────────────────────────────────────────

  it("returns true after the delay has fully elapsed", () => {
    const { result } = renderHook(() => useDelayedBoolean(true, 1000));

    // act() tells React: "run this code and then flush all pending state updates."
    // jest.advanceTimersByTime() moves the fake clock forward by 1000ms,
    // which triggers the setTimeout callback inside the hook.
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });

  it("stays false if the timer hasn't fully elapsed yet", () => {
    const { result } = renderHook(() => useDelayedBoolean(true, 1000));

    act(() => {
      // Only advance 999ms — one millisecond short of the threshold.
      jest.advanceTimersByTime(999);
    });

    expect(result.current).toBe(false);
  });

  // ─── resetting ──────────────────────────────────────────────────────────────

  it("resets to false immediately when value switches back to false", () => {
    // rerender() lets us change the props passed to the hook between test steps.
    const { result, rerender } = renderHook(
      ({ value }) => useDelayedBoolean(value, 1000),
      { initialProps: { value: true } },
    );

    // First: advance time so the hook is in the "true" state.
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(true);

    // Now flip value to false — the hook must reset without waiting for a timer.
    rerender({ value: false });
    expect(result.current).toBe(false);
  });

  it("cancels the pending timer when value reverts to false before the delay", () => {
    // If the value flips back to false before the timer fires, the hook should
    // stay false even after we advance the clock — the timer was cancelled.
    const { result, rerender } = renderHook(
      ({ value }) => useDelayedBoolean(value, 1000),
      { initialProps: { value: true } },
    );

    // Flip back to false before the delay fires.
    rerender({ value: false });

    // Now advance past the original timer — it should have been cleared.
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(false);
  });

  // ─── custom delay ───────────────────────────────────────────────────────────

  it("respects a custom delay duration", () => {
    // The default is 1000ms, but callers can pass any delay they like.
    const { result } = renderHook(() => useDelayedBoolean(true, 500));

    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1); // now at 500ms exactly
    });
    expect(result.current).toBe(true);
  });
});
