// yessign ActiveX 프로그램 정보
var yessign_OBJID = "yessignCrypto";
var yessign_CLSID = "CLSID:646232F1-8C70-4806-9499-BA01A59FDA74";
var yessign_CODEBASE = "/yessignCert/yessign7.cab";
var yessign_VERSION = "1,0,2,30";

// yessign 프로그램 객체
var yessignCrypto;
var openCert;

/**
 * 플러그인(ActiveX) 지원 환경인지 확인한다.
 * @returns {boolean} 플러그인(ActiveX) 지원 환경 여부. 현재 IE인 경우만 해당된다.
 */
function isPluginEnv() {
  // 20210607 IE동작을 위해 수정

  return false;
}

/**
 * 각종 보안 프로그램의 정상 설치 여부를 확인한다.
 * @returns {boolean} 각종 보안 프로그램 정상 설치 여부.
 */
function checkInstallCrypto() {
  if (isPluginEnv() === true) {
    if (navigator.cpuClass.toLowerCase() == "x64") {
      alert("64비트 웹브라우저는 지원하지 않습니다.");
      return false;
    }

    if (_checkInstallTouchEnKeyActiveX() == false) {
      alert("키보드 보안 프로그램을 설치해 주십시오.");
      return false;
    }

    if (_checkInstallCryptoActiveX() == false) {
      alert("yessign ActiveX 프로그램을 설치해 주십시오.");
      return false;
    }
  } else {
    if (yessignCrypto === undefined) {
      alert("통합 보안 프로그램(nProtect Online Security)을 설치해 주십시오.");
      return false;
    }
  }

  return true;
}

function _checkInstallTouchEnKeyActiveX() {
  try {
    var ksObj = document.getElementById("CKKeyPro");
    if (ksObj === null || ksObj === undefined || ksObj.object == null) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
}

function _checkInstallCryptoActiveX() {
  try {
    yessignCrypto = document.getElementById(yessign_OBJID);
    if (
      yessignCrypto === null ||
      yessignCrypto === undefined ||
      yessignCrypto.object === null
    ) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

function _installCryptoActiveX() {
  document.writeln(
    '<OBJECT ID="' +
      yessign_OBJID +
      '" NAME="' +
      yessign_OBJID +
      '" WIDTH="1" HEIGHT="1"\n'
  );
  document.writeln(
    '    CODEBASE="' + yessign_CODEBASE + "#Version=" + yessign_VERSION + '"\n'
  );
  document.writeln('    CLASSID="' + yessign_CLSID + '">');
  document.writeln('  <PARAM NAME="_Version" VALUE="65536">');
  document.writeln('  <PARAM NAME="_ExtentX" VALUE="2646">');
  document.writeln('  <PARAM NAME="_ExtentY" VALUE="1323">');
  document.writeln('  <PARAM NAME="_StockProps" VALUE="0">');
  document.writeln("</OBJECT>");
}

function _installAOS() {
  aos_set_authinfo("aosmgr_kftc.html");
  aos_set_option("uimode", true);
  aos_set_option("asyncmode", false);
  aos_write_object();
  aos_start("e5");
}

// IE 환경에서는 웹페이지 생성 과정에서 ActiveX를 생성한다.
if (isPluginEnv() === true) {
  if (navigator.cpuClass.toLowerCase() == "x64") {
    alert("64비트 웹브라우저는 지원하지 않습니다.");
  } else {
    _installCryptoActiveX();
    _installAOS();
    yessignCrypto = document.getElementById("yessignCrypto");
  }
}

// 비 IE환경에서는 웹페이지 생성이 모두 완료된 상태에서 통합 보안프로그램 초기화 함수를 호출한다.
$(document).ready(function () {
  if (isPluginEnv() === false) {
    yessignCrypto = yessignWeb.createCrypto();

    if (
      npAddon.isSupported() === false ||
      npPfsDefine.isMobileDevice() === true
    ) {
      alert(
        "인증서 관련 서비스를 지원하지 않는 환경입니다. 접속 가능 환경을 확인하시기 바랍니다."
      );
    } else {
      npPfsCtrl.isInstall({
        success: function () {
          //npPfsStartup(null, true, true, false, true, "enc", "on");
          npPfsStartup(document.Frm1, true, true, false, true, "enc", "on");
        },
        fail: function () {
          //npPfsStartup(null, false, false, false, true, "enc", "on");
          npPfsStartup(document.Frm1, false, false, false, true, "enc", "on");
        },
      });
    }
    //npPfsStartup('yessign_input', false, false, false, true, "enc", "on");
  }
});

// 통합 보안 솔루션을 쓰는 환경에서 E2E 암호화를 적용하지 않은 필드에 대해
// enc="off"를 설정하도록 하여 Copy and Paste를 가능하도록 한다.
var npPfsExtension = new (function () {
  this.secureKeyUiModifier = function (element) {
    var attr = $(element).attr("enc");
    if (attr === undefined || attr === "") {
      $(element).attr({ enc: "off" });
    }
  };
})();
