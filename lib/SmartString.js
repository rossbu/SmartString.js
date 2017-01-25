 !(function(undefined) {
     // begin
     "use strict";

     var VERSION = '1.0.0';

     var ENTITIES = {};

     var placeHolder = [];

     var WHITE_SPACES = [
         ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680', '\u180E',
         '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006',
         '\u2007', '\u2008', '\u2009', '\u200A', '\u2028', '\u2029', '\u202F',
         '\u205F', '\u3000'
     ];

     // from http://semplicewebsites.com/removing-accents-javascript
     var latin_map = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "ẞ": "SS", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ß": "ss", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };

     // F2  constructor: GO TO LINE 270: check Constructor setting which returns SS instance: new new this.constructor('xxx') could be used to return instance of SS
     function SS(s) {
         initialize(this, s);
     }


     /*
     f1 : initialize s with 'this ' object == window
     This feature is deprecated in favor of defining getters using the object initializer syntax or the Object.defineProperty() API. 
     While this feature is widely implemented, it is only described in the ECMAScript specification because of legacy usage. 
     This method should not be used since better alternatives exist.
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
     */
     function initialize(object, s) {
         if (s !== null && s !== undefined) {
             if (typeof s === 'string')
                 object.s = s;
             else
             // Every object has a toString() method that is automatically called when the object is to be represented as a text value 
             // or when an object is referred to in a manner in which a string is expected.such as
             /*
                var o = new Object();
                o.toString(); // returns [object Object]
             */
             // You can create a function to be called in place of the default toString() method. The toString() method takes no arguments and should return a string
             // go to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString for more details
                 object.s = s.toString();
         } else {
             object.s = s; //null or undefined
         }

         object.orig = s; //original object, currently only used by toCSV() and toBoolean()

         if (s !== null && s !== undefined) {
             // The __defineGetter__ method binds an object's property to a function to be called when that property is looked up.
             if (object.__defineGetter__) {
                 object.__defineGetter__('length', function() {
                     return object.s.length;
                 })
             } else {
                 object.length = s.length;
             }
         } else {
             object.length = -1;
         }
     } // end of initialize 


     // f3 namespace
     var __nsp = String.prototype;

     // f4 :  real starts
     var __sp = SS.prototype = {

         // decode html
         decodeHtmlEntities: function() { //https://github.com/substack/node-ent/blob/master/index.js
             var s = this.s;
             s = s.replace(/&#(\d+);?/g, function(_, code) {
                     return String.fromCharCode(code);
                 })
                 .replace(/&#[xX]([A-Fa-f0-9]+);?/g, function(_, hex) {
                     return String.fromCharCode(parseInt(hex, 16));
                 })
                 .replace(/&([^;\W]+;?)/g, function(m, e) {
                     var ee = e.replace(/;$/, '');
                     var target = ENTITIES[e] || (e.match(/;$/) && ENTITIES[ee]);

                     if (typeof target === 'number') {
                         return String.fromCharCode(target);
                     } else if (typeof target === 'string') {
                         return target;
                     } else {
                         return m;
                     }
                 });

             return new this.constructor(s);
         },

         // in test
         between: function(left, right) {
             var s = this.s;
             var startPos = s.indexOf(left);
             var endPos = s.indexOf(right, startPos + left.length);
             /*
             as an aside: , 
             I have learned that !== or === can have issues if the object is undefined rather than null 
             === needs to be the same type , so 
             1. undefined has type undefined and 
             2. null has type object

                When using == or != they evaluate to equal,
             */
             if (endPos == -1 && right != null)
                 return new this.constructor('');
             else if (endPos == -1 && right == null)
                 return new this.constructor(s.substring(startPos + left.length));
             else
                 return new this.constructor(s.slice(startPos + left.length, endPos));
         },

         //# modified slightly from https://github.com/epeli/underscore.string
         camelize: function() {
             var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {
                 return (c ? c.toUpperCase() : '');
             });
             return new this.constructor(s);
         },

         trim: function() {
             var s;
             if (typeof __nsp.trim === 'undefined')
                 s = this.s.replace(/(^\s*|\s*$)/g, '')
             else
                 s = this.s.trim()
             return new this.constructor(s);
         },

         valueOf: function() {
             return this.s.valueOf();
         },

         // in test
         charAt: function(index) {
             return this.s.charAt(index);
         },

         //
         toString: function() {
             return this.s;
         },

         // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
         toISOString: function() {
             var date = new Date(this.s);
             return date.getUTCFullYear() +
                 '-' + pad(date.getUTCMonth() + 1) +
                 '-' + pad(date.getUTCDate()) +
                 'T' + pad(date.getUTCHours()) +
                 ':' + pad(date.getUTCMinutes()) +
                 ':' + pad(date.getUTCSeconds()) +
                 '.' + String((date.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
                 'Z';
         },

         //#modified from https://github.com/epeli/underscore.string
         underscore: function() {
             var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
             return new this.constructor(s);
         },

         capitalize: function() {
             return new this.constructor(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
         },

         titleCase: function() {
             var s = this.s;
             if (s) {
                 s = s.replace(/(^[a-z]| [a-z]|-[a-z]|_[a-z])/g,
                     function($1) {
                         return $1.toUpperCase();
                     }
                 );
             }
             return new this.constructor(s);
         },

         humanize: function() { //modified from underscore.string
             if (this.s === null || this.s === undefined)
                 return new this.constructor('')
             var s = this.underscore().replace(/_id$/, '').replace(/_/g, ' ').trim().capitalize();
             return new this.constructor(s);
         },

         upperCase: function() {
             var s = this.s;
             return new this.constructor(s.toUpperCase());
         },

         stripTags: function() { //from sugar.js
             var s = this.s,
                 args = arguments.length > 0 ? arguments : [''];
             multiArgs(args, function(tag) {
                 s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
             });
             return new this.constructor(s);
         }

     };





     var methodsAdded = [];

     function extendPrototype() {
         for (var name in __sp) {
             (function(name) {
                 var func = __sp[name];
                 if (!__nsp.hasOwnProperty(name)) {
                     methodsAdded.push(name);
                     __nsp[name] = function() {
                         String.prototype.s = this;
                         return func.apply(this, arguments);
                     }
                 }
             })(name);
         }
     }


     function restorePrototype() {
         for (var i = 0; i < methodsAdded.length; ++i)
             delete String.prototype[methodsAdded[i]];
         methodsAdded.length = 0;
     }

     /*************************************
     /* Attach Native JavaScript String Properties
     /*************************************/

     var nativeProperties = getNativeStringProperties();
     for (var name in nativeProperties) {
         (function(name) {
             var stringProp = __nsp[name];
             if (typeof stringProp == 'function') {
                 //console.log(stringProp)
                 if (!__sp[name]) {
                     if (nativeProperties[name] === 'string') {
                         __sp[name] = function() {
                             //console.log(name)
                             return new this.constructor(stringProp.apply(this, arguments));
                         }
                     } else {
                         __sp[name] = stringProp;
                     }
                 }
             }
         })(name);
     }

     /*************************************
     /* Function Aliases
     /*************************************/

     __sp.repeat = __sp.times;
     __sp.include = __sp.contains;
     __sp.toInteger = __sp.toInt;
     __sp.toBool = __sp.toBoolean;
     __sp.decodeHTMLEntities = __sp.decodeHtmlEntities; //ensure consistent casing scheme of 'HTML' 

     //******************************************************************************
     // Set the constructor.  Without this, SmartString.js objects are instances of
     // Object instead of SS.
     //******************************************************************************
     __sp.constructor = SS;

     /*************************************
     /* Private Functions
     /*************************************/

     function getNativeStringProperties() {
         var names = getNativeStringPropertyNames();
         var retObj = {};

         for (var i = 0; i < names.length; ++i) {
             var name = names[i];
             if (name === 'to' || name === 'toEnd') continue; // get rid of the shelljs prototype messup
             var func = __nsp[name];
             try {
                 var type = typeof func.apply('teststring');
                 retObj[name] = type;
             } catch (e) {}
         }
         return retObj;
     }

     function getNativeStringPropertyNames() {
         var results = [];
         if (Object.getOwnPropertyNames) {
             results = Object.getOwnPropertyNames(__nsp);
             results.splice(results.indexOf('valueOf'), 1);
             results.splice(results.indexOf('toString'), 1);
             return results;
         } else { //meant for legacy cruft, this could probably be made more efficient
             var stringNames = {};
             var objectNames = [];
             for (var name in String.prototype)
                 stringNames[name] = name;

             for (var name in Object.prototype)
                 delete stringNames[name];

             //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names
             for (var name in stringNames) {
                 results.push(name);
             }
             return results;
         }
     }

     function pad(number) {
         var n = number.toString();
         return n.length === 1 ? '0' + n : n;
     }

     function Export(str) {
         return new SS(str);
     }

     //attach exports to StringJSWrapper
     Export.extendPrototype = extendPrototype;
     Export.restorePrototype = restorePrototype;
     Export.VERSION = VERSION;
     Export.TMPL_OPEN = '{{';
     Export.TMPL_CLOSE = '}}';
     Export.ENTITIES = ENTITIES;


     /*************************************
     /* Exports
     http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
     /*************************************/

     if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
         module.exports = Export;

     } else {

         if (typeof define === "function" && define.amd) {
             define([], function() {
                 return Export;
             });
         } else {
             window.SS = Export;
         }
     }

     /*************************************
     /* 3rd Party Private Functions
     /*************************************/

     //from sugar.js
     function multiArgs(args, fn) {
         var result = [],
             i;
         for (i = 0; i < args.length; i++) {
             result.push(args[i]);
             if (fn) fn.call(args, args[i], i);
         }
         return result;
     }

     //from underscore.string
     var escapeChars = {
         lt: '<',
         gt: '>',
         quot: '"',
         apos: "'",
         amp: '&'
     };


     // fn
     function escapeRegExp(s) {
         // most part from https://github.com/skulpt/skulpt/blob/ecaf75e69c2e539eff124b2ab45df0b01eaf2295/src/str.js#L242
         var c;
         var i;
         var ret = [];
         var re = /^[A-Za-z0-9]+$/;
         s = ensureString(s);
         for (i = 0; i < s.length; ++i) {
             c = s.charAt(i);

             if (re.test(c)) {
                 ret.push(c);
             } else {
                 if (c === "\\000") {
                     ret.push("\\000");
                 } else {
                     ret.push("\\" + c);
                 }
             }
         }
         return ret.join("");
     }

     // f7
     function ensureString(string) {
         return string == null ? '' : '' + string;
     }

     //from underscore.string
     var reversedEscapeChars = {};
     for (var key in escapeChars) {
         reversedEscapeChars[escapeChars[key]] = key;
     }
     ENTITIES = {
         "amp": "&",
         "gt": ">",
         "lt": "<",
         "quot": "\"",
         "apos": "'",
         "AElig": 198,
         "Aacute": 193,
         "Acirc": 194,
         "Agrave": 192,
         "Aring": 197,
         "Atilde": 195,
         "Auml": 196,
         "Ccedil": 199,
         "ETH": 208,
         "Eacute": 201,
         "Ecirc": 202,
         "Egrave": 200,
         "Euml": 203,
         "Iacute": 205,
         "Icirc": 206,
         "Igrave": 204,
         "Iuml": 207,
         "Ntilde": 209,
         "Oacute": 211,
         "Ocirc": 212,
         "Ograve": 210,
         "Oslash": 216,
         "Otilde": 213,
         "Ouml": 214,
         "THORN": 222,
         "Uacute": 218,
         "Ucirc": 219,
         "Ugrave": 217,
         "Uuml": 220,
         "Yacute": 221,
         "aacute": 225,
         "acirc": 226,
         "aelig": 230,
         "agrave": 224,
         "aring": 229,
         "atilde": 227,
         "auml": 228,
         "ccedil": 231,
         "eacute": 233,
         "ecirc": 234,
         "egrave": 232,
         "eth": 240,
         "euml": 235,
         "iacute": 237,
         "icirc": 238,
         "igrave": 236,
         "iuml": 239,
         "ntilde": 241,
         "oacute": 243,
         "ocirc": 244,
         "ograve": 242,
         "oslash": 248,
         "otilde": 245,
         "ouml": 246,
         "szlig": 223,
         "thorn": 254,
         "uacute": 250,
         "ucirc": 251,
         "ugrave": 249,
         "uuml": 252,
         "yacute": 253,
         "yuml": 255,
         "copy": 169,
         "reg": 174,
         "nbsp": 160,
         "iexcl": 161,
         "cent": 162,
         "pound": 163,
         "curren": 164,
         "yen": 165,
         "brvbar": 166,
         "sect": 167,
         "uml": 168,
         "ordf": 170,
         "laquo": 171,
         "not": 172,
         "shy": 173,
         "macr": 175,
         "deg": 176,
         "plusmn": 177,
         "sup1": 185,
         "sup2": 178,
         "sup3": 179,
         "acute": 180,
         "micro": 181,
         "para": 182,
         "middot": 183,
         "cedil": 184,
         "ordm": 186,
         "raquo": 187,
         "frac14": 188,
         "frac12": 189,
         "frac34": 190,
         "iquest": 191,
         "times": 215,
         "divide": 247,
         "OElig;": 338,
         "oelig;": 339,
         "Scaron;": 352,
         "scaron;": 353,
         "Yuml;": 376,
         "fnof;": 402,
         "circ;": 710,
         "tilde;": 732,
         "Alpha;": 913,
         "Beta;": 914,
         "Gamma;": 915,
         "Delta;": 916,
         "Epsilon;": 917,
         "Zeta;": 918,
         "Eta;": 919,
         "Theta;": 920,
         "Iota;": 921,
         "Kappa;": 922,
         "Lambda;": 923,
         "Mu;": 924,
         "Nu;": 925,
         "Xi;": 926,
         "Omicron;": 927,
         "Pi;": 928,
         "Rho;": 929,
         "Sigma;": 931,
         "Tau;": 932,
         "Upsilon;": 933,
         "Phi;": 934,
         "Chi;": 935,
         "Psi;": 936,
         "Omega;": 937,
         "alpha;": 945,
         "beta;": 946,
         "gamma;": 947,
         "delta;": 948,
         "epsilon;": 949,
         "zeta;": 950,
         "eta;": 951,
         "theta;": 952,
         "iota;": 953,
         "kappa;": 954,
         "lambda;": 955,
         "mu;": 956,
         "nu;": 957,
         "xi;": 958,
         "omicron;": 959,
         "pi;": 960,
         "rho;": 961,
         "sigmaf;": 962,
         "sigma;": 963,
         "tau;": 964,
         "upsilon;": 965,
         "phi;": 966,
         "chi;": 967,
         "psi;": 968,
         "omega;": 969,
         "thetasym;": 977,
         "upsih;": 978,
         "piv;": 982,
         "ensp;": 8194,
         "emsp;": 8195,
         "thinsp;": 8201,
         "zwnj;": 8204,
         "zwj;": 8205,
         "lrm;": 8206,
         "rlm;": 8207,
         "ndash;": 8211,
         "mdash;": 8212,
         "lsquo;": 8216,
         "rsquo;": 8217,
         "sbquo;": 8218,
         "ldquo;": 8220,
         "rdquo;": 8221,
         "bdquo;": 8222,
         "dagger;": 8224,
         "Dagger;": 8225,
         "bull;": 8226,
         "hellip;": 8230,
         "permil;": 8240,
         "prime;": 8242,
         "Prime;": 8243,
         "lsaquo;": 8249,
         "rsaquo;": 8250,
         "oline;": 8254,
         "frasl;": 8260,
         "euro;": 8364,
         "image;": 8465,
         "weierp;": 8472,
         "real;": 8476,
         "trade;": 8482,
         "alefsym;": 8501,
         "larr;": 8592,
         "uarr;": 8593,
         "rarr;": 8594,
         "darr;": 8595,
         "harr;": 8596,
         "crarr;": 8629,
         "lArr;": 8656,
         "uArr;": 8657,
         "rArr;": 8658,
         "dArr;": 8659,
         "hArr;": 8660,
         "forall;": 8704,
         "part;": 8706,
         "exist;": 8707,
         "empty;": 8709,
         "nabla;": 8711,
         "isin;": 8712,
         "notin;": 8713,
         "ni;": 8715,
         "prod;": 8719,
         "sum;": 8721,
         "minus;": 8722,
         "lowast;": 8727,
         "radic;": 8730,
         "prop;": 8733,
         "infin;": 8734,
         "ang;": 8736,
         "and;": 8743,
         "or;": 8744,
         "cap;": 8745,
         "cup;": 8746,
         "int;": 8747,
         "there4;": 8756,
         "sim;": 8764,
         "cong;": 8773,
         "asymp;": 8776,
         "ne;": 8800,
         "equiv;": 8801,
         "le;": 8804,
         "ge;": 8805,
         "sub;": 8834,
         "sup;": 8835,
         "nsub;": 8836,
         "sube;": 8838,
         "supe;": 8839,
         "oplus;": 8853,
         "otimes;": 8855,
         "perp;": 8869,
         "sdot;": 8901,
         "lceil;": 8968,
         "rceil;": 8969,
         "lfloor;": 8970,
         "rfloor;": 8971,
         "lang;": 9001,
         "rang;": 9002,
         "loz;": 9674,
         "spades;": 9824,
         "clubs;": 9827,
         "hearts;": 9829,
         "diams;": 9830
     };

     // ending
 }).call(this);