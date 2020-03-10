"use strict";

const assert = require("assert");
const easta = require("../");

describe("easta", () => {
  it("is a function", () => {
    assert(typeof easta === "function");
  });

  it("Narrow", () => {
    assert(easta("A") === "Na");
  });

  it("Fullwidth", () => {
    assert(easta("Ａ") === "F");
  });

  it("Wide", () => {
    assert(easta("あ") === "W");
  });

  it("Halfwidth", () => {
    assert(easta("ｱ") === "H");
  });

  it("Ambiguous", () => {
    assert(easta("α") === "A");
  });

  it("Neutral", () => {
    assert(easta("À") === "N");
  });

  it("Out of range", () => {
    assert(easta("\u{40000}") === "N");
    assert(easta("\u{50000}") === "N");
    assert(easta("\u{60000}") === "N");
  });

  it("all", () => {
    assert(easta("\u{0}") === "N");
    assert(easta("\u{1}") === "N");
    assert(easta("\u{2}") === "N");
    assert(easta("\u{3}") === "N");
    assert(easta("\u{4}") === "N");
    assert(easta("\u{1F}") === "N");
    assert(easta("\u{20}") === "Na");
    assert(easta("\u{21}") === "Na");
    assert(easta("\u{23}") === "Na");
    assert(easta("\u{24}") === "Na");
  });

  it("Unicode 10.0.0", () => {
    // FLYING SAUCER
    assert(easta("\u{1F6F8}") === "W");
  });

  it("Unicode 11.0.0", () => {
    // RACOON
    assert(easta("\u{1F99D}") === "W");
  });

  it("Unicode 12.0.0", () => {
    // CHAIR
    assert(easta("\u{1FA91}") === "W");
  });

  it("Unicode 12.1.0", () => {
    // REIWA
    assert(easta("\u{32FF}") === "W");
  });

  it("Unicode 13.0.0", () => {
    // SEAL
    assert(easta("\u{1F9AD}") === "W");
  });
});
