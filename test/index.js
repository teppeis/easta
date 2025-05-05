"use strict";

const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const easta = require("../");

describe("easta", () => {
  it("is a function", () => {
    assert.equal(typeof easta, "function");
  });

  it("Narrow", () => {
    assert.equal(easta("A"), "Na");
  });

  it("Fullwidth", () => {
    assert.equal(easta("Ａ"), "F");
  });

  it("Wide", () => {
    assert.equal(easta("あ"), "W");
  });

  it("Halfwidth", () => {
    assert.equal(easta("ｱ"), "H");
  });

  it("Ambiguous", () => {
    assert.equal(easta("α"), "A");
  });

  it("Neutral", () => {
    assert.equal(easta("À"), "N");
  });

  it("Out of range", () => {
    assert.equal(easta("\u{40000}"), "N");
    assert.equal(easta("\u{50000}"), "N");
    assert.equal(easta("\u{60000}"), "N");
  });

  it("all", () => {
    assert.equal(easta("\u{0}"), "N");
    assert.equal(easta("\u{1}"), "N");
    assert.equal(easta("\u{2}"), "N");
    assert.equal(easta("\u{3}"), "N");
    assert.equal(easta("\u{4}"), "N");
    assert.equal(easta("\u{1F}"), "N");
    assert.equal(easta("\u{20}"), "Na");
    assert.equal(easta("\u{21}"), "Na");
    assert.equal(easta("\u{23}"), "Na");
    assert.equal(easta("\u{24}"), "Na");
  });

  it("Unicode 10.0.0", () => {
    // FLYING SAUCER
    assert.equal(easta("\u{1F6F8}"), "W");
  });

  it("Unicode 11.0.0", () => {
    // RACOON
    assert.equal(easta("\u{1F99D}"), "W");
  });

  it("Unicode 12.0.0", () => {
    // CHAIR
    assert.equal(easta("\u{1FA91}"), "W");
  });

  it("Unicode 12.1.0", () => {
    // REIWA
    assert.equal(easta("\u{32FF}"), "W");
  });

  it("Unicode 13.0.0", () => {
    // SEAL
    assert.equal(easta("\u{1F9AD}"), "W");
  });

  it("Unicode 14.0.0", () => {
    // TROLL
    assert.equal(easta("\u{1F9CC}"), "W");
  });

  it("Unicode 15.0.0", () => {
    // Shaking Face
    assert.equal(easta("\u{1FAE8}"), "W");
  });

  it("Unicode 15.1.0", () => {
    // Ideographic subraction
    // See https://note.com/qvarie/n/ne4726d015431
    assert.equal(easta("\u{31EF}"), "W");
  });

  it("Unicode 16.0.0", () => {
    // HARP
    assert.equal(easta("\u{1FA89}"), "W");
  });
});
