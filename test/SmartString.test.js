(function() {
    'use strict';

    var S = null;

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        S = require('../lib/string');
    else {
        S = window.S;
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
            require('assert').equal(v1, v2)
        else
            T(v1 === v2)
    }

    function ARY_EQ(a1, a2) {
        EQ(a1.length, a2.length)
        for (var i = 0; i < a1.length; ++i)
            EQ(a1[i], a2[i])
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
                EQ(S('<a>foo</a>').between('<a>', '</a>').s, 'foo')
                EQ(S('<a>foo</a></a>').between('<a>', '</a>').s, 'foo')
                EQ(S('<a><a>foo</a></a>').between('<a>', '</a>').s, '<a>foo')
                EQ(S('<a>foo').between('<a>', '</a>').s, '')
                EQ(S('Some strings } are very {weird}, dont you think?').between('{', '}').s, 'weird');
                EQ(S('This is a test string').between('test').s, ' string');
                EQ(S('This is a test string').between('', 'test').s, 'This is a ');
            });
        });
    });
}).call(this);