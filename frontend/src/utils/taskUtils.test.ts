import { hasTitle } from "./taskUtils";
import {test, expect} from "@jest/globals";

test("returns false when title is empty", () => {
    expect(hasTitle("")).toBe(false);
});

test("returns true when title has text", () => {
    expect(hasTitle("My task")).toBe(true);
});

test("returns false when title only has spaces", () => {
    expect(hasTitle("")).toBe(false);
});

