

this.ai = function (af) {
console.log("🚀 ~ file: YesKey_pad.js ~ line 4 ~ af", af)
//   af.stopPropagation();
//   af.preventDefault();
//   af.stopImmediatePropagation();
  if (af.type == 'keyup' && af.keyCode != '13') {
    return;
  }
  var ab = i._keypadinfo;
  var I = i._keypaditems;
  var r = nq(i._element);
  var G = nq(i._hashelement);
  var E = nq(i._parent);
  var u = nq('#' + i._uuid);
  var o = af.target;
  var q = nq(o).attr('data-action');
  var M = null;
  if (ab.touch.use == true && !i._useMultiCursor) {
    i.touch(o, L.n2b(ab.touch.touchEventMode, 'default'));
  }
  if (ab.preview.use == true && !i._useMultiCursor) {
    i.preview(o);
  }
  if (q == null || q == '') {
    return;
  }
  var V =
    typeof npPfsExtension != 'undefined' &&
    typeof npPfsExtension.formatter == 'function' &&
    r.attr('nppfs-formatter-type') != undefined;
  var P = typeof ab.text != 'undefined' && ab.text.use == true && r.attr('data-keypad-text') == 'on';
  if (P) {
    M = nq('div.kpd-text span.textfield', u);
  }
  var T = r.prop('maxlength');
  if (L.au(T)) {
    T = 0;
  }
  if (q.indexOf('action') == 0) {
    if (q.indexOf('show') == 7) {
      var U = q.substring(12);
      nq('.kpd-group', u).hide();
      nq('.kpd-group.' + U, u).show();
      if (D.and) {
        i.close();
        npVCtrl.isRefresh = true;
        setTimeout(function () {
          u.show();
          nq('.kpd-group.' + U, u).show();
          if (r.attr('data-keypad-mode') == 'standalone' && npVCtrl.standalone) {
            nq('#' + i._uuid + '_bg_img').focus();
          } else {
            nq('#' + i._keypadinfo.keypadUuid + '_bg_img').focus();
          }
          npVCtrl.isRefresh = false;
        }, 100);
      } else {
        if (r.attr('data-keypad-mode') == 'standalone' && npVCtrl.standalone) {
          nq('#' + i._uuid + '_bg_img').focus();
        } else {
          nq('#' + i._keypadinfo.keypadUuid + '_bg_img').focus();
        }
      }
    } else {
      if (q.indexOf('hide') == 7) {
        i.hide();
      } else {
        if (q.indexOf('close') == 7) {
          i.close();
        } else {
          if (q.indexOf('delete') == 7) {
            i.deleteone();
          } else {
            if (q.indexOf('clear') == 7) {
              r.val('');
              if (r.attr('data-keypad-mode') == 'standalone' && npVCtrl.standalone) {
                i._encvalue = '';
                i._hval = '';
              } else {
                G.val('');
              }
              if (P) {
                M.text('');
              }
              if (V) {
                var R = nq("input[name='" + r.attr('name') + "__FORMATTER__']");
                R.val('');
              }
              L.dispatchEvent(
                i._element,
                'keypress',
                {
                  which: 8,
                  keyCode: 8,
                },
                true,
                true,
              );
              L.dispatchEvent(
                i._element,
                'keyup',
                {
                  which: 8,
                  keyCode: 8,
                },
                true,
                true,
              );
              if (i.useExtendUI && i.extendUI) {
                i.extendUI.input(i, 8, 'clear');
              }
            } else {
              if (q.indexOf('enter') == 7) {
                i.doenter();
              } else {
                if (q.indexOf('refresh') == 7) {
                  var U = q.substring(15);
                  if (r.attr('data-keypad-mode') == 'standalone' && npVCtrl.standalone) {
                    var F = null;
                    if (!L.bn(U)) {
                      var O = U == 'upper' ? 1 : U == 'special' ? 2 : 0;
                      var H = new ButtomGroup(ab, I[O]);
                      var Y = nq('.kpd-group.' + U, u);
                      nq('.kpd-button.kpd-image', Y).remove();
                      var v = nq('#target', Y)[0];
                      H.loadImages(v, U, u, 'r', function () {
                        nq('.kpd-group.' + U, u).append(H.make());
                      });
                      F = nq('.kpd-group.' + U + ' .kpd-button', u);
                    } else {
                      var H = new ButtomGroup(ab, I[0]);
                      nq('.kpd-button.kpd-image', u).remove();
                      var v = nq('#target', u)[0];
                      H.loadImages(v, U, u, 'r', function () {
                        nq('.kpd-group', u).append(H.make());
                      });
                      F = nq('.kpd-group .kpd-button', u);
                    }
                    if (F != null) {
                      if (D.isMobileDevice()) {
                        if (D.ios) {
                          F.on('touchstart', i.ai);
                        } else {
                          F.on('click', i.ai);
                        }
                      } else {
                        F.on('click keyup', i.ai);
                      }
                    }
                  } else {
                    i.refreshDiv(U);
                  }
                  if (u.is(':visible') == true) {
                    if (D.and) {
                      i.close();
                      npVCtrl.isRefresh = true;
                      setTimeout(function () {
                        if (r.is(':visible') && r.css('visibility') === 'visible') {
                          r[0].focus();
                        } else {
                          npVCtrl.showKeypad(r.attr('name'));
                        }
                      }, 100);
                    } else {
                      nq('#' + i._uuid + '_bg_img').focus();
                    }
                  }
                  nq(window).trigger({
                    type: 'resize',
                    form: L.au(i._element.form) ? '' : nq(i._element.form).attr('name'),
                    target: i._element,
                    name: r.attr('name'),
                  });
                } else {
                  if (q.indexOf('link') == 7) {
                    var Q = q.split('|');
                    var s = '';
                    var Z = [];
                    var n = Q[1];
                    if (Q.length > 3) {
                      for (var aa = 2; aa < Q.length; aa++) {
                        Z.push(Q[aa]);
                      }
                      s = Z.join('|');
                    } else {
                      s = Q[2];
                    }
                    window.open(s, n);
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {
    if (q.indexOf('data') == 0) {
      var B = q.indexOf(':', 5) == -1 ? 45 : q.indexOf(':', 5);
      var W = q.substring(5, B);
      var A = B >= 0 && q.length > B + 1 ? q.substring(B + 1) : '*';
      if (W == 'korean') {
        A = String.fromCharCode(A);
        var t = i._element;
        var C = i._hashelement;
        if (A.charCodeAt(0) < 128) {
          L.val(t, L.val(C) + A);
          L.val(C, L.val(C) + A);
        } else {
          var S = L.val(C) + A;
          var x = npVCtrl.Hangul.splitWord(S, 2);
          var J = npVCtrl.Hangul.composeHangul(x[1]);
          L.val(t, x[0] + J);
          L.val(C, x[0] + J);
        }
        L.val(t, L.val(C));
        if (P) {
          M.text(nq(t).val());
        }
      } else {
        if (r.attr('data-keypad-mode') == 'standalone' && npVCtrl.standalone) {
          var ac = String.fromCharCode(parseInt(W.substring(1)));
          var p = L.encrypt(ac, L.ha(npVCtrl.standalonekey), 'ECB', AES.eU);
        } else {
          var p = npVCtrl.encrypt(W);
        }
        if (A.indexOf('p') == 0) {
          if (r.attr('data-keypad-mode') == 'standalone' && npVCtrl.standalone) {
            var X = parseInt(A.substring(1));
            var y = '';
            if (X >= 48 && X <= 57) {
              y = '1';
            } else {
              if (X >= 65 && X <= 90) {
                y = 'A';
              } else {
                if (X >= 97 && X <= 122) {
                  y = 'a';
                } else {
                  if (
                    (X >= 32 && X <= 47) ||
                    (X >= 58 && X <= 64) ||
                    (X >= 91 && X <= 96) ||
                    (X >= 123 && X <= 126) ||
                    X == 168 ||
                    X == 126
                  ) {
                    y = '_';
                  }
                }
              }
            }
            A = r.attr('type') == 'text' ? String.fromCharCode(X) : y;
          } else {
            A = String.fromCharCode(parseInt(A.substring(1)));
          }
        }
        if (V) {
          r.val(npPfsExtension.formatter(r, false));
        }
        if (r.attr('data-keypad-action') == 'amount') {
          r.val(L.uncomma(r.val()));
        }
        if (T <= 0 || r.val().length < T) {
          r.val(r.val() + A);
          if (r.attr('data-keypad-mode') == 'standalone' && npVCtrl.standalone) {
            i._encvalue = i._encvalue + p;
            i._hval = L.sha256(i._encvalue);
          } else {
            G.val(G.val() + p);
          }
          if (V) {
            var R = nq("input[name='" + r.attr('name') + "__FORMATTER__']");
            R.val(R.val() + '1');
          }
          var z = A.charCodeAt(0);
          L.dispatchEvent(
            i._element,
            'keypress',
            {
              which: z,
              keyCode: z,
            },
            true,
            true,
          );
          L.dispatchEvent(
            i._element,
            'keyup',
            {
              which: z,
              keyCode: z,
            },
            true,
            true,
          );
          var ae = i.length();
          if (i.useExtendUI && i.extendUI) {
            i.extendUI.input(i, z, 'data');
          }
          var K = r.attr('data-keypad-next');
          if (T > 0 && ae >= T && !L.bn(K)) {
            if (K == '__hide__') {
              i.hide();
            } else {
              if (K == '__doenter__') {
                i.doenter();
              } else {
                var m = nq("input[name='" + K + "']");
                if (m.is(':visible') && m.css('visibility') === 'visible') {
                  m[0].focus();
                } else {
                  npVCtrl.showKeypad(K);
                }
              }
            }
          }
          if (P) {
            if (r.attr('type') == 'password') {
              M.text(M.text() + '*');
            } else {
              M.text(M.text() + A);
            }
          }
        }
        if (V) {
          r.val(npPfsExtension.formatter(r, true));
          if (P && typeof r.attr('nppfs-formatter-type') != 'undefined') {
            M.text(r.val());
          }
        }
        if (r.attr('data-keypad-action') == 'amount') {
          r.val(L.comma(r.val()));
          if (P) {
            M.text(r.val());
          }
        }
      }
      if (ab.type == 'keyboard') {
        if (typeof ab.capslock != 'undefined' && ab.capslock == false) {
          if (
            typeof ab.shift != 'undefined' &&
            ab.shift == true &&
            nq('.kpd-group.upper', u).css('display') != 'none'
          ) {
            if (typeof ab.range != 'undefined' && ab.range != '') {
              nq('.kpd-group', u).hide();
              if (ab.range.indexOf('lower') >= 0) {
                nq('.kpd-group.lower', u).show();
              } else {
                if (ab.range.indexOf('upper') >= 0) {
                  nq('.kpd-group.upper', u).show();
                } else {
                  if (ab.range.indexOf('special') >= 0) {
                    nq('.kpd-group.special', u).show();
                  } else {
                    nq('.kpd-group.lower', u).show();
                  }
                }
              }
            } else {
              nq('.kpd-group', u).hide();
              nq('.kpd-group.lower', u).show();
            }
          }
        }
      }
    } else {
    }
  }
//   af.stopPropagation();
//   af.preventDefault();
//   af.stopImmediatePropagation();
};
