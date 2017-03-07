'use strict';

const assert = require('assert');
const easta = require('../');

describe('easta', () => {
  it('is a function', () => {
    assert(typeof easta === 'function');
  });

  it('Narrow', () => {
    assert(easta('A') === 'Na');
  });

  it('Fullwidth', () => {
    assert(easta('Ａ') === 'F');
  });

  it('Wide', () => {
    assert(easta('あ') === 'W');
  });

  it('Halfwidth', () => {
    assert(easta('ｱ') === 'H');
  });

  it('Ambiguous', () => {
    assert(easta('α') === 'A');
  });

  it('Neutral', () => {
    assert(easta('À') === 'N');
  });
});
