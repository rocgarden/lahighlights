// lib/utils/phrasingForActivity.test.ts
import { describe, expect, it } from "vitest";
import { getPhrasingForActivity } from "./phrasingForActivity";

describe("getPhrasingForActivity", () => {
  it("returns correct phrase for known activity", () => {
    expect(getPhrasingForActivity("hike")).toBe("🥾 Explore with a nice ");
    expect(getPhrasingForActivity("lunch")).toBe("🍽️ Have a pleasant ");
  });

  it("returns default phrase for unknown activity", () => {
    expect(getPhrasingForActivity("dance")).toBe("🌍");
  });
});
