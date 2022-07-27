!(function (a) {    // a: window
console.log("🚀 ~ file: fincert.js ~ line 2 ~ a", a)
  
  var c = {},   //나중에 FinCert.loadUtil 에 넣을 거
    e = a.crypto || a.msCrypto,
    s = e ? e.subtle || e.webkitSubtle : void 0,
    l = !1;
  function f(e, t, n, o, i, r, d) {
    console.log("🚀 ~ file: fincert.js ~ line 9 ~ f ~ t", t)
    console.log("🚀 ~ file: fincert.js ~ line 9 ~ f ~ e", e)
    if (e === t) {
      var a = document.createElement('script');
      (a.innerHTML = n), r && (a.onload = r), i.getElementsByTagName('head')[0].appendChild(a);
    } else
      d
        ? (console.log("'" + o + "' 파일의 해시값 오류로 결제원 WEB서버에서 다운로드 합니다."), u(o, i, r))
        : (console.log("'" + o + "' 파일의 해시값 오류로 Backup CDN서버에서 다운로드 합니다."),
          c.getValidJSForNonWebStandardComplianceBroswer(t, o, i, r, !0));
  }
  function u(e, t, n) {
    var o = document.createElement('script');
    (o.src = l
      ? 'https://4user.yeskey.or.kr/v1/' + e + '?time=' + g()
      : 'https://4user.yeskey.or.kr/v1/' + e + '?2022-07-07T06_17_31.948Z'),
      (o.charset = 'utf-8'),
      (o.type = 'text/javascript'),
      n && (o.onload = n),
      t && t.body && t.body.appendChild(o);
  }
  function m(e) {
    var t = new Uint8Array(e);
    return btoa(String.fromCharCode.apply(null, t));
  }
  function g() {
    var e = new Date(),
      t = e.getFullYear(),
      n = new String(e.getMonth() + 1),
      o = new String(e.getDate()),
      i = new String(e.getHours());
    return (
      1 == n.length && (n = '0' + n), 1 == o.length && (o = '0' + o), 1 == i.length && (i = '0' + i), t + n + o + i
    );
  }
  void console.log(g());
  (c.getValidJSForWebStandardComplianceBroswer = function (e, t, n, o, i, r) {
    var d,
      a = document.createElement('script');
    (a.id = e),
      (a.type = 'text/javascript'),
      (d = r ? 'https://sdk2.yeskey.or.kr' : 'https://sdk.yeskey.or.kr'),
      (a.src = l ? d + '/v1/' + n + '?time=' + g() : d + '/v1/' + n + '?2022-07-07T06_17_31.948Z'),
      (a.charset = 'utf-8'),
      (a.integrity = 'sha256-' + t),
      (a.crossOrigin = 'anonymous'),
      i && (a.onload = i),
      (a.onerror = function () {
        r
          ? (console.log("'" + n + "' 파일의 해시값 오류로 결제원 WEB서버에서 다운로드 합니다."), u(n, o, i))
          : c.getValidJSForWebStandardComplianceBroswer(e, t, n, o, i, !0);
      }),
      o && o.body && o.body.appendChild(a);
  }),
    (c.getValidJSForNonWebStandardComplianceBroswer = function (t, n, o, i, r) {
      var e,
        d = new XMLHttpRequest();
      (d.onreadystatechange = function () {
        if (d.readyState === d.DONE) {
          if ('' == d.responseText) {
            if (r) return console.log('방화벽 등으로 responseText가 없음 - 결제원 웹서버로 시도'), void u(n, o, i);
            console.log('방화벽 등으로 responseText가 없음 - 백업 CDN으로 재시도'),
              c.getValidJSForNonWebStandardComplianceBroswer(t, n, o, i, !0);
          }
          var e = new Uint8Array(
            (function (e, t) {
              var n;
              t = t || 1 / 0;
              for (var o = e.length, i = null, r = [], d = 0; d < o; d++) {
                if (55295 < (n = e.charCodeAt(d)) && n < 57344) {
                  if (!i) {
                    if (56319 < n) {
                      -1 < (t -= 3) && r.push(239, 191, 189);
                      continue;
                    }
                    if (d + 1 === o) {
                      -1 < (t -= 3) && r.push(239, 191, 189);
                      continue;
                    }
                    i = n;
                    continue;
                  }
                  if (n < 56320) {
                    -1 < (t -= 3) && r.push(239, 191, 189), (i = n);
                    continue;
                  }
                  (n = ((i - 55296) << 10) | (n - 56320) | 65536), (i = null);
                } else i && (-1 < (t -= 3) && r.push(239, 191, 189), (i = null));
                if (n < 128) {
                  if ((t -= 1) < 0) break;
                  r.push(n);
                } else if (n < 2048) {
                  if ((t -= 2) < 0) break;
                  r.push((n >> 6) | 192, (63 & n) | 128);
                } else if (n < 65536) {
                  if ((t -= 3) < 0) break;
                  r.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
                } else {
                  if (!(n < 2097152)) throw new Error('Invalid code point');
                  if ((t -= 4) < 0) break;
                  r.push((n >> 18) | 240, ((n >> 12) & 63) | 128, ((n >> 6) & 63) | 128, (63 & n) | 128);
                }
              }
              return r;
            })(d.responseText),
          );
          if (a.crypto)
            try {
              s.digest('SHA-256', e).then(function (e) {
                  console.log("🚀 ~ file: fincert.js ~ line 116 ~ e", e)
                  console.log("🚀 ~ file: fincert.js ~ line 116 ~ t", t)
                  console.log("🚀 ~ file: fincert.js ~ line 117 ~ d.responseText", d.responseText)
                  console.log("🚀 ~ file: fincert.js ~ line 118 ~ n", n)
                  console.log("🚀 ~ file: fincert.js ~ line 119 ~ o", o)
                  console.log("🚀 ~ file: fincert.js ~ line 120 ~ r", r)
                  console.log("🚀 ~ file: fincert.js ~ line 120 ~ i", i)
                f(m(e), t, d.responseText, n, o, i, r);
              });
            } catch (e) {
              console.log('WebCrypto 객체에 subtle 또는 webkitSubtle 객체에 digest 함수 없음!!'), u(n, o, i);
            }
          else
            try {
              s.digest('SHA-256', e).oncomplete = function (e) {
                f(m(e.target.result), t, d.responseText, n, o, i, r);
                console.log("🚀 ~ file: fincert.js ~ line 134 ~ s.digest('SHA-256',e).oncomplete ~ e", e)
                console.log("🚀 ~ file: fincert.js ~ line 133 ~ s.digest('SHA-256',e).oncomplete ~ r", r)
                console.log("🚀 ~ file: fincert.js ~ line 133 ~ s.digest('SHA-256',e).oncomplete ~ i", i)
                console.log("🚀 ~ file: fincert.js ~ line 133 ~ s.digest('SHA-256',e).oncomplete ~ o", o)
                console.log("🚀 ~ file: fincert.js ~ line 133 ~ s.digest('SHA-256',e).oncomplete ~ n", n)
                console.log("🚀 ~ file: fincert.js ~ line 133 ~ s.digest('SHA-256',e).oncomplete ~ d.responseText", d.responseText)
                console.log("🚀 ~ file: fincert.js ~ line 133 ~ s.digest('SHA-256',e).oncomplete ~ t", t)
              };
            } catch (e) {
              console.log('WebCrypto 객체에 subtle 또는 webkitSubtle 객체에 digest 함수 없음!!'), u(n, o, i);
            }
        }
      }),
        (e = r ? 'https://sdk2.yeskey.or.kr' : 'https://sdk.yeskey.or.kr'),
        (e = l ? e + '/v1/' + n + '?time=' + g() : e + '/v1/' + n + '?2022-07-07T06_17_31.948Z'),
        d.open('GET', e),
        d.send();
    }),
    a.FinCert || (a.FinCert = {}),
    (a.FinCert.loadUtil = c);
})(window),



  'undefined' == typeof FinCert && (FinCert = {}),
  (function (n, e) {    
    var o = (e.Sdk = e.Sdk || {}),
      r = (e.loadUtil = e.loadUtil || {}),
      d = 'bcHRJsHhY/JWYBObQjt/mPIv50HMTLBIvrYIdQtCpe0=',
      a = 'NbZsFUaecdSe1gOC2VLhO2qy1AtT8p2u9n87YS4tU80=',
      i = !1,
      c = !1,
      s = !1,
      l = n.crypto || n.msCrypto;
    o.init ||
      (
        (o.waitUntilLoadingCompleted = function (e) {
          console.log("🚀 ~ file: fincert.js ~ line 160 ~ ((o.waitUntilLoadingCompleted ~ e", e)
        var t = document.getElementById('finCertSdkIframe');
        if (!(t && t.contentWindow && t.contentWindow.FinCert))
          return (
            console.log('wait until loading fincert sdk finished.'),
            void (initLoadingTimerId = setTimeout(o.waitUntilLoadingCompleted, 100, e))
          );
        console.log('loading fincert sdk is finished.'), (c = !0), o.init(e);
        }),
        (o.init = function (e) {
            if (l)
            if (c)
                s &&
                document
                    .getElementById('finCertSdkIframe')
                    .contentWindow.FinCert.Interface.setClientFrameJsLoadingFinished(),
                document.getElementById('finCertSdkIframe').contentWindow.FinCert.Sdk.init(e);
            else {
                if (i) {
                if (
                    ((t = {
                    message: '이미 금융인증서비스 실행중입니다. 잠시 기다리세요. (init)',
                    cause: null,
                    code: 100008,
                    }),
                    !e || !e.fail)
                )
                    throw t;
                return void e.fail(t);
                }
                (i = !0), o.waitUntilLoadingCompleted(e);
            }
            else {
            var t = {
                message: '미지원 브라우저 입니다. 다른 브라우저를 사용하시기 바랍니다.',
                cause: null,
                code: 900001,
            };
            if (!e || !e.fail) throw t;
            e.fail(t);
            }
        }),
        (o.issue = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.issue(e);
        }),
        (o.regSimpleKeyToken = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.regSimpleKeyToken(e);
        }),
        (o.sign = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.sign(e);
        }),
        (o.signWithoutUI = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.signWithoutUI(e);
        }),
        (o.myDataSign = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.myDataSign(e);
        }),
        (o.myDataSignWithoutUI = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.myDataSignWithoutUI(e);
        }),
        (o.manage = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.manage(e);
        }),
        (o.checkCloudConn = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.checkCloudConn(e);
        }),
        (o.setSubAuthData = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.setSubAuthData(e);
        }),
        (o.getCertInfoList = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.getCertInfoList(e);
        }),
        (o.getUserInfo = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.getUserInfo(e);
        }),
        (o.setAuthData = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.setAuthData(e);
        }),
        (o.getCertInfo = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.getCertInfo(e);
        }),
        (o.getSignerCertFromSignedVal = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.getSignerCertFromSignedVal(e);
        }),
        (o.isOverseasIp = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.isOverseasIp(e);
        }),
        (o.registerDevice = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.registerDevice(e);
        }),
        (o.cancelDeviceRegister = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.cancelDeviceRegister(e);
        }),
        (o.getRegisterDeviceStatus = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.getRegisterDeviceStatus(e);
        }),
        (o.disconnectCloudConn = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.disconnectCloudConn(e);
        }),
        (o.convertBase64UrlToBase64 = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.convertBase64UrlToBase64(e);
        }),
        (o.convertBase64ToBase64Url = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.convertBase64ToBase64Url(e);
        }),
        (o.signEnvelop = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.signEnvelop(e);
        }),
        (o.makeAutoConnInfo = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.makeAutoConnInfo(e);
        }),
        (o.setAutoConnInfo = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.setAutoConnInfo(e);
        }),
        (o.getAvailableAuthMethod = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            t && t.contentWindow.FinCert.Sdk.getAvailableAuthMethod(e);
        }),
        (o.abort = function (e) {
            var t = document.getElementById('finCertSdkIframe');
            if (t) t.contentWindow.FinCert.Sdk.abort(e);
            else if (e && e.callback)
            try {
                e.callback();
            } catch (e) {
                console.warn('callback 함수를 호출하는 동안 에러가 발생하였습니다. 확인하시기 바랍니다.'),
                console.warn(e.message);
            }
        })
        );
    var f = function (o) {
    console.log("🚀 ~ file: fincert.js ~ line 306 ~ f ~ o", o)
      if ((console.log('SRI Hash 지원 여부 : ' + o), !document.getElementById('finCertSdkIframe'))) {
        var i = document.createElement('iframe');
        (i.style.position = 'fixed'),
          (i.style.zIndex = 3000001),
          (i.style.top = '0px'),
          (i.style.left = '0px'),
          (i.style.width = '100%'),
          (i.style.height = '100%'),
          (i.style.backgroundColor = 'transparent'),
          (i.style.display = 'none'),
          (i.title = '금융인증서비스 개인'),
          (i.frameBorder = 0),
          i.setAttribute('id', 'finCertSdkIframe'),
          (i.onload = function () {
            var e = i.contentWindow,
              t = e.document;
            e.addEventListener('message', function (e) {
              'clientFrameJsLoadingFinished' === e.data &&
                (console.log('clientFrame.js 로딩 완료'),
                (s = !0),
                c &&
                  document
                    .getElementById('finCertSdkIframe')
                    .contentWindow.FinCert.Interface.setClientFrameJsLoadingFinished());
            });
            var n = t.createElement('iframe');
            (n.src = 'https://4user.yeskey.or.kr/fincert/web/v1/iframe.htm?2022-07-07T06_17_31.948Z&sriHash=' + o),
              (n.style.top = '0px'),
              (n.style.left = '-1px'),
              (n.style.width = '1px'),
              (n.style.height = '1px'),
              (n.tabIndex = -1),
              (n.frameBorder = 0),
              n.setAttribute('id', 'finCertSdkIframeTag'),
              t && t.body && t.body.appendChild(n),
              o
                ? r.getValidJSForWebStandardComplianceBroswer('finCertUIScriptTag', a, 'fincert-ui.js', t, !1)
                : r.getValidJSForNonWebStandardComplianceBroswer(a, 'fincert-ui.js', t, !1),
              o
                ? r.getValidJSForWebStandardComplianceBroswer('finCertSdkScriptTag', d, 'sdk.js', t, !1)
                : r.getValidJSForNonWebStandardComplianceBroswer(d, 'sdk.js', t, !1);
          }),
          window.document && window.document.body && window.document.body.appendChild(i);
      }
    };
    !(function e() {
      if (n.document && 'complete' !== n.document.readyState)
        return console.log('document.readyState : ' + n.document.readyState), void setTimeout(e, 50);
      if (l) {
        var t = document.createElement('link');
        (t.type = 'text/css'),
          (t.rel = 'stylesheet'),
          (t.href = 'https://4user.yeskey.or.kr/v1/must-integrity-fail.css'),
          (t.integrity = 'sha256-MUSTFAIL'),
          (t.crossOrigin = 'anonymous'),
          (t.onload = f.bind(this, !1)),
          (t.onerror = f.bind(this, !0)),
          n.document.head.appendChild(t);
      }
    })();
  })(window, FinCert);
