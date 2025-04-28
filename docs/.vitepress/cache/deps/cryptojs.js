import {
  __commonJS,
  __esm,
  __glob
} from "./chunk-UHKVJMYP.js";

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/Crypto.js
var require_Crypto = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/Crypto.js"(exports) {
    if (typeof Crypto == "undefined" || !Crypto.util) {
      (function() {
        var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var Crypto2 = typeof window === "undefined" ? exports.Crypto = {} : window.Crypto = {};
        var util = Crypto2.util = {
          // Bit-wise rotate left
          rotl: function(n, b) {
            return n << b | n >>> 32 - b;
          },
          // Bit-wise rotate right
          rotr: function(n, b) {
            return n << 32 - b | n >>> b;
          },
          // Swap big-endian to little-endian and vice versa
          endian: function(n) {
            if (n.constructor == Number) {
              return util.rotl(n, 8) & 16711935 | util.rotl(n, 24) & 4278255360;
            }
            for (var i = 0; i < n.length; i++)
              n[i] = util.endian(n[i]);
            return n;
          },
          // Generate an array of any length of random bytes
          randomBytes: function(n) {
            for (var bytes = []; n > 0; n--)
              bytes.push(Math.floor(Math.random() * 256));
            return bytes;
          },
          // Convert a byte array to big-endian 32-bit words
          bytesToWords: function(bytes) {
            for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
              words[b >>> 5] |= (bytes[i] & 255) << 24 - b % 32;
            return words;
          },
          // Convert big-endian 32-bit words to a byte array
          wordsToBytes: function(words) {
            for (var bytes = [], b = 0; b < words.length * 32; b += 8)
              bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
            return bytes;
          },
          // Convert a byte array to a hex string
          bytesToHex: function(bytes) {
            for (var hex = [], i = 0; i < bytes.length; i++) {
              hex.push((bytes[i] >>> 4).toString(16));
              hex.push((bytes[i] & 15).toString(16));
            }
            return hex.join("");
          },
          // Convert a hex string to a byte array
          hexToBytes: function(hex) {
            for (var bytes = [], c = 0; c < hex.length; c += 2)
              bytes.push(parseInt(hex.substr(c, 2), 16));
            return bytes;
          },
          // Convert a byte array to a base-64 string
          bytesToBase64: function(bytes) {
            if (typeof btoa == "function") return btoa(Binary.bytesToString(bytes));
            for (var base64 = [], i = 0; i < bytes.length; i += 3) {
              var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
              for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 <= bytes.length * 8)
                  base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
                else base64.push("=");
              }
            }
            return base64.join("");
          },
          // Convert a base-64 string to a byte array
          base64ToBytes: function(base64) {
            if (typeof atob == "function") return Binary.stringToBytes(atob(base64));
            base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
            for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
              if (imod4 == 0) continue;
              bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
            }
            return bytes;
          }
        };
        var charenc = Crypto2.charenc = {};
        var UTF8 = charenc.UTF8 = {
          // Convert a string to a byte array
          stringToBytes: function(str) {
            return Binary.stringToBytes(unescape(encodeURIComponent(str)));
          },
          // Convert a byte array to a string
          bytesToString: function(bytes) {
            return decodeURIComponent(escape(Binary.bytesToString(bytes)));
          }
        };
        var Binary = charenc.Binary = {
          // Convert a string to a byte array
          stringToBytes: function(str) {
            for (var bytes = [], i = 0; i < str.length; i++)
              bytes.push(str.charCodeAt(i) & 255);
            return bytes;
          },
          // Convert a byte array to a string
          bytesToString: function(bytes) {
            for (var str = [], i = 0; i < bytes.length; i++)
              str.push(String.fromCharCode(bytes[i]));
            return str.join("");
          }
        };
      })();
    }
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/AES.js
var require_AES = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/AES.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8;
      var SBOX = [
        99,
        124,
        119,
        123,
        242,
        107,
        111,
        197,
        48,
        1,
        103,
        43,
        254,
        215,
        171,
        118,
        202,
        130,
        201,
        125,
        250,
        89,
        71,
        240,
        173,
        212,
        162,
        175,
        156,
        164,
        114,
        192,
        183,
        253,
        147,
        38,
        54,
        63,
        247,
        204,
        52,
        165,
        229,
        241,
        113,
        216,
        49,
        21,
        4,
        199,
        35,
        195,
        24,
        150,
        5,
        154,
        7,
        18,
        128,
        226,
        235,
        39,
        178,
        117,
        9,
        131,
        44,
        26,
        27,
        110,
        90,
        160,
        82,
        59,
        214,
        179,
        41,
        227,
        47,
        132,
        83,
        209,
        0,
        237,
        32,
        252,
        177,
        91,
        106,
        203,
        190,
        57,
        74,
        76,
        88,
        207,
        208,
        239,
        170,
        251,
        67,
        77,
        51,
        133,
        69,
        249,
        2,
        127,
        80,
        60,
        159,
        168,
        81,
        163,
        64,
        143,
        146,
        157,
        56,
        245,
        188,
        182,
        218,
        33,
        16,
        255,
        243,
        210,
        205,
        12,
        19,
        236,
        95,
        151,
        68,
        23,
        196,
        167,
        126,
        61,
        100,
        93,
        25,
        115,
        96,
        129,
        79,
        220,
        34,
        42,
        144,
        136,
        70,
        238,
        184,
        20,
        222,
        94,
        11,
        219,
        224,
        50,
        58,
        10,
        73,
        6,
        36,
        92,
        194,
        211,
        172,
        98,
        145,
        149,
        228,
        121,
        231,
        200,
        55,
        109,
        141,
        213,
        78,
        169,
        108,
        86,
        244,
        234,
        101,
        122,
        174,
        8,
        186,
        120,
        37,
        46,
        28,
        166,
        180,
        198,
        232,
        221,
        116,
        31,
        75,
        189,
        139,
        138,
        112,
        62,
        181,
        102,
        72,
        3,
        246,
        14,
        97,
        53,
        87,
        185,
        134,
        193,
        29,
        158,
        225,
        248,
        152,
        17,
        105,
        217,
        142,
        148,
        155,
        30,
        135,
        233,
        206,
        85,
        40,
        223,
        140,
        161,
        137,
        13,
        191,
        230,
        66,
        104,
        65,
        153,
        45,
        15,
        176,
        84,
        187,
        22
      ];
      for (var INVSBOX = [], i = 0; i < 256; i++) INVSBOX[SBOX[i]] = i;
      var MULT2 = [], MULT3 = [], MULT9 = [], MULTB = [], MULTD = [], MULTE = [];
      function xtime(a, b) {
        for (var result = 0, i2 = 0; i2 < 8; i2++) {
          if (b & 1) result ^= a;
          var hiBitSet = a & 128;
          a = a << 1 & 255;
          if (hiBitSet) a ^= 27;
          b >>>= 1;
        }
        return result;
      }
      for (var i = 0; i < 256; i++) {
        MULT2[i] = xtime(i, 2);
        MULT3[i] = xtime(i, 3);
        MULT9[i] = xtime(i, 9);
        MULTB[i] = xtime(i, 11);
        MULTD[i] = xtime(i, 13);
        MULTE[i] = xtime(i, 14);
      }
      var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      var state = [[], [], [], []], keylength, nrounds, keyschedule;
      var AES = C.AES = {
        /**
         * Public API
         */
        encrypt: function(message, password, options) {
          options = options || {};
          var mode = options.mode || new C.mode.OFB();
          if (mode.fixOptions) mode.fixOptions(options);
          var m = message.constructor == String ? UTF8.stringToBytes(message) : message, iv = options.iv || util.randomBytes(AES._blocksize * 4), k = password.constructor == String ? (
            // Derive key from passphrase
            C.PBKDF2(password, iv, 32, { asBytes: true })
          ) : (
            // else, assume byte array representing cryptographic key
            password
          );
          AES._init(k);
          mode.encrypt(AES, m, iv);
          m = options.iv ? m : iv.concat(m);
          return options && options.asBytes ? m : util.bytesToBase64(m);
        },
        decrypt: function(ciphertext, password, options) {
          options = options || {};
          var mode = options.mode || new C.mode.OFB();
          if (mode.fixOptions) mode.fixOptions(options);
          var c = ciphertext.constructor == String ? util.base64ToBytes(ciphertext) : ciphertext, iv = options.iv || c.splice(0, AES._blocksize * 4), k = password.constructor == String ? (
            // Derive key from passphrase
            C.PBKDF2(password, iv, 32, { asBytes: true })
          ) : (
            // else, assume byte array representing cryptographic key
            password
          );
          AES._init(k);
          mode.decrypt(AES, c, iv);
          return options && options.asBytes ? c : UTF8.bytesToString(c);
        },
        /**
         * Package private methods and properties
         */
        _blocksize: 4,
        _encryptblock: function(m, offset) {
          for (var row = 0; row < AES._blocksize; row++) {
            for (var col = 0; col < 4; col++)
              state[row][col] = m[offset + col * 4 + row];
          }
          for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++)
              state[row][col] ^= keyschedule[col][row];
          }
          for (var round = 1; round < nrounds; round++) {
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++)
                state[row][col] = SBOX[state[row][col]];
            }
            state[1].push(state[1].shift());
            state[2].push(state[2].shift());
            state[2].push(state[2].shift());
            state[3].unshift(state[3].pop());
            for (var col = 0; col < 4; col++) {
              var s0 = state[0][col], s1 = state[1][col], s2 = state[2][col], s3 = state[3][col];
              state[0][col] = MULT2[s0] ^ MULT3[s1] ^ s2 ^ s3;
              state[1][col] = s0 ^ MULT2[s1] ^ MULT3[s2] ^ s3;
              state[2][col] = s0 ^ s1 ^ MULT2[s2] ^ MULT3[s3];
              state[3][col] = MULT3[s0] ^ s1 ^ s2 ^ MULT2[s3];
            }
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++)
                state[row][col] ^= keyschedule[round * 4 + col][row];
            }
          }
          for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++)
              state[row][col] = SBOX[state[row][col]];
          }
          state[1].push(state[1].shift());
          state[2].push(state[2].shift());
          state[2].push(state[2].shift());
          state[3].unshift(state[3].pop());
          for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++)
              state[row][col] ^= keyschedule[nrounds * 4 + col][row];
          }
          for (var row = 0; row < AES._blocksize; row++) {
            for (var col = 0; col < 4; col++)
              m[offset + col * 4 + row] = state[row][col];
          }
        },
        _decryptblock: function(c, offset) {
          for (var row = 0; row < AES._blocksize; row++) {
            for (var col = 0; col < 4; col++)
              state[row][col] = c[offset + col * 4 + row];
          }
          for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++)
              state[row][col] ^= keyschedule[nrounds * 4 + col][row];
          }
          for (var round = 1; round < nrounds; round++) {
            state[1].unshift(state[1].pop());
            state[2].push(state[2].shift());
            state[2].push(state[2].shift());
            state[3].push(state[3].shift());
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++)
                state[row][col] = INVSBOX[state[row][col]];
            }
            for (var row = 0; row < 4; row++) {
              for (var col = 0; col < 4; col++)
                state[row][col] ^= keyschedule[(nrounds - round) * 4 + col][row];
            }
            for (var col = 0; col < 4; col++) {
              var s0 = state[0][col], s1 = state[1][col], s2 = state[2][col], s3 = state[3][col];
              state[0][col] = MULTE[s0] ^ MULTB[s1] ^ MULTD[s2] ^ MULT9[s3];
              state[1][col] = MULT9[s0] ^ MULTE[s1] ^ MULTB[s2] ^ MULTD[s3];
              state[2][col] = MULTD[s0] ^ MULT9[s1] ^ MULTE[s2] ^ MULTB[s3];
              state[3][col] = MULTB[s0] ^ MULTD[s1] ^ MULT9[s2] ^ MULTE[s3];
            }
          }
          state[1].unshift(state[1].pop());
          state[2].push(state[2].shift());
          state[2].push(state[2].shift());
          state[3].push(state[3].shift());
          for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++)
              state[row][col] = INVSBOX[state[row][col]];
          }
          for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++)
              state[row][col] ^= keyschedule[col][row];
          }
          for (var row = 0; row < AES._blocksize; row++) {
            for (var col = 0; col < 4; col++)
              c[offset + col * 4 + row] = state[row][col];
          }
        },
        /**
         * Private methods
         */
        _init: function(k) {
          keylength = k.length / 4;
          nrounds = keylength + 6;
          AES._keyexpansion(k);
        },
        // Generate a key schedule
        _keyexpansion: function(k) {
          keyschedule = [];
          for (var row = 0; row < keylength; row++) {
            keyschedule[row] = [
              k[row * 4],
              k[row * 4 + 1],
              k[row * 4 + 2],
              k[row * 4 + 3]
            ];
          }
          for (var row = keylength; row < AES._blocksize * (nrounds + 1); row++) {
            var temp = [
              keyschedule[row - 1][0],
              keyschedule[row - 1][1],
              keyschedule[row - 1][2],
              keyschedule[row - 1][3]
            ];
            if (row % keylength == 0) {
              temp.push(temp.shift());
              temp[0] = SBOX[temp[0]];
              temp[1] = SBOX[temp[1]];
              temp[2] = SBOX[temp[2]];
              temp[3] = SBOX[temp[3]];
              temp[0] ^= RCON[row / keylength];
            } else if (keylength > 6 && row % keylength == 4) {
              temp[0] = SBOX[temp[0]];
              temp[1] = SBOX[temp[1]];
              temp[2] = SBOX[temp[2]];
              temp[3] = SBOX[temp[3]];
            }
            keyschedule[row] = [
              keyschedule[row - keylength][0] ^ temp[0],
              keyschedule[row - keylength][1] ^ temp[1],
              keyschedule[row - keylength][2] ^ temp[2],
              keyschedule[row - keylength][3] ^ temp[3]
            ];
          }
        }
      };
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/BlockModes.js
var require_BlockModes = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/BlockModes.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var C_pad = C.pad = {};
      function _requiredPadding(cipher, message) {
        var blockSizeInBytes = cipher._blocksize * 4;
        var reqd = blockSizeInBytes - message.length % blockSizeInBytes;
        return reqd;
      }
      ;
      var _unpadLength = function(message) {
        var pad = message.pop();
        for (var i = 1; i < pad; i++) {
          message.pop();
        }
      };
      C_pad.NoPadding = {
        pad: function(cipher, message) {
        },
        unpad: function(message) {
        }
      };
      C_pad.ZeroPadding = {
        pad: function(cipher, message) {
          var blockSizeInBytes = cipher._blocksize * 4;
          var reqd = message.length % blockSizeInBytes;
          if (reqd != 0) {
            for (reqd = blockSizeInBytes - reqd; reqd > 0; reqd--) {
              message.push(0);
            }
          }
        },
        unpad: function(message) {
        }
      };
      C_pad.iso7816 = {
        pad: function(cipher, message) {
          var reqd = _requiredPadding(cipher, message);
          message.push(128);
          for (; reqd > 1; reqd--) {
            message.push(0);
          }
        },
        unpad: function(message) {
          while (message.pop() != 128) {
          }
        }
      };
      C_pad.ansix923 = {
        pad: function(cipher, message) {
          var reqd = _requiredPadding(cipher, message);
          for (var i = 1; i < reqd; i++) {
            message.push(0);
          }
          message.push(reqd);
        },
        unpad: _unpadLength
      };
      C_pad.iso10126 = {
        pad: function(cipher, message) {
          var reqd = _requiredPadding(cipher, message);
          for (var i = 1; i < reqd; i++) {
            message.push(Math.floor(Math.random() * 256));
          }
          message.push(reqd);
        },
        unpad: _unpadLength
      };
      C_pad.pkcs7 = {
        pad: function(cipher, message) {
          var reqd = _requiredPadding(cipher, message);
          for (var i = 0; i < reqd; i++) {
            message.push(reqd);
          }
        },
        unpad: _unpadLength
      };
      var C_mode = C.mode = {};
      var Mode = C_mode.Mode = function(padding) {
        if (padding) {
          this._padding = padding;
        }
      };
      Mode.prototype = {
        encrypt: function(cipher, m, iv) {
          this._padding.pad(cipher, m);
          this._doEncrypt(cipher, m, iv);
        },
        decrypt: function(cipher, m, iv) {
          this._doDecrypt(cipher, m, iv);
          this._padding.unpad(m);
        },
        // Default padding
        _padding: C_pad.iso7816
      };
      var ECB = C_mode.ECB = function() {
        Mode.apply(this, arguments);
      };
      var ECB_prototype = ECB.prototype = new Mode();
      ECB_prototype._doEncrypt = function(cipher, m, iv) {
        var blockSizeInBytes = cipher._blocksize * 4;
        for (var offset = 0; offset < m.length; offset += blockSizeInBytes) {
          cipher._encryptblock(m, offset);
        }
      };
      ECB_prototype._doDecrypt = function(cipher, c, iv) {
        var blockSizeInBytes = cipher._blocksize * 4;
        for (var offset = 0; offset < c.length; offset += blockSizeInBytes) {
          cipher._decryptblock(c, offset);
        }
      };
      ECB_prototype.fixOptions = function(options) {
        options.iv = [];
      };
      var CBC = C_mode.CBC = function() {
        Mode.apply(this, arguments);
      };
      var CBC_prototype = CBC.prototype = new Mode();
      CBC_prototype._doEncrypt = function(cipher, m, iv) {
        var blockSizeInBytes = cipher._blocksize * 4;
        for (var offset = 0; offset < m.length; offset += blockSizeInBytes) {
          if (offset == 0) {
            for (var i = 0; i < blockSizeInBytes; i++)
              m[i] ^= iv[i];
          } else {
            for (var i = 0; i < blockSizeInBytes; i++)
              m[offset + i] ^= m[offset + i - blockSizeInBytes];
          }
          cipher._encryptblock(m, offset);
        }
      };
      CBC_prototype._doDecrypt = function(cipher, c, iv) {
        var blockSizeInBytes = cipher._blocksize * 4;
        var prevCryptedBlock = iv;
        for (var offset = 0; offset < c.length; offset += blockSizeInBytes) {
          var thisCryptedBlock = c.slice(offset, offset + blockSizeInBytes);
          cipher._decryptblock(c, offset);
          for (var i = 0; i < blockSizeInBytes; i++) {
            c[offset + i] ^= prevCryptedBlock[i];
          }
          prevCryptedBlock = thisCryptedBlock;
        }
      };
      var CFB = C_mode.CFB = function() {
        Mode.apply(this, arguments);
      };
      var CFB_prototype = CFB.prototype = new Mode();
      CFB_prototype._padding = C_pad.NoPadding;
      CFB_prototype._doEncrypt = function(cipher, m, iv) {
        var blockSizeInBytes = cipher._blocksize * 4, keystream = iv.slice(0);
        for (var i = 0; i < m.length; i++) {
          var j = i % blockSizeInBytes;
          if (j == 0) cipher._encryptblock(keystream, 0);
          m[i] ^= keystream[j];
          keystream[j] = m[i];
        }
      };
      CFB_prototype._doDecrypt = function(cipher, c, iv) {
        var blockSizeInBytes = cipher._blocksize * 4, keystream = iv.slice(0);
        for (var i = 0; i < c.length; i++) {
          var j = i % blockSizeInBytes;
          if (j == 0) cipher._encryptblock(keystream, 0);
          var b = c[i];
          c[i] ^= keystream[j];
          keystream[j] = b;
        }
      };
      var OFB = C_mode.OFB = function() {
        Mode.apply(this, arguments);
      };
      var OFB_prototype = OFB.prototype = new Mode();
      OFB_prototype._padding = C_pad.NoPadding;
      OFB_prototype._doEncrypt = function(cipher, m, iv) {
        var blockSizeInBytes = cipher._blocksize * 4, keystream = iv.slice(0);
        for (var i = 0; i < m.length; i++) {
          if (i % blockSizeInBytes == 0)
            cipher._encryptblock(keystream, 0);
          m[i] ^= keystream[i % blockSizeInBytes];
        }
      };
      OFB_prototype._doDecrypt = OFB_prototype._doEncrypt;
      var CTR = C_mode.CTR = function() {
        Mode.apply(this, arguments);
      };
      var CTR_prototype = CTR.prototype = new Mode();
      CTR_prototype._padding = C_pad.NoPadding;
      CTR_prototype._doEncrypt = function(cipher, m, iv) {
        var blockSizeInBytes = cipher._blocksize * 4;
        var counter = iv.slice(0);
        for (var i = 0; i < m.length; ) {
          var keystream = counter.slice(0);
          cipher._encryptblock(keystream, 0);
          for (var j = 0; i < m.length && j < blockSizeInBytes; j++, i++) {
            m[i] ^= keystream[j];
          }
          if (++counter[blockSizeInBytes - 1] == 256) {
            counter[blockSizeInBytes - 1] = 0;
            if (++counter[blockSizeInBytes - 2] == 256) {
              counter[blockSizeInBytes - 2] = 0;
              if (++counter[blockSizeInBytes - 3] == 256) {
                counter[blockSizeInBytes - 3] = 0;
                ++counter[blockSizeInBytes - 4];
              }
            }
          }
        }
      };
      CTR_prototype._doDecrypt = CTR_prototype._doEncrypt;
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/CryptoMath.js
var require_CryptoMath = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/CryptoMath.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util;
      util.u32 = function(n) {
        return n >>> 0;
      };
      util.add = function() {
        var result = this.u32(arguments[0]);
        for (var i = 1; i < arguments.length; i++)
          result = this.u32(result + this.u32(arguments[i]));
        return result;
      };
      util.mult = function(m, n) {
        return this.add(
          (n & 4294901760) * m,
          (n & 65535) * m
        );
      };
      util.gt = function(m, n) {
        return this.u32(m) > this.u32(n);
      };
      util.lt = function(m, n) {
        return this.u32(m) < this.u32(n);
      };
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/DES.js
var require_DES = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/DES.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8;
      var KeySchedule;
      KeySchedule = function(key) {
        this.keys = new Array(16);
        this._initialiseKeys(key);
      };
      KeySchedule.PC1_offsets = [
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
        7,
        6,
        5,
        4,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
        3,
        2,
        1,
        0
      ];
      KeySchedule.PC1_masks = [
        128,
        128,
        128,
        128,
        128,
        128,
        128,
        128,
        64,
        64,
        64,
        64,
        64,
        64,
        64,
        64,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        32,
        16,
        16,
        16,
        16,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        16,
        16,
        16,
        16
      ];
      KeySchedule.PC2_offsets1 = [
        0,
        3,
        1,
        2,
        0,
        1,
        3,
        2,
        0,
        1,
        0,
        2,
        3,
        0,
        1,
        3,
        0,
        0,
        2,
        3,
        1,
        0,
        2,
        0,
        0,
        2,
        3,
        1
      ];
      KeySchedule.PC2_offsets2 = [
        7,
        5,
        4,
        7,
        5,
        6,
        0,
        7,
        4,
        0,
        6,
        5,
        4,
        7,
        0,
        6,
        5,
        7,
        4,
        5,
        6,
        7,
        5,
        4,
        6,
        0,
        4,
        6
      ];
      KeySchedule.PC2_masks1 = [
        2,
        1,
        32,
        4,
        1,
        4,
        16,
        1,
        0,
        1,
        8,
        8,
        2,
        32,
        8,
        32,
        16,
        0,
        16,
        4,
        2,
        0,
        32,
        4,
        0,
        2,
        8,
        16
      ];
      KeySchedule.PC2_masks2 = [
        2,
        32,
        8,
        1,
        2,
        2,
        0,
        4,
        4,
        0,
        8,
        16,
        32,
        16,
        0,
        32,
        4,
        32,
        2,
        1,
        16,
        8,
        8,
        16,
        1,
        0,
        1,
        4
      ];
      KeySchedule.keyShifts = [
        1,
        2,
        4,
        6,
        8,
        10,
        12,
        14,
        15,
        17,
        19,
        21,
        23,
        25,
        27,
        28
      ];
      KeySchedule.prototype._initialiseKeys = function(key) {
        var i;
        var bits = new Array(56);
        for (i = 0; i < 56; i++) {
          bits[i] = (key[KeySchedule.PC1_offsets[i]] & KeySchedule.PC1_masks[i]) != 0;
        }
        var bits1 = bits.slice(0, 28);
        var bits2 = bits.slice(28, 56);
        bits1 = bits1.concat(bits1);
        bits2 = bits2.concat(bits2);
        for (i = 0; i < 16; i++) {
          var k = [0, 0, 0, 0, 0, 0, 0, 0];
          var s = KeySchedule.keyShifts[i];
          for (var j = 0; j < 28; j++) {
            if (bits1[j + s]) {
              k[KeySchedule.PC2_offsets1[j]] += KeySchedule.PC2_masks1[j];
            }
            if (bits2[j + s]) {
              k[KeySchedule.PC2_offsets2[j]] += KeySchedule.PC2_masks2[j];
            }
          }
          k[0] = ((k[0] & 31) << 27) + ((k[0] & 32) >> 5);
          for (var j = 1; j <= 6; j++) {
            k[j] = k[j] << 27 - 4 * j;
          }
          k[7] = ((k[7] & 62) >> 1) + ((k[7] & 1) << 31);
          this.keys[i] = k;
        }
      };
      KeySchedule.prototype.getKey = function(i) {
        return this.keys[i];
      };
      var State;
      State = function() {
        this.lhs = 0;
        this.rhs = 0;
      };
      State.SBOX_MASK = [
        4160749569,
        528482304,
        33030144,
        2064384,
        129024,
        8064,
        504,
        2147483679
      ];
      State.SBOX = new Array(8);
      var SBOX = State.SBOX;
      SBOX[0] = new Array();
      SBOX[0][0] = 8421888;
      SBOX[0][268435456] = 32768;
      SBOX[0][536870912] = 8421378;
      SBOX[0][805306368] = 2;
      SBOX[0][1073741824] = 512;
      SBOX[0][1342177280] = 8421890;
      SBOX[0][1610612736] = 8389122;
      SBOX[0][1879048192] = 8388608;
      SBOX[0][-2147483648] = 514;
      SBOX[0][-1879048192] = 8389120;
      SBOX[0][-1610612736] = 33280;
      SBOX[0][-1342177280] = 8421376;
      SBOX[0][-1073741824] = 32770;
      SBOX[0][-805306368] = 8388610;
      SBOX[0][-536870912] = 0;
      SBOX[0][-268435456] = 33282;
      SBOX[0][134217728] = 0;
      SBOX[0][402653184] = 8421890;
      SBOX[0][671088640] = 33282;
      SBOX[0][939524096] = 32768;
      SBOX[0][1207959552] = 8421888;
      SBOX[0][1476395008] = 512;
      SBOX[0][1744830464] = 8421378;
      SBOX[0][2013265920] = 2;
      SBOX[0][-2013265920] = 8389120;
      SBOX[0][-1744830464] = 33280;
      SBOX[0][-1476395008] = 8421376;
      SBOX[0][-1207959552] = 8389122;
      SBOX[0][-939524096] = 8388610;
      SBOX[0][-671088640] = 32770;
      SBOX[0][-402653184] = 514;
      SBOX[0][-134217728] = 8388608;
      SBOX[0][1] = 32768;
      SBOX[0][268435457] = 2;
      SBOX[0][536870913] = 8421888;
      SBOX[0][805306369] = 8388608;
      SBOX[0][1073741825] = 8421378;
      SBOX[0][1342177281] = 33280;
      SBOX[0][1610612737] = 512;
      SBOX[0][1879048193] = 8389122;
      SBOX[0][-2147483647] = 8421890;
      SBOX[0][-1879048191] = 8421376;
      SBOX[0][-1610612735] = 8388610;
      SBOX[0][-1342177279] = 33282;
      SBOX[0][-1073741823] = 514;
      SBOX[0][-805306367] = 8389120;
      SBOX[0][-536870911] = 32770;
      SBOX[0][-268435455] = 0;
      SBOX[0][134217729] = 8421890;
      SBOX[0][402653185] = 8421376;
      SBOX[0][671088641] = 8388608;
      SBOX[0][939524097] = 512;
      SBOX[0][1207959553] = 32768;
      SBOX[0][1476395009] = 8388610;
      SBOX[0][1744830465] = 2;
      SBOX[0][2013265921] = 33282;
      SBOX[0][-2013265919] = 32770;
      SBOX[0][-1744830463] = 8389122;
      SBOX[0][-1476395007] = 514;
      SBOX[0][-1207959551] = 8421888;
      SBOX[0][-939524095] = 8389120;
      SBOX[0][-671088639] = 0;
      SBOX[0][-402653183] = 33280;
      SBOX[0][-134217727] = 8421378;
      SBOX[1] = new Array();
      SBOX[1][0] = 1074282512;
      SBOX[1][16777216] = 16384;
      SBOX[1][33554432] = 524288;
      SBOX[1][50331648] = 1074266128;
      SBOX[1][67108864] = 1073741840;
      SBOX[1][83886080] = 1074282496;
      SBOX[1][100663296] = 1073758208;
      SBOX[1][117440512] = 16;
      SBOX[1][134217728] = 540672;
      SBOX[1][150994944] = 1073758224;
      SBOX[1][167772160] = 1073741824;
      SBOX[1][184549376] = 540688;
      SBOX[1][201326592] = 524304;
      SBOX[1][218103808] = 0;
      SBOX[1][234881024] = 16400;
      SBOX[1][251658240] = 1074266112;
      SBOX[1][8388608] = 1073758208;
      SBOX[1][25165824] = 540688;
      SBOX[1][41943040] = 16;
      SBOX[1][58720256] = 1073758224;
      SBOX[1][75497472] = 1074282512;
      SBOX[1][92274688] = 1073741824;
      SBOX[1][109051904] = 524288;
      SBOX[1][125829120] = 1074266128;
      SBOX[1][142606336] = 524304;
      SBOX[1][159383552] = 0;
      SBOX[1][176160768] = 16384;
      SBOX[1][192937984] = 1074266112;
      SBOX[1][209715200] = 1073741840;
      SBOX[1][226492416] = 540672;
      SBOX[1][243269632] = 1074282496;
      SBOX[1][260046848] = 16400;
      SBOX[1][268435456] = 0;
      SBOX[1][285212672] = 1074266128;
      SBOX[1][301989888] = 1073758224;
      SBOX[1][318767104] = 1074282496;
      SBOX[1][335544320] = 1074266112;
      SBOX[1][352321536] = 16;
      SBOX[1][369098752] = 540688;
      SBOX[1][385875968] = 16384;
      SBOX[1][402653184] = 16400;
      SBOX[1][419430400] = 524288;
      SBOX[1][436207616] = 524304;
      SBOX[1][452984832] = 1073741840;
      SBOX[1][469762048] = 540672;
      SBOX[1][486539264] = 1073758208;
      SBOX[1][503316480] = 1073741824;
      SBOX[1][520093696] = 1074282512;
      SBOX[1][276824064] = 540688;
      SBOX[1][293601280] = 524288;
      SBOX[1][310378496] = 1074266112;
      SBOX[1][327155712] = 16384;
      SBOX[1][343932928] = 1073758208;
      SBOX[1][360710144] = 1074282512;
      SBOX[1][377487360] = 16;
      SBOX[1][394264576] = 1073741824;
      SBOX[1][411041792] = 1074282496;
      SBOX[1][427819008] = 1073741840;
      SBOX[1][444596224] = 1073758224;
      SBOX[1][461373440] = 524304;
      SBOX[1][478150656] = 0;
      SBOX[1][494927872] = 16400;
      SBOX[1][511705088] = 1074266128;
      SBOX[1][528482304] = 540672;
      SBOX[2] = new Array();
      SBOX[2][0] = 260;
      SBOX[2][1048576] = 0;
      SBOX[2][2097152] = 67109120;
      SBOX[2][3145728] = 65796;
      SBOX[2][4194304] = 65540;
      SBOX[2][5242880] = 67108868;
      SBOX[2][6291456] = 67174660;
      SBOX[2][7340032] = 67174400;
      SBOX[2][8388608] = 67108864;
      SBOX[2][9437184] = 67174656;
      SBOX[2][10485760] = 65792;
      SBOX[2][11534336] = 67174404;
      SBOX[2][12582912] = 67109124;
      SBOX[2][13631488] = 65536;
      SBOX[2][14680064] = 4;
      SBOX[2][15728640] = 256;
      SBOX[2][524288] = 67174656;
      SBOX[2][1572864] = 67174404;
      SBOX[2][2621440] = 0;
      SBOX[2][3670016] = 67109120;
      SBOX[2][4718592] = 67108868;
      SBOX[2][5767168] = 65536;
      SBOX[2][6815744] = 65540;
      SBOX[2][7864320] = 260;
      SBOX[2][8912896] = 4;
      SBOX[2][9961472] = 256;
      SBOX[2][11010048] = 67174400;
      SBOX[2][12058624] = 65796;
      SBOX[2][13107200] = 65792;
      SBOX[2][14155776] = 67109124;
      SBOX[2][15204352] = 67174660;
      SBOX[2][16252928] = 67108864;
      SBOX[2][16777216] = 67174656;
      SBOX[2][17825792] = 65540;
      SBOX[2][18874368] = 65536;
      SBOX[2][19922944] = 67109120;
      SBOX[2][20971520] = 256;
      SBOX[2][22020096] = 67174660;
      SBOX[2][23068672] = 67108868;
      SBOX[2][24117248] = 0;
      SBOX[2][25165824] = 67109124;
      SBOX[2][26214400] = 67108864;
      SBOX[2][27262976] = 4;
      SBOX[2][28311552] = 65792;
      SBOX[2][29360128] = 67174400;
      SBOX[2][30408704] = 260;
      SBOX[2][31457280] = 65796;
      SBOX[2][32505856] = 67174404;
      SBOX[2][17301504] = 67108864;
      SBOX[2][18350080] = 260;
      SBOX[2][19398656] = 67174656;
      SBOX[2][20447232] = 0;
      SBOX[2][21495808] = 65540;
      SBOX[2][22544384] = 67109120;
      SBOX[2][23592960] = 256;
      SBOX[2][24641536] = 67174404;
      SBOX[2][25690112] = 65536;
      SBOX[2][26738688] = 67174660;
      SBOX[2][27787264] = 65796;
      SBOX[2][28835840] = 67108868;
      SBOX[2][29884416] = 67109124;
      SBOX[2][30932992] = 67174400;
      SBOX[2][31981568] = 4;
      SBOX[2][33030144] = 65792;
      SBOX[3] = new Array();
      SBOX[3][0] = 2151682048;
      SBOX[3][65536] = 2147487808;
      SBOX[3][131072] = 4198464;
      SBOX[3][196608] = 2151677952;
      SBOX[3][262144] = 0;
      SBOX[3][327680] = 4198400;
      SBOX[3][393216] = 2147483712;
      SBOX[3][458752] = 4194368;
      SBOX[3][524288] = 2147483648;
      SBOX[3][589824] = 4194304;
      SBOX[3][655360] = 64;
      SBOX[3][720896] = 2147487744;
      SBOX[3][786432] = 2151678016;
      SBOX[3][851968] = 4160;
      SBOX[3][917504] = 4096;
      SBOX[3][983040] = 2151682112;
      SBOX[3][32768] = 2147487808;
      SBOX[3][98304] = 64;
      SBOX[3][163840] = 2151678016;
      SBOX[3][229376] = 2147487744;
      SBOX[3][294912] = 4198400;
      SBOX[3][360448] = 2151682112;
      SBOX[3][425984] = 0;
      SBOX[3][491520] = 2151677952;
      SBOX[3][557056] = 4096;
      SBOX[3][622592] = 2151682048;
      SBOX[3][688128] = 4194304;
      SBOX[3][753664] = 4160;
      SBOX[3][819200] = 2147483648;
      SBOX[3][884736] = 4194368;
      SBOX[3][950272] = 4198464;
      SBOX[3][1015808] = 2147483712;
      SBOX[3][1048576] = 4194368;
      SBOX[3][1114112] = 4198400;
      SBOX[3][1179648] = 2147483712;
      SBOX[3][1245184] = 0;
      SBOX[3][1310720] = 4160;
      SBOX[3][1376256] = 2151678016;
      SBOX[3][1441792] = 2151682048;
      SBOX[3][1507328] = 2147487808;
      SBOX[3][1572864] = 2151682112;
      SBOX[3][1638400] = 2147483648;
      SBOX[3][1703936] = 2151677952;
      SBOX[3][1769472] = 4198464;
      SBOX[3][1835008] = 2147487744;
      SBOX[3][1900544] = 4194304;
      SBOX[3][1966080] = 64;
      SBOX[3][2031616] = 4096;
      SBOX[3][1081344] = 2151677952;
      SBOX[3][1146880] = 2151682112;
      SBOX[3][1212416] = 0;
      SBOX[3][1277952] = 4198400;
      SBOX[3][1343488] = 4194368;
      SBOX[3][1409024] = 2147483648;
      SBOX[3][1474560] = 2147487808;
      SBOX[3][1540096] = 64;
      SBOX[3][1605632] = 2147483712;
      SBOX[3][1671168] = 4096;
      SBOX[3][1736704] = 2147487744;
      SBOX[3][1802240] = 2151678016;
      SBOX[3][1867776] = 4160;
      SBOX[3][1933312] = 2151682048;
      SBOX[3][1998848] = 4194304;
      SBOX[3][2064384] = 4198464;
      SBOX[4] = new Array();
      SBOX[4][0] = 128;
      SBOX[4][4096] = 17039360;
      SBOX[4][8192] = 262144;
      SBOX[4][12288] = 536870912;
      SBOX[4][16384] = 537133184;
      SBOX[4][20480] = 16777344;
      SBOX[4][24576] = 553648256;
      SBOX[4][28672] = 262272;
      SBOX[4][32768] = 16777216;
      SBOX[4][36864] = 537133056;
      SBOX[4][40960] = 536871040;
      SBOX[4][45056] = 553910400;
      SBOX[4][49152] = 553910272;
      SBOX[4][53248] = 0;
      SBOX[4][57344] = 17039488;
      SBOX[4][61440] = 553648128;
      SBOX[4][2048] = 17039488;
      SBOX[4][6144] = 553648256;
      SBOX[4][10240] = 128;
      SBOX[4][14336] = 17039360;
      SBOX[4][18432] = 262144;
      SBOX[4][22528] = 537133184;
      SBOX[4][26624] = 553910272;
      SBOX[4][30720] = 536870912;
      SBOX[4][34816] = 537133056;
      SBOX[4][38912] = 0;
      SBOX[4][43008] = 553910400;
      SBOX[4][47104] = 16777344;
      SBOX[4][51200] = 536871040;
      SBOX[4][55296] = 553648128;
      SBOX[4][59392] = 16777216;
      SBOX[4][63488] = 262272;
      SBOX[4][65536] = 262144;
      SBOX[4][69632] = 128;
      SBOX[4][73728] = 536870912;
      SBOX[4][77824] = 553648256;
      SBOX[4][81920] = 16777344;
      SBOX[4][86016] = 553910272;
      SBOX[4][90112] = 537133184;
      SBOX[4][94208] = 16777216;
      SBOX[4][98304] = 553910400;
      SBOX[4][102400] = 553648128;
      SBOX[4][106496] = 17039360;
      SBOX[4][110592] = 537133056;
      SBOX[4][114688] = 262272;
      SBOX[4][118784] = 536871040;
      SBOX[4][122880] = 0;
      SBOX[4][126976] = 17039488;
      SBOX[4][67584] = 553648256;
      SBOX[4][71680] = 16777216;
      SBOX[4][75776] = 17039360;
      SBOX[4][79872] = 537133184;
      SBOX[4][83968] = 536870912;
      SBOX[4][88064] = 17039488;
      SBOX[4][92160] = 128;
      SBOX[4][96256] = 553910272;
      SBOX[4][100352] = 262272;
      SBOX[4][104448] = 553910400;
      SBOX[4][108544] = 0;
      SBOX[4][112640] = 553648128;
      SBOX[4][116736] = 16777344;
      SBOX[4][120832] = 262144;
      SBOX[4][124928] = 537133056;
      SBOX[4][129024] = 536871040;
      SBOX[5] = new Array();
      SBOX[5][0] = 268435464;
      SBOX[5][256] = 8192;
      SBOX[5][512] = 270532608;
      SBOX[5][768] = 270540808;
      SBOX[5][1024] = 268443648;
      SBOX[5][1280] = 2097152;
      SBOX[5][1536] = 2097160;
      SBOX[5][1792] = 268435456;
      SBOX[5][2048] = 0;
      SBOX[5][2304] = 268443656;
      SBOX[5][2560] = 2105344;
      SBOX[5][2816] = 8;
      SBOX[5][3072] = 270532616;
      SBOX[5][3328] = 2105352;
      SBOX[5][3584] = 8200;
      SBOX[5][3840] = 270540800;
      SBOX[5][128] = 270532608;
      SBOX[5][384] = 270540808;
      SBOX[5][640] = 8;
      SBOX[5][896] = 2097152;
      SBOX[5][1152] = 2105352;
      SBOX[5][1408] = 268435464;
      SBOX[5][1664] = 268443648;
      SBOX[5][1920] = 8200;
      SBOX[5][2176] = 2097160;
      SBOX[5][2432] = 8192;
      SBOX[5][2688] = 268443656;
      SBOX[5][2944] = 270532616;
      SBOX[5][3200] = 0;
      SBOX[5][3456] = 270540800;
      SBOX[5][3712] = 2105344;
      SBOX[5][3968] = 268435456;
      SBOX[5][4096] = 268443648;
      SBOX[5][4352] = 270532616;
      SBOX[5][4608] = 270540808;
      SBOX[5][4864] = 8200;
      SBOX[5][5120] = 2097152;
      SBOX[5][5376] = 268435456;
      SBOX[5][5632] = 268435464;
      SBOX[5][5888] = 2105344;
      SBOX[5][6144] = 2105352;
      SBOX[5][6400] = 0;
      SBOX[5][6656] = 8;
      SBOX[5][6912] = 270532608;
      SBOX[5][7168] = 8192;
      SBOX[5][7424] = 268443656;
      SBOX[5][7680] = 270540800;
      SBOX[5][7936] = 2097160;
      SBOX[5][4224] = 8;
      SBOX[5][4480] = 2105344;
      SBOX[5][4736] = 2097152;
      SBOX[5][4992] = 268435464;
      SBOX[5][5248] = 268443648;
      SBOX[5][5504] = 8200;
      SBOX[5][5760] = 270540808;
      SBOX[5][6016] = 270532608;
      SBOX[5][6272] = 270540800;
      SBOX[5][6528] = 270532616;
      SBOX[5][6784] = 8192;
      SBOX[5][7040] = 2105352;
      SBOX[5][7296] = 2097160;
      SBOX[5][7552] = 0;
      SBOX[5][7808] = 268435456;
      SBOX[5][8064] = 268443656;
      SBOX[6] = new Array();
      SBOX[6][0] = 1048576;
      SBOX[6][16] = 33555457;
      SBOX[6][32] = 1024;
      SBOX[6][48] = 1049601;
      SBOX[6][64] = 34604033;
      SBOX[6][80] = 0;
      SBOX[6][96] = 1;
      SBOX[6][112] = 34603009;
      SBOX[6][128] = 33555456;
      SBOX[6][144] = 1048577;
      SBOX[6][160] = 33554433;
      SBOX[6][176] = 34604032;
      SBOX[6][192] = 34603008;
      SBOX[6][208] = 1025;
      SBOX[6][224] = 1049600;
      SBOX[6][240] = 33554432;
      SBOX[6][8] = 34603009;
      SBOX[6][24] = 0;
      SBOX[6][40] = 33555457;
      SBOX[6][56] = 34604032;
      SBOX[6][72] = 1048576;
      SBOX[6][88] = 33554433;
      SBOX[6][104] = 33554432;
      SBOX[6][120] = 1025;
      SBOX[6][136] = 1049601;
      SBOX[6][152] = 33555456;
      SBOX[6][168] = 34603008;
      SBOX[6][184] = 1048577;
      SBOX[6][200] = 1024;
      SBOX[6][216] = 34604033;
      SBOX[6][232] = 1;
      SBOX[6][248] = 1049600;
      SBOX[6][256] = 33554432;
      SBOX[6][272] = 1048576;
      SBOX[6][288] = 33555457;
      SBOX[6][304] = 34603009;
      SBOX[6][320] = 1048577;
      SBOX[6][336] = 33555456;
      SBOX[6][352] = 34604032;
      SBOX[6][368] = 1049601;
      SBOX[6][384] = 1025;
      SBOX[6][400] = 34604033;
      SBOX[6][416] = 1049600;
      SBOX[6][432] = 1;
      SBOX[6][448] = 0;
      SBOX[6][464] = 34603008;
      SBOX[6][480] = 33554433;
      SBOX[6][496] = 1024;
      SBOX[6][264] = 1049600;
      SBOX[6][280] = 33555457;
      SBOX[6][296] = 34603009;
      SBOX[6][312] = 1;
      SBOX[6][328] = 33554432;
      SBOX[6][344] = 1048576;
      SBOX[6][360] = 1025;
      SBOX[6][376] = 34604032;
      SBOX[6][392] = 33554433;
      SBOX[6][408] = 34603008;
      SBOX[6][424] = 0;
      SBOX[6][440] = 34604033;
      SBOX[6][456] = 1049601;
      SBOX[6][472] = 1024;
      SBOX[6][488] = 33555456;
      SBOX[6][504] = 1048577;
      SBOX[7] = new Array();
      SBOX[7][0] = 134219808;
      SBOX[7][1] = 131072;
      SBOX[7][2] = 134217728;
      SBOX[7][3] = 32;
      SBOX[7][4] = 131104;
      SBOX[7][5] = 134350880;
      SBOX[7][6] = 134350848;
      SBOX[7][7] = 2048;
      SBOX[7][8] = 134348800;
      SBOX[7][9] = 134219776;
      SBOX[7][10] = 133120;
      SBOX[7][11] = 134348832;
      SBOX[7][12] = 2080;
      SBOX[7][13] = 0;
      SBOX[7][14] = 134217760;
      SBOX[7][15] = 133152;
      SBOX[7][-2147483648] = 2048;
      SBOX[7][-2147483647] = 134350880;
      SBOX[7][-2147483646] = 134219808;
      SBOX[7][-2147483645] = 134217728;
      SBOX[7][-2147483644] = 134348800;
      SBOX[7][-2147483643] = 133120;
      SBOX[7][-2147483642] = 133152;
      SBOX[7][-2147483641] = 32;
      SBOX[7][-2147483640] = 134217760;
      SBOX[7][-2147483639] = 2080;
      SBOX[7][-2147483638] = 131104;
      SBOX[7][-2147483637] = 134350848;
      SBOX[7][-2147483636] = 0;
      SBOX[7][-2147483635] = 134348832;
      SBOX[7][-2147483634] = 134219776;
      SBOX[7][-2147483633] = 131072;
      SBOX[7][16] = 133152;
      SBOX[7][17] = 134350848;
      SBOX[7][18] = 32;
      SBOX[7][19] = 2048;
      SBOX[7][20] = 134219776;
      SBOX[7][21] = 134217760;
      SBOX[7][22] = 134348832;
      SBOX[7][23] = 131072;
      SBOX[7][24] = 0;
      SBOX[7][25] = 131104;
      SBOX[7][26] = 134348800;
      SBOX[7][27] = 134219808;
      SBOX[7][28] = 134350880;
      SBOX[7][29] = 133120;
      SBOX[7][30] = 2080;
      SBOX[7][31] = 134217728;
      SBOX[7][-2147483632] = 131072;
      SBOX[7][-2147483631] = 2048;
      SBOX[7][-2147483630] = 134348832;
      SBOX[7][-2147483629] = 133152;
      SBOX[7][-2147483628] = 32;
      SBOX[7][-2147483627] = 134348800;
      SBOX[7][-2147483626] = 134217728;
      SBOX[7][-2147483625] = 134219808;
      SBOX[7][-2147483624] = 134350880;
      SBOX[7][-2147483623] = 134217760;
      SBOX[7][-2147483622] = 134219776;
      SBOX[7][-2147483621] = 0;
      SBOX[7][-2147483620] = 133120;
      SBOX[7][-2147483619] = 2080;
      SBOX[7][-2147483618] = 131104;
      SBOX[7][-2147483617] = 134350848;
      State.prototype._exchangeLR = function(v, m) {
        var t = (this.lhs >> v ^ this.rhs) & m;
        this.rhs ^= t;
        this.lhs ^= t << v;
      };
      State.prototype._exchangeRL = function(v, m) {
        var t = (this.rhs >> v ^ this.lhs) & m;
        this.lhs ^= t;
        this.rhs ^= t << v;
      };
      State.prototype.initialPerm = function(message, offset) {
        var input = message.slice(offset, offset + 8);
        this.lhs = (input[0] << 24) + (input[1] << 16) + (input[2] << 8) + input[3];
        this.rhs = (input[4] << 24) + (input[5] << 16) + (input[6] << 8) + input[7];
        this._exchangeLR(4, 252645135);
        this._exchangeLR(16, 65535);
        this._exchangeRL(2, 858993459);
        this._exchangeRL(8, 16711935);
        this._exchangeLR(1, 1431655765);
      };
      State.prototype.round = function(k) {
        var r = this.rhs, l = this.lhs;
        var f = 0;
        for (var i = 0; i < 8; i++) {
          var v = (r ^ k[i]) & State.SBOX_MASK[i];
          f += State.SBOX[i][v];
        }
        this.lhs = r;
        this.rhs = l ^ f;
      };
      State.prototype.finalPerm = function(cipherText, offset) {
        var t = this.lhs;
        this.lhs = this.rhs;
        this.rhs = t;
        this._exchangeLR(1, 1431655765);
        this._exchangeRL(8, 16711935);
        this._exchangeRL(2, 858993459);
        this._exchangeLR(16, 65535);
        this._exchangeLR(4, 252645135);
        cipherText[offset] = this.lhs >> 24 & 255;
        cipherText[offset + 1] = this.lhs >> 16 & 255;
        cipherText[offset + 2] = this.lhs >> 8 & 255;
        cipherText[offset + 3] = this.lhs & 255;
        cipherText[offset + 4] = this.rhs >> 24 & 255;
        cipherText[offset + 5] = this.rhs >> 16 & 255;
        cipherText[offset + 6] = this.rhs >> 8 & 255;
        cipherText[offset + 7] = this.rhs & 255;
      };
      var DES = C.DES = {
        _blocksize: 2,
        _keyschedule: null,
        _state: new State(),
        _init: function(k) {
          this._keyschedule = new KeySchedule(k);
        },
        encrypt: function(message, password, options) {
          options = options || {};
          var mode = options.mode || new C.mode.OFB();
          if (mode.fixOptions)
            mode.fixOptions(options);
          var m = message.constructor == String ? UTF8.stringToBytes(message) : message, iv = options.iv || util.randomBytes(8), k = password.constructor == String ? (
            // Derive key from passphrase
            C.PBKDF2(password, iv, 8, {
              asBytes: true
            })
          ) : (
            // else, assume byte array representing cryptographic key
            password
          );
          this._keyschedule = new KeySchedule(k);
          mode.encrypt(DES, m, iv);
          m = options.iv ? m : iv.concat(m);
          return options && options.asBytes ? m : util.bytesToBase64(m);
        },
        _encryptblock: function(message, offset) {
          this._state.initialPerm(message, offset);
          for (var i = 0; i <= 15; i++) {
            this._state.round(this._keyschedule.getKey(i));
          }
          this._state.finalPerm(message, offset);
        },
        decrypt: function(ciphertext, password, options) {
          options = options || {};
          var mode = options.mode || new C.mode.OFB();
          if (mode.fixOptions)
            mode.fixOptions(options);
          var c = ciphertext.constructor == String ? util.base64ToBytes(ciphertext) : ciphertext, iv = options.iv || c.splice(0, 8), k = password.constructor == String ? (
            // Derive key from passphrase
            C.PBKDF2(password, iv, 32, {
              asBytes: true
            })
          ) : (
            // else, assume byte array representing cryptographic key
            password
          );
          this._keyschedule = new KeySchedule(k);
          mode.decrypt(DES, c, iv);
          return options && options.asBytes ? c : UTF8.bytesToString(c);
        },
        _decryptblock: function(message, offset) {
          this._state.initialPerm(message, offset);
          for (var i = 15; i >= 0; i--) {
            this._state.round(this._keyschedule.getKey(i));
          }
          this._state.finalPerm(message, offset);
        }
      };
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/HMAC.js
var require_HMAC = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/HMAC.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8, Binary = charenc.Binary;
      C.HMAC = function(hasher, message, key, options) {
        if (message.constructor == String) message = UTF8.stringToBytes(message);
        if (key.constructor == String) key = UTF8.stringToBytes(key);
        if (key.length > hasher._blocksize * 4)
          key = hasher(key, { asBytes: true });
        var okey = key.slice(0), ikey = key.slice(0);
        for (var i = 0; i < hasher._blocksize * 4; i++) {
          okey[i] ^= 92;
          ikey[i] ^= 54;
        }
        var hmacbytes = hasher(okey.concat(hasher(ikey.concat(message), { asBytes: true })), { asBytes: true });
        return options && options.asBytes ? hmacbytes : options && options.asString ? Binary.bytesToString(hmacbytes) : util.bytesToHex(hmacbytes);
      };
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/MARC4.js
var require_MARC4 = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/MARC4.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8, Binary = charenc.Binary;
      var MARC4 = C.MARC4 = {
        /**
         * Public API
         */
        encrypt: function(message, password) {
          var m = UTF8.stringToBytes(message), iv = util.randomBytes(16), k = password.constructor == String ? (
            // Derive key from passphrase
            C.PBKDF2(password, iv, 32, { asBytes: true })
          ) : (
            // else, assume byte array representing cryptographic key
            password
          );
          MARC4._marc4(m, k, 1536);
          return util.bytesToBase64(iv.concat(m));
        },
        decrypt: function(ciphertext, password) {
          var c = util.base64ToBytes(ciphertext), iv = c.splice(0, 16), k = password.constructor == String ? (
            // Derive key from passphrase
            C.PBKDF2(password, iv, 32, { asBytes: true })
          ) : (
            // else, assume byte array representing cryptographic key
            password
          );
          MARC4._marc4(c, k, 1536);
          return UTF8.bytesToString(c);
        },
        /**
         * Internal methods
         */
        // The core
        _marc4: function(m, k, drop) {
          var i, j, s, temp;
          for (i = 0, s = []; i < 256; i++) s[i] = i;
          for (i = 0, j = 0; i < 256; i++) {
            j = (j + s[i] + k[i % k.length]) % 256;
            temp = s[i];
            s[i] = s[j];
            s[j] = temp;
          }
          i = j = 0;
          for (var k = -drop; k < m.length; k++) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            temp = s[i];
            s[i] = s[j];
            s[j] = temp;
            if (k < 0) continue;
            m[k] ^= s[(s[i] + s[j]) % 256];
          }
        }
      };
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/MD5.js
var require_MD5 = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/MD5.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8, Binary = charenc.Binary;
      var MD5 = C.MD5 = function(message, options) {
        var digestbytes = util.wordsToBytes(MD5._md5(message));
        return options && options.asBytes ? digestbytes : options && options.asString ? Binary.bytesToString(digestbytes) : util.bytesToHex(digestbytes);
      };
      MD5._md5 = function(message) {
        if (message.constructor == String) message = UTF8.stringToBytes(message);
        var m = util.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (var i = 0; i < m.length; i++) {
          m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
        }
        m[l >>> 5] |= 128 << l % 32;
        m[(l + 64 >>> 9 << 4) + 14] = l;
        var FF = MD5._ff, GG = MD5._gg, HH = MD5._hh, II = MD5._ii;
        for (var i = 0; i < m.length; i += 16) {
          var aa = a, bb = b, cc = c, dd = d;
          a = FF(a, b, c, d, m[i + 0], 7, -680876936);
          d = FF(d, a, b, c, m[i + 1], 12, -389564586);
          c = FF(c, d, a, b, m[i + 2], 17, 606105819);
          b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
          a = FF(a, b, c, d, m[i + 4], 7, -176418897);
          d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
          c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
          b = FF(b, c, d, a, m[i + 7], 22, -45705983);
          a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
          d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
          c = FF(c, d, a, b, m[i + 10], 17, -42063);
          b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
          a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
          d = FF(d, a, b, c, m[i + 13], 12, -40341101);
          c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
          b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
          a = GG(a, b, c, d, m[i + 1], 5, -165796510);
          d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
          c = GG(c, d, a, b, m[i + 11], 14, 643717713);
          b = GG(b, c, d, a, m[i + 0], 20, -373897302);
          a = GG(a, b, c, d, m[i + 5], 5, -701558691);
          d = GG(d, a, b, c, m[i + 10], 9, 38016083);
          c = GG(c, d, a, b, m[i + 15], 14, -660478335);
          b = GG(b, c, d, a, m[i + 4], 20, -405537848);
          a = GG(a, b, c, d, m[i + 9], 5, 568446438);
          d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
          c = GG(c, d, a, b, m[i + 3], 14, -187363961);
          b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
          a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
          d = GG(d, a, b, c, m[i + 2], 9, -51403784);
          c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
          b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
          a = HH(a, b, c, d, m[i + 5], 4, -378558);
          d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
          c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
          b = HH(b, c, d, a, m[i + 14], 23, -35309556);
          a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
          d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
          c = HH(c, d, a, b, m[i + 7], 16, -155497632);
          b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
          a = HH(a, b, c, d, m[i + 13], 4, 681279174);
          d = HH(d, a, b, c, m[i + 0], 11, -358537222);
          c = HH(c, d, a, b, m[i + 3], 16, -722521979);
          b = HH(b, c, d, a, m[i + 6], 23, 76029189);
          a = HH(a, b, c, d, m[i + 9], 4, -640364487);
          d = HH(d, a, b, c, m[i + 12], 11, -421815835);
          c = HH(c, d, a, b, m[i + 15], 16, 530742520);
          b = HH(b, c, d, a, m[i + 2], 23, -995338651);
          a = II(a, b, c, d, m[i + 0], 6, -198630844);
          d = II(d, a, b, c, m[i + 7], 10, 1126891415);
          c = II(c, d, a, b, m[i + 14], 15, -1416354905);
          b = II(b, c, d, a, m[i + 5], 21, -57434055);
          a = II(a, b, c, d, m[i + 12], 6, 1700485571);
          d = II(d, a, b, c, m[i + 3], 10, -1894986606);
          c = II(c, d, a, b, m[i + 10], 15, -1051523);
          b = II(b, c, d, a, m[i + 1], 21, -2054922799);
          a = II(a, b, c, d, m[i + 8], 6, 1873313359);
          d = II(d, a, b, c, m[i + 15], 10, -30611744);
          c = II(c, d, a, b, m[i + 6], 15, -1560198380);
          b = II(b, c, d, a, m[i + 13], 21, 1309151649);
          a = II(a, b, c, d, m[i + 4], 6, -145523070);
          d = II(d, a, b, c, m[i + 11], 10, -1120210379);
          c = II(c, d, a, b, m[i + 2], 15, 718787259);
          b = II(b, c, d, a, m[i + 9], 21, -343485551);
          a = a + aa >>> 0;
          b = b + bb >>> 0;
          c = c + cc >>> 0;
          d = d + dd >>> 0;
        }
        return util.endian([a, b, c, d]);
      };
      MD5._ff = function(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      MD5._gg = function(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      MD5._hh = function(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      MD5._ii = function(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      MD5._blocksize = 16;
      MD5._digestsize = 16;
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/PBKDF2.js
var require_PBKDF2 = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/PBKDF2.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8, Binary = charenc.Binary;
      C.PBKDF2 = function(password, salt, keylen, options) {
        if (password.constructor == String) password = UTF8.stringToBytes(password);
        if (salt.constructor == String) salt = UTF8.stringToBytes(salt);
        var hasher = options && options.hasher || C.SHA1, iterations = options && options.iterations || 1;
        function PRF(password2, salt2) {
          return C.HMAC(hasher, salt2, password2, { asBytes: true });
        }
        var derivedKeyBytes = [], blockindex = 1;
        while (derivedKeyBytes.length < keylen) {
          var block = PRF(password, salt.concat(util.wordsToBytes([blockindex])));
          for (var u = block, i = 1; i < iterations; i++) {
            u = PRF(password, u);
            for (var j = 0; j < block.length; j++) block[j] ^= u[j];
          }
          derivedKeyBytes = derivedKeyBytes.concat(block);
          blockindex++;
        }
        derivedKeyBytes.length = keylen;
        return options && options.asBytes ? derivedKeyBytes : options && options.asString ? Binary.bytesToString(derivedKeyBytes) : util.bytesToHex(derivedKeyBytes);
      };
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/PBKDF2Async.js
var require_PBKDF2Async = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/PBKDF2Async.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8, Binary = charenc.Binary;
      if (!C.nextTick) {
        if (typeof process != "undefined" && typeof process.nextTick !== "undefined") {
          C.nextTick = process.nextTick;
        } else if (typeof setTimeout !== "undefined") {
          C.nextTick = function(callback) {
            setTimeout(callback, 0);
          };
        }
      }
      C.PBKDF2Async = function(password, salt, keylen, callback, options) {
        if (password.constructor == String) password = UTF8.stringToBytes(password);
        if (salt.constructor == String) salt = UTF8.stringToBytes(salt);
        var hasher = options && options.hasher || C.SHA1, iterations = options && options.iterations || 1;
        var progressChangeHandler = options && options.onProgressChange;
        var totalIterations = Math.ceil(keylen / hasher._digestsize) * iterations;
        function fireProgressChange(currentIteration) {
          if (progressChangeHandler) {
            var iterationsSoFar = derivedKeyBytes.length / hasher._digestsize * iterations + currentIteration;
            setTimeout(function() {
              progressChangeHandler(Math.round(iterationsSoFar / totalIterations * 100));
            }, 0);
          }
        }
        function PRF(password2, salt2) {
          return C.HMAC(hasher, salt2, password2, { asBytes: true });
        }
        var nextTick = C.nextTick;
        var derivedKeyBytes = [], blockindex = 1;
        var outer, inner;
        nextTick(outer = function() {
          if (derivedKeyBytes.length < keylen) {
            var block = PRF(password, salt.concat(util.wordsToBytes([blockindex])));
            fireProgressChange(1);
            var u = block, i = 1;
            nextTick(inner = function() {
              if (i < iterations) {
                u = PRF(password, u);
                for (var j = 0; j < block.length; j++) block[j] ^= u[j];
                i++;
                fireProgressChange(i);
                nextTick(inner);
              } else {
                derivedKeyBytes = derivedKeyBytes.concat(block);
                blockindex++;
                nextTick(outer);
              }
            });
          } else {
            derivedKeyBytes.length = keylen;
            callback(
              options && options.asBytes ? derivedKeyBytes : options && options.asString ? Binary.bytesToString(derivedKeyBytes) : util.bytesToHex(derivedKeyBytes)
            );
          }
        });
      };
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/Rabbit.js
var require_Rabbit = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/Rabbit.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8, Binary = charenc.Binary;
      var x = [], c = [], b;
      var Rabbit = C.Rabbit = {
        /**
         * Public API
         */
        encrypt: function(message, password) {
          var m = UTF8.stringToBytes(message), iv = util.randomBytes(8), k = password.constructor == String ? (
            // Derive key from passphrase
            C.PBKDF2(password, iv, 32, { asBytes: true })
          ) : (
            // else, assume byte array representing cryptographic key
            password
          );
          Rabbit._rabbit(m, k, util.bytesToWords(iv));
          return util.bytesToBase64(iv.concat(m));
        },
        decrypt: function(ciphertext, password) {
          var c2 = util.base64ToBytes(ciphertext), iv = c2.splice(0, 8), k = password.constructor == String ? (
            // Derive key from passphrase
            C.PBKDF2(password, iv, 32, { asBytes: true })
          ) : (
            // else, assume byte array representing cryptographic key
            password
          );
          Rabbit._rabbit(c2, k, util.bytesToWords(iv));
          return UTF8.bytesToString(c2);
        },
        /**
         * Internal methods
         */
        // Encryption/decryption scheme
        _rabbit: function(m, k, iv) {
          Rabbit._keysetup(k);
          if (iv) Rabbit._ivsetup(iv);
          for (var s = [], i = 0; i < m.length; i++) {
            if (i % 16 == 0) {
              Rabbit._nextstate();
              s[0] = x[0] ^ x[5] >>> 16 ^ x[3] << 16;
              s[1] = x[2] ^ x[7] >>> 16 ^ x[5] << 16;
              s[2] = x[4] ^ x[1] >>> 16 ^ x[7] << 16;
              s[3] = x[6] ^ x[3] >>> 16 ^ x[1] << 16;
              for (var j = 0; j < 4; j++) {
                s[j] = (s[j] << 8 | s[j] >>> 24) & 16711935 | (s[j] << 24 | s[j] >>> 8) & 4278255360;
              }
              for (var b2 = 120; b2 >= 0; b2 -= 8)
                s[b2 / 8] = s[b2 >>> 5] >>> 24 - b2 % 32 & 255;
            }
            m[i] ^= s[i % 16];
          }
        },
        // Key setup scheme
        _keysetup: function(k) {
          x[0] = k[0];
          x[2] = k[1];
          x[4] = k[2];
          x[6] = k[3];
          x[1] = k[3] << 16 | k[2] >>> 16;
          x[3] = k[0] << 16 | k[3] >>> 16;
          x[5] = k[1] << 16 | k[0] >>> 16;
          x[7] = k[2] << 16 | k[1] >>> 16;
          c[0] = util.rotl(k[2], 16);
          c[2] = util.rotl(k[3], 16);
          c[4] = util.rotl(k[0], 16);
          c[6] = util.rotl(k[1], 16);
          c[1] = k[0] & 4294901760 | k[1] & 65535;
          c[3] = k[1] & 4294901760 | k[2] & 65535;
          c[5] = k[2] & 4294901760 | k[3] & 65535;
          c[7] = k[3] & 4294901760 | k[0] & 65535;
          b = 0;
          for (var i = 0; i < 4; i++) Rabbit._nextstate();
          for (var i = 0; i < 8; i++) c[i] ^= x[i + 4 & 7];
        },
        // IV setup scheme
        _ivsetup: function(iv) {
          var i0 = util.endian(iv[0]), i2 = util.endian(iv[1]), i1 = i0 >>> 16 | i2 & 4294901760, i3 = i2 << 16 | i0 & 65535;
          c[0] ^= i0;
          c[1] ^= i1;
          c[2] ^= i2;
          c[3] ^= i3;
          c[4] ^= i0;
          c[5] ^= i1;
          c[6] ^= i2;
          c[7] ^= i3;
          for (var i = 0; i < 4; i++) Rabbit._nextstate();
        },
        // Next-state function
        _nextstate: function() {
          for (var c_old = [], i = 0; i < 8; i++) c_old[i] = c[i];
          c[0] = c[0] + 1295307597 + b >>> 0;
          c[1] = c[1] + 3545052371 + (c[0] >>> 0 < c_old[0] >>> 0 ? 1 : 0) >>> 0;
          c[2] = c[2] + 886263092 + (c[1] >>> 0 < c_old[1] >>> 0 ? 1 : 0) >>> 0;
          c[3] = c[3] + 1295307597 + (c[2] >>> 0 < c_old[2] >>> 0 ? 1 : 0) >>> 0;
          c[4] = c[4] + 3545052371 + (c[3] >>> 0 < c_old[3] >>> 0 ? 1 : 0) >>> 0;
          c[5] = c[5] + 886263092 + (c[4] >>> 0 < c_old[4] >>> 0 ? 1 : 0) >>> 0;
          c[6] = c[6] + 1295307597 + (c[5] >>> 0 < c_old[5] >>> 0 ? 1 : 0) >>> 0;
          c[7] = c[7] + 3545052371 + (c[6] >>> 0 < c_old[6] >>> 0 ? 1 : 0) >>> 0;
          b = c[7] >>> 0 < c_old[7] >>> 0 ? 1 : 0;
          for (var g = [], i = 0; i < 8; i++) {
            var gx = x[i] + c[i] >>> 0;
            var ga = gx & 65535, gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb, gl = ((gx & 4294901760) * gx >>> 0) + ((gx & 65535) * gx >>> 0) >>> 0;
            g[i] = gh ^ gl;
          }
          x[0] = g[0] + (g[7] << 16 | g[7] >>> 16) + (g[6] << 16 | g[6] >>> 16);
          x[1] = g[1] + (g[0] << 8 | g[0] >>> 24) + g[7];
          x[2] = g[2] + (g[1] << 16 | g[1] >>> 16) + (g[0] << 16 | g[0] >>> 16);
          x[3] = g[3] + (g[2] << 8 | g[2] >>> 24) + g[1];
          x[4] = g[4] + (g[3] << 16 | g[3] >>> 16) + (g[2] << 16 | g[2] >>> 16);
          x[5] = g[5] + (g[4] << 8 | g[4] >>> 24) + g[3];
          x[6] = g[6] + (g[5] << 16 | g[5] >>> 16) + (g[4] << 16 | g[4] >>> 16);
          x[7] = g[7] + (g[6] << 8 | g[6] >>> 24) + g[5];
        }
      };
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/SHA1.js
var require_SHA1 = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/SHA1.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8, Binary = charenc.Binary;
      var SHA1 = C.SHA1 = function(message, options) {
        var digestbytes = util.wordsToBytes(SHA1._sha1(message));
        return options && options.asBytes ? digestbytes : options && options.asString ? Binary.bytesToString(digestbytes) : util.bytesToHex(digestbytes);
      };
      SHA1._sha1 = function(message) {
        if (message.constructor == String) message = UTF8.stringToBytes(message);
        var m = util.bytesToWords(message), l = message.length * 8, w = [], H0 = 1732584193, H1 = -271733879, H2 = -1732584194, H3 = 271733878, H4 = -1009589776;
        m[l >> 5] |= 128 << 24 - l % 32;
        m[(l + 64 >>> 9 << 4) + 15] = l;
        for (var i = 0; i < m.length; i += 16) {
          var a = H0, b = H1, c = H2, d = H3, e = H4;
          for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = m[i + j];
            else {
              var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
              w[j] = n << 1 | n >>> 31;
            }
            var t = (H0 << 5 | H0 >>> 27) + H4 + (w[j] >>> 0) + (j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 : j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 : j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 : (H1 ^ H2 ^ H3) - 899497514);
            H4 = H3;
            H3 = H2;
            H2 = H1 << 30 | H1 >>> 2;
            H1 = H0;
            H0 = t;
          }
          H0 += a;
          H1 += b;
          H2 += c;
          H3 += d;
          H4 += e;
        }
        return [H0, H1, H2, H3, H4];
      };
      SHA1._blocksize = 16;
      SHA1._digestsize = 20;
    })();
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/SHA256.js
var require_SHA256 = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/lib/SHA256.js"() {
    (function() {
      var C = typeof window === "undefined" ? require_Crypto().Crypto : window.Crypto;
      var util = C.util, charenc = C.charenc, UTF8 = charenc.UTF8, Binary = charenc.Binary;
      var K = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      var SHA256 = C.SHA256 = function(message, options) {
        var digestbytes = util.wordsToBytes(SHA256._sha256(message));
        return options && options.asBytes ? digestbytes : options && options.asString ? Binary.bytesToString(digestbytes) : util.bytesToHex(digestbytes);
      };
      SHA256._sha256 = function(message) {
        if (message.constructor == String) message = UTF8.stringToBytes(message);
        var m = util.bytesToWords(message), l = message.length * 8, H = [
          1779033703,
          3144134277,
          1013904242,
          2773480762,
          1359893119,
          2600822924,
          528734635,
          1541459225
        ], w = [], a, b, c, d, e, f, g, h, i, j, t1, t2;
        m[l >> 5] |= 128 << 24 - l % 32;
        m[(l + 64 >> 9 << 4) + 15] = l;
        for (var i = 0; i < m.length; i += 16) {
          a = H[0];
          b = H[1];
          c = H[2];
          d = H[3];
          e = H[4];
          f = H[5];
          g = H[6];
          h = H[7];
          for (var j = 0; j < 64; j++) {
            if (j < 16) w[j] = m[j + i];
            else {
              var gamma0x = w[j - 15], gamma1x = w[j - 2], gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3, gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
              w[j] = gamma0 + (w[j - 7] >>> 0) + gamma1 + (w[j - 16] >>> 0);
            }
            var ch = e & f ^ ~e & g, maj = a & b ^ a & c ^ b & c, sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22), sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
            t1 = (h >>> 0) + sigma1 + ch + K[j] + (w[j] >>> 0);
            t2 = sigma0 + maj;
            h = g;
            g = f;
            f = e;
            e = d + t1 >>> 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 >>> 0;
          }
          H[0] += a;
          H[1] += b;
          H[2] += c;
          H[3] += d;
          H[4] += e;
          H[5] += f;
          H[6] += g;
          H[7] += h;
        }
        return H;
      };
      SHA256._blocksize = 16;
      SHA256._digestsize = 32;
    })();
  }
});

