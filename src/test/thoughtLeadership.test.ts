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

import { library, visibleFilters, filterLibrary, placeholderCount, type LibraryItem } from "@/data/thoughtLeadership";

const item = (type: LibraryItem["type"]): LibraryItem => ({
  title: "t", author: "a", date: "2026-01-01", type, summary: "s", href: "/x",
});

describe("Thought Leadership library", () => {
  it("lists Value-Native AI as Tyrance's paper from October 16, 2026", () => {
    const p = library.find((i) => i.href === "/thought-leadership/value-native-ai")!;
    expect(p.type).toBe("Paper");
    expect(p.author).toBe("Tyrance Billingsley II");
    expect(p.date).toBe("2026-10-16");
  });

  it("fills the grid to 3 slots with Coming soon placeholders", () => {
    expect(placeholderCount(1)).toBe(2);
    expect(placeholderCount(0)).toBe(3);
    expect(placeholderCount(3)).toBe(0);
    expect(placeholderCount(5)).toBe(0);
  });

  it("hides filter chips that have no items yet", () => {
    expect(visibleFilters([item("Paper")])).toEqual(["All", "Papers"]);
    expect(visibleFilters([item("Paper"), item("Talk"), item("Article")])).toEqual(["All", "Papers", "Articles", "Talks"]);
  });

  it("filters the grid by type", () => {
    const items = [item("Paper"), item("Talk")];
    expect(filterLibrary(items, "Talks")).toHaveLength(1);
    expect(filterLibrary(items, "All")).toHaveLength(2);
  });
});
