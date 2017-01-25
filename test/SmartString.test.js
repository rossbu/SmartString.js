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

        describe('- Mocha/Chai simple test', () => {
            it('should be a dumb testing ', () => {
                expect(true).to.be.true;
                expect(true).to.been.true;
            });
        });

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

        describe('- decodeHTMLEntities()', function() {
            it('should decode HTML entities into their proper string representation', function() {
                EQ(SS('Tianshi &amp; Bu').decodeHTMLEntities().s, 'Tianshi & Bu');
                EQ(SS('0 &lt; 1').decodeHTMLEntities().s, '0 < 1');
                EQ(SS('http:&#47;&#47;').decodeHTMLEntities().s, 'http://')
            });
        });
        describe('- valueOf()', function() {
            it('should return the primitive value of the string, wraps native valueOf()', function() {
                T(SS('hi').valueOf() === 'hi');
                expect(SS('shouldbeaequialstring').valueOf()).to.eql('shouldbeaequialstring');

            });
        });


        describe('- toString()', function() {
            it('should return the native string', function() {
                T(SS('hi').toString() === 'hi');
                T(SS('hi').toString() === SS('hi').s);
            });
        });

        describe('- toISOString', function() {
            it('should return ISO string for a valid date string', function() {
                var dateStr = '18 July 2016 23:58:58 UTC';
                var iso = '2016-07-18T23:58:58.000Z';
                EQ(iso, SS(dateStr).toISOString());
                assert.equal(iso, SS(dateStr).toISOString());
            });
        });


        describe('- titleCase()', function() {
            it('should upperCase all words in a camel cased string', function() {
                EQ(SS('dataRate').titleCase().s, 'DataRate')
                EQ(SS('CarSpeed').titleCase().s, 'CarSpeed')
                EQ(SS('yesWeCan').titleCase().s, 'YesWeCan')
                EQ(SS('backgroundColor').titleCase().s, 'BackgroundColor')
            });
            it('should upperCase all words in a string with spaces, underscores, or dashes', function() {
                EQ(SS('Like ice in the sunshine').titleCase().s, 'Like Ice In The Sunshine')
                EQ(SS('data_rate').titleCase().s, 'Data_Rate')
                EQ(SS('background-color').titleCase().s, 'Background-Color')
                EQ(SS('-moz-something').titleCase().s, '-Moz-Something')
                EQ(SS('_car_speed_').titleCase().s, '_Car_Speed_')
                EQ(SS('yes_we_can').titleCase().s, 'Yes_We_Can')
            });
            it('can be combined with humanize to create nice titles out of ugly developer strings', function() {
                EQ(SS('   capitalize dash-CamelCase_underscore trim  ').humanize().titleCase().s, 'Capitalize Dash Camel Case Underscore Trim')
            });
            it('does not fail on edge cases', function() {
                EQ(SS('').titleCase().s, '')
                EQ(SS(null).titleCase().s, null)
                EQ(SS(undefined).titleCase().s, undefined)
            });
        });


        describe('- safer upperCase ', () => {
            it('should return upperCase-ed string', function() {
                EQ('ABC', SS('abc').upperCase().s);
            });
        });
    });
}).call(this);