// require("./lib/**/*.js") in node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/cryptojs.js
var globRequire_lib_js;
var init_ = __esm({
  'require("./lib/**/*.js") in node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/cryptojs.js'() {
    globRequire_lib_js = __glob({
      "./lib/AES.js": () => require_AES(),
      "./lib/BlockModes.js": () => require_BlockModes(),
      "./lib/Crypto.js": () => require_Crypto(),
      "./lib/CryptoMath.js": () => require_CryptoMath(),
      "./lib/DES.js": () => require_DES(),
      "./lib/HMAC.js": () => require_HMAC(),
      "./lib/MARC4.js": () => require_MARC4(),
      "./lib/MD5.js": () => require_MD5(),
      "./lib/PBKDF2.js": () => require_PBKDF2(),
      "./lib/PBKDF2Async.js": () => require_PBKDF2Async(),
      "./lib/Rabbit.js": () => require_Rabbit(),
      "./lib/SHA1.js": () => require_SHA1(),
      "./lib/SHA256.js": () => require_SHA256()
    });
  }
});

// node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/cryptojs.js
var require_cryptojs = __commonJS({
  "node_modules/.pnpm/cryptojs@2.5.3/node_modules/cryptojs/cryptojs.js"(exports) {
    init_();
    var Crypto2 = exports.Crypto = require_Crypto().Crypto;
    [
      "CryptoMath",
      "BlockModes",
      "DES",
      "AES",
      "HMAC",
      "MARC4",
      "MD5",
      "PBKDF2",
      "PBKDF2Async",
      "Rabbit",
      "SHA1",
      "SHA256"
    ].forEach(function(path) {
      globRequire_lib_js("./lib/" + path + ".js");
    });
  }
});
export default require_cryptojs();
/*! Bundled license information:

cryptojs/lib/BlockModes.js:
  (*!
   * Crypto-JS contribution from Simon Greatrix
   *)
*/
//# sourceMappingURL=cryptojs.js.map
