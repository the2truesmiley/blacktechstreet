import { describe, it, expect } from "vitest";
import { getPaper, paperPath } from "@/data/thoughtLeadership";

describe("Value-Native AI paper", () => {
  it("lives at the permanent op-ed URL", () => {
    expect(paperPath("value-native-ai")).toBe("/thought-leadership/value-native-ai");
    expect(getPaper("value-native-ai")).toBeDefined();
  });

  it("credits the founder with his full designation", () => {
    const p = getPaper("value-native-ai")!;
    expect(`${p.author}, ${p.authorTitle}`).toBe("Tyrance Billingsley II, Founder & CEO");
  });

  it("points to the SSRN record 7621738", () => {
    const p = getPaper("value-native-ai")!;
    expect(p.doi).toBe("10.2139/ssrn.7621738");
    expect(p.ssrnUrl).toContain("abstract_id=7621738");
  });
});
