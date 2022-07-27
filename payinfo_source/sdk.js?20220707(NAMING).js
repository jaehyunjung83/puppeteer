(function () {
  if (typeof FinCert === "undefined") {
    FinCert = {};
  }
  function G95(window, FinCert) { //window에 FinCert(공란으로 받은) method 만들어 붙이기
    var E95, W95
    // , p95;
    E95 = FinCert.HttpClient = FinCert.HttpClient || {};
    W95 = FinCert.util = FinCert.util || {};
    // p95 = finCertClient.main;
    E95.request = function (Q95, f95, a95, P95, c95, I95, L95, N95, h95) {
    console.log("🚀 ~ file: sdk.js?20220707(NAMING).js ~ line 12 ~ G95 ~ Q95, f95, a95, P95, c95, I95, L95, N95, h95", Q95, f95, a95, P95, c95, I95, L95, N95, h95)
    // P95: Bearer Token
      console.log("%crequest on HttpClient", "color: #f33;");
      return new Promise(function (resolve, reject) {
        var xmlRequest, k95;
        xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = function () {
          var certResponseText, parsedRes, K55;
          if (xmlRequest.readyState == XMLHttpRequest.DONE) {
            certResponseText = xmlRequest.responseText;
            console.log("🚀 ~ file: sdk.js?20220707.js ~ line 19 ~ certResponseText", certResponseText)
            if (W95.isJson(certResponseText)) {
              parsedRes = JSON.parse(certResponseText);
              console.log("🚀 ~ file: sdk.js?20220707.js ~ line 22 ~ parsedRes", parsedRes)
              if (xmlRequest.status == 200) {
                if (parsedRes.jwe) {
                    finCertClient.main.decryptTranJWE(parsedRes.jwe).then(function (decryptResult) {
                    console.log("🚀 ~ file: sdk.js?20220707.js ~ line 26 ~ decryptResult", decryptResult)
                    decryptResult.api_tran_id = parsedRes.api_tran_id;
                    console.log("🚀 ~ file: sdk.js?20220707.js ~ line 27 ~ parsedRes.api_tran_id", parsedRes.api_tran_id)
                    console.log("🚀 ~ file: sdk.js?20220707.js ~ line 27 ~ decryptResult.api_tran_id", decryptResult.api_tran_id)
                    resolve(decryptResult);
                  });
                } else {
                  resolve(parsedRes);
                }
              } else {
                K55 = new FinError(
                  "서버에서 오류를 반환하였습니다. (상태코드:" +
                    xmlRequest.status +
                    ", 오류메시지: " +
                    parsedRes.err_msg +
                    ")",
                  null,
                  200020,
                  {
                    "\x73\x74\u0061\x74\u0075\x73\u0043\u006f\x64\x65":
                      xmlRequest.status,
                    "\u0065\u0072\u0072\x43\u006f\u0064\x65": parsedRes.err_code,
                    "\u0065\u0072\x72\x4d\u0073\u0067": parsedRes.err_msg,
                    "\u0069\u0073\x4f\x70\x65\u006e\u0041\u0050\x49": h95,
                    "\u0061\u0070\u0069\x54\x72\x61\x6e\x49\u0064":
                      parsedRes.api_tran_id,
                  }
                );
                if (parsedRes.add_field) {
                  if (parsedRes.add_field.pwd_remain_cnt !== undefined) {
                    K55.info.pwdRemainCnt = parsedRes.add_field.pwd_remain_cnt;
                  }
                }
                if (parsedRes.err_code === "000063") {
                  K55.message =
                    "인증서 일련번호(certSeqNum)에 해당하는 인증서가 유효하지 않습니다.";
                  K55.code = 100002;
                }
                reject(K55);
              }
            } else {
              if (xmlRequest.status === 0) {
                reject(
                  new FinError(
                    "서버와의 통신 과정 중 에러가 발생하였습니다. CORS, 방화벽, 설치된 브라우저 확장 프로그램 등으로 서버로의 요청이 차단되었는지 확인하시기 바랍니다.",
                    null,
                    200025,
                    {
                      "\u0073\x74\x61\u0074\u0075\x73\u0043\u006f\x64\u0065":
                        xmlRequest.status,
                      "\u0069\u0073\x4f\u0070\u0065\u006e\x41\u0050\u0049": h95,
                    }
                  )
                );
              } else {
                reject(
                  new FinError(
                    "서버와의 통신 과정 중 에러가 발생하였습니다. (상태코드: " +
                      xmlRequest.status +
                      ")",
                    null,
                    200021,
                    {
                      "\x73\u0074\u0061\u0074\u0075\u0073\u0043\x6f\u0064\u0065":
                        xmlRequest.status,
                      "\u0069\u0073\u004f\x70\x65\x6e\u0041\u0050\x49": h95,
                    }
                  )
                );
              }
            }
          }
        };
        xmlRequest.ontimeout = function () {
          reject(
            new FinError(
              "서버와의 통신 과정 중 Timeout이 발생하였습니다.",
              null,
              200022
            )
          );
        };
        xmlRequest.open(Q95, f95, true);
        if (P95) {
          console.log("🚀 ~ file: sdk.js?20220707.js ~ line 109 ~ P95", P95)
          xmlRequest.setRequestHeader("Authorization", "Bearer " + P95);
        }
        if (L95) {
          console.log("🚀 ~ file: sdk.js?20220707.js ~ line 113 ~ L95", L95)
          xmlRequest.setRequestHeader("api_tran_id", L95);
        }
        if (I95) {
          console.log("🚀 ~ file: sdk.js?20220707.js ~ line 117 ~ I95", I95)
          xmlRequest.setRequestHeader("client_id", I95);
        }
        if (Q95 === "POST" || Q95 === "PATCH") {
          console.log("🚀 ~ file: sdk.js?20220707.js ~ line 121 ~ Q95", Q95)
          if (c95) {
            console.log("🚀 ~ file: sdk.js?20220707.js ~ line 123 ~ c95", c95)
            xmlRequest.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded;charset=UTF-8"
            );
          } else {
            xmlRequest.setRequestHeader(
              "Content-Type",
              "application/json;charset=UTF-8"
            );
          }
        }
        if (N95) {
          xmlRequest.timeout = N95;
        } else {
          xmlRequest.timeout = 10000;
        }
        if (c95) {
          k95 = "";
          for (var m95 in a95) {
            if (k95 != "") {
              k95 = k95 + "&";
            }
            k95 = k95 + m95 + "=" + encodeURIComponent(a95[m95]);
            console.log("🚀 ~ file: sdk.js?20220707.js ~ line 147 ~ k95", k95)
          }
          xmlRequest.send(k95);
        } else if (a95) {
          console.log("🚀 ~ file: sdk.js?20220707.js ~ line 151 ~ a95", a95)
          xmlRequest.send(JSON.stringify(a95));
          
        } else {
          xmlRequest.send(null);
        }
      });
    };
  }
  return G95(window, FinCert);
})();