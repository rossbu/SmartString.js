(function() {
    'use strict';
    const assert = require('assert');
    var expect = require('chai').expect;

    var SS = null;

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        SS = require('../lib/SmartString');
    else {
        SS = window.SS;
    }

    function T(v) {
        if (!v) {
            throw new Error('Should be true.');
        }
    }

    function F(v) {
        if (v) {
            throw new Error('Should be false.');
        }
    }

    function EQ(v1, v2) {
        if (typeof require != 'undefined' && typeof process != 'undefined') //node
            require('assert').equal(v1, v2);
        else
            T(v1 === v2);
    }

    function ARY_EQ(a1, a2) {
        EQ(a1.length, a2.length)
        for (var i = 0; i < a1.length; ++i) {
            EQ(a1[i], a2[i]);
        }
    }

    /*
    if (typeof window !== "undefined" && window !== null) {
      S = window.S;
    } else {
      S = require('../lib/string');
    }*/

    describe('SmartString.js', function() {

        describe('- between(left, right)', function() {
            it('should extract string between `left` and `right`', function() {
                EQ(SS('<a>foo</a>').between('<a>', '</a>').s, 'foo')
                EQ(SS('<a>foo</a></a>').between('<a>', '</a>').s, 'foo')
                EQ(SS('<a><a>foo</a></a>').between('<a>', '</a>').s, '<a>foo')
                EQ(SS('<a>foo').between('<a>', '</a>').s, '')
                EQ(SS('Some strings } are very {weird}, dont you think?').between('{', '}').s, 'weird');
                EQ(SS('This is a test string').between('', 'test').s, 'This is a ');
                EQ(SS('This is a test1 string').between('test1').s, ' string');
            });
        });

        describe('- charAt(index)', function() {
            it('should return the right position/index of the string', function() {
                EQ('i', SS('hi').charAt(1));
            });
        });

        describe(' - toISOString', function() {
            it('should return ISO string for a valid date string', function() {
                var dateStr = '18 July 2016 23:58:58 UTC';
                var iso = '2016-07-18T23:58:58.000Z';
                EQ(iso, SS(dateStr).toISOString());
                assert.equal(iso, SS(dateStr).toISOString());
            });
        });

        describe(' - Mocha/Chai testing', () => {
            it('should be a dumb testing ', () => {
                expect(true).to.be.true;
                expect(true).to.been.false;
            });
        });

    });
}).call(this);