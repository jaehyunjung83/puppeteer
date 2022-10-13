// 각 사이트에서 사용할 yessign 프로그램 환경 설정
var fileName = 'yessign';
// yessign 서블릿 경로
var servletUrl = '/yessignServlet';
var configInfo = 'openUrl=https://fidoweb.yessign.or.kr:3100/v2/opencert.js$corpCode=099$GeneralSyntax=TRUE$vdRecipient=FALSE$selectTitle=yessign 공인인증 확인$infovineURL=http://www.yessign.or.kr/infovine/download.html$infovineSecurity=YESSIGN|KINGS_INFOVINE$infovineDllVersion=1,2,4,5$mobisignURL=http://www.mobisign.or.kr/mobisignInstall.htm$mobisignDllVersion=3,1,1,1$mobisignSiteInfo=1010006$keyCryptDriver=SOFO_V1$secureDiskURL=http://www.yessign.or.kr/sdisk/download.html$secureDiskDllVersion=1,6,1';
if (servletUrl) {
  configInfo += '$servletUrl=' + servletUrl;
}
//var finCertUrl = 'https://t-4user.yeskey.or.kr/v1/fincert.js';
var finCertUrl = 'https://4user.yeskey.or.kr/v1/fincert.js';
//var finOrgCode = 'DI00050000';
var finOrgCode = 'RI00050000';
//var finApiKey = '3c2024e6-53cc-4661-9b36-5764c39f39c9';
var finApiKey = '2a09ae34-cda7-4f58-96fc-a1194a2794d8';

// 인증서 선택창에 표시될 배너 이미지 위치
var bannerURL = 'http://www.yessign.or.kr/yessignCert5/KFTC_b03.gif';
//var browserInfoUrl = 'browserInfo.jpg';

// yessign 인증서 용도별 종류
var YESSIGN_FINANCIAL_PE         = 0x00000001;  // 개인 은행/보험/신용카드용
var YESSIGN_FINANCIAL_CO         = 0x00000002;  // 법인 은행/보험/신용카드용
var YESSIGN_GENERAL_PE           = 0x00000004;  // 개인 범용
var YESSIGN_GENERAL_CO           = 0x00000008;  // 법인 범용
var YESSIGN_USE4CORPIB           = 0x00000010;  // 기업뱅킹용
var YESSIGN_USE4MAIL             = 0x00000020;  // 보안업무용
var YESSIGN_USE4CARD             = 0x00000040;  // 신용카드용
var YESSIGN_USE4PPS              = 0x00000080;  // 조달청 원클릭용
var YESSIGN_USE4RK               = 0x00000100;  // 퇴직연금용
var YESSIGN_USE4CTR              = 0x00400000;  // 금융위원회 CTR용
var YESSIGN_USE4ESERO            = 0x40000000;  // 전자세금용

// yessign 모든 용도의 인증서
var YESSIGN_CERT_ALL             = YESSIGN_FINANCIAL_PE | YESSIGN_FINANCIAL_CO | YESSIGN_GENERAL_PE | YESSIGN_GENERAL_CO | YESSIGN_USE4CORPIB | YESSIGN_USE4MAIL | YESSIGN_USE4CARD | YESSIGN_USE4PPS | YESSIGN_USE4RK | YESSIGN_USE4CTR | YESSIGN_USE4ESERO;

// 타기관 인증서 용도별 종류
var OTHERCA_CERT_PE              = 0x00000200;  // 타기관 개인 범용
var OTHERCA_CERT_CO              = 0x00000400;  // 타기관 법인 범용
var OTHERCA_CERT_USE4            = 0x00000800;  // 타기관 특수목적용
var OTHERCA_CERT_FI_PE           = 0x00200000;  // 타기관 은행/보험용
var OTHERCA_CERT_INV_PE          = 0x10000000;  // 개인 금융투자용(구 증권용)
var OTHERCA_CERT_INV_CO          = 0x20000000;  // 법인 금융투자용(구 증권용)
var OTHERCA_CERT_ESERO           = 0x80000000;  // 전자세금용

// 타기관 모든 용도의 인증서
var OTHERCA_CERT_ALL             = OTHERCA_CERT_PE | OTHERCA_CERT_CO | OTHERCA_CERT_USE4 | OTHERCA_CERT_FI_PE | OTHERCA_CERT_INV_PE | OTHERCA_CERT_INV_CO | OTHERCA_CERT_ESERO;

// 기타 옵션
var LASTACCESS_CERT              = 0x01000000;  // 마지막 접근 인증서만 표시
var DISABLE_MOBILEPHONE          = 0x02000000;  // 유비키 및 모비싸인 저장매체 비활성
var DISABLE_UBIKEY               = 0x08000000;  // 유비키 저장매체 비활성
var DISABLE_SECURE_DISK          = 0x00800000;  // 안전디스크 저장매체 비활성
var DISABLE_PKCS12               = 0x00010000;  // 인증서 찾기 비활성화
var DISABLE_SMARTCARD            = 0x00020000;  // 저장토큰 비활성
var DISABLE_HSM                  = 0x00040000;  // 보안토큰 비활성
var DISABLE_REMOVABLE            = 0x00080000;  // 이동식디스크 비활성
var DISABLE_HDD                  = 0x00100000;  // 하드디스크 비활성
var DISABLE_BROWSER              = 0x00002000;  // 브라우저 비활성
var ENABLE_SIGN_TEXT_VIEW        = 0x04000000;  // 전자서명 확인창 생성
var CONFIRM_CERT_SSN             = 0x00008000;  // 주민(사업자)등록번호 정상 여부 확인

// 인증서 정렬 옵션
var SORT_BY_POLICY               = 0x00000001;  // 인증서 정책(종류)으로 인증서 정렬 활성화

// 언어설정 옵션
var YESSIGN_LANG_SYSTEM_DEFAULT  = 0x00;        // 시스템 기본값
var YESSIGN_LANG_KOREAN          = 0x12;        // 한국어
var YESSIGN_LANG_ENGLISH         = 0x09;        // 영어

// UCPID 정보 제공 동의 옵션
var UCPID_PERSON_REAL_NAME       = 0x80000000;  // 실명
var UCPID_PERSON_GENDER          = 0x40000000;  // 성별
var UCPID_PERSON_NATIONAL_INFO   = 0x20000000;  // 국적
var UCPID_PERSON_BIRTH_DATE      = 0x10000000;  // 생년월일
var UCPID_PERSON_CI              = 0x08000000;  // CI

// 인증서 정책(종류)으로 정렬을 하기 위한 설정 방법
var CP_YESSIGN_GENERAL_PE        = '1.2.410.200005.1.1.1;';
var CP_YESSIGN_FINANCIAL_PE      = '1.2.410.200005.1.1.4;';
var CP_YESSIGN_GENERAL_CO        = '1.2.410.200005.1.1.5;';
var CP_YESSIGN_FINANCIAL_CO      = '1.2.410.200005.1.1.2;';

var CP_YESSIGN_CORP_IB           = '1.2.410.200005.1.1.6.1;';
var CP_YESSIGN_PPS               = '1.2.410.200005.1.1.6.3;';
var CP_YESSIGN_RK                = '1.2.410.200005.1.1.6.4;';
var CP_YESSIGN_CTR               = '1.2.410.200005.1.1.6.5;';
var CP_YESSIGN_TRUS_PE           = '1.2.410.200005.1.1.6.6;';
var CP_YESSIGN_TRUS_CO           = '1.2.410.200005.1.1.6.7;';
var CP_YESSIGN_ESERO             = '1.2.410.200005.1.1.6.8;';
var CP_YESSIGN_SEC_PE            = '1.2.410.200005.1.1.6.9;';
var CP_YESSIGN_SEC_CO            = '1.2.410.200005.1.1.6.0;';
var CP_YESSIGN_ERS               = '1.2.410.200005.1.1.7.1;';

var CP_OTHERCA_GENERAL_PE        = '1.2.410.200004.5.1.1.5;1.2.410.200004.5.2.1.2;1.2.410.200004.5.3.1.9;1.2.410.200004.5.4.1.1;1.2.410.200012.1.1.1;';
var CP_OTHERCA_GENERAL_CO        = '1.2.410.200004.5.1.1.7;1.2.410.200004.5.2.1.1;1.2.410.200004.5.3.1.1;1.2.410.200004.5.3.1.2;1.2.410.200004.5.4.1.2;1.2.410.200012.1.1.3;';
var CP_OTHERCA_FINANCIAL_PE      = '1.2.410.200004.5.2.1.7.1;1.2.410.200004.5.4.1.101;1.2.410.200012.1.1.101;';
var CP_OTHERCA_INV_PE            = '1.2.410.200004.5.1.1.9;';
var CP_OTHERCA_INV_CO            = '1.2.410.200004.5.1.1.10;';

var CP_ALL_GENERAL_PE            = CP_YESSIGN_GENERAL_PE + CP_OTHERCA_GENERAL_PE;
var CP_ALL_GENERAL_CO            = CP_YESSIGN_GENERAL_CO + CP_OTHERCA_GENERAL_CO;
var CP_ALL_FINANCIAL_PE          = CP_YESSIGN_FINANCIAL_PE + CP_OTHERCA_FINANCIAL_PE;

var CP_YESSIGN_ALL               = CP_YESSIGN_GENERAL_PE + CP_YESSIGN_FINANCIAL_PE + CP_YESSIGN_GENERAL_CO + CP_YESSIGN_FINANCIAL_CO + CP_YESSIGN_CORP_IB + CP_YESSIGN_PPS + CP_YESSIGN_RK + CP_YESSIGN_CTR + CP_YESSIGN_TRUS_PE + CP_YESSIGN_TRUS_CO + CP_YESSIGN_ESERO + CP_YESSIGN_SEC_PE + CP_YESSIGN_SEC_CO + CP_YESSIGN_ERS;

// 인증서 선택창에 표시될 인증서 옵션(필요 시 수정)
var defaultCertOption = YESSIGN_CERT_ALL | OTHERCA_CERT_ALL;

function _insertElement(form, name, value) {
  if (form.elements[name] === undefined) {
    if (/MSIE [5-7]/.test(navigator.userAgent)) {
      try {
        var html = '<input type="hidden" name="' + _escapeHtml(name) + '" value="' + _escapeHtml(value) + '" />';
        var input = document.createElement(html);
      } catch (e) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
      }
    } else {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
    }
    form.appendChild(input);
  } else {
    form.elements[name].type = 'hidden';
    form.elements[name].value = value;
  }
}

function _makeSignText(form, etcOption) {
  var items = [];
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].getAttribute('sign') === 'on') {
      if (form.elements[i].type === 'radio' || form.elements[i].type === 'checkbox') {
        if (form.elements[i].checked === true) {
          items.push({
            name : form.elements[i].name,
            value : form.elements[i].value
          });
        }
      } else if (form.elements[i].type === 'select-one') {
        if (form.elements[i].selectedIndex !== -1) {
          items.push({
            name : form.elements[i].name,
            value : form.elements[i].options[form.elements[i].selectedIndex].value
          });
        }
      } else if (form.elements[i].type === 'select-multiple') {
        for ( var j = 0; j < form.elements[i].length; j++) {
          if (form.elements[i].options[j].selected) {
            items.push({
              name : form.elements[i].name,
              value : form.elements[i].options[j].value
            });
          }
        }
      } else {
        items.push({
          name : form.elements[i].name,
          value : form.elements[i].value
        });
      }
    }
  }

  var extraRequest = [];
  if (etcOption.signingTime === true) {
    extraRequest.push('signingTime');
  }
  if (etcOption.nonce === true) {
    extraRequest.push('nonce');
  }

  var extraNames = {
    signingTime : '서명시각',
    nonce : '일회용토큰'
  };
  if (extraRequest.length !== 0) {
    var extraValues = _sendHttpRequest(servletUrl, extraRequest);
    if (extraValues === undefined) {
      throw new Error('전자서명 과정에서 서버와 통신 도중 오류가 발생하였습니다.');
    }

    for ( var i = 0; i < extraRequest.length; i++) {
      items.push({
        name : extraNames[extraRequest[i]],
        value : extraValues[extraRequest[i]]
      });
    }
  }

  var signText = '';
  for ( var i = 0; i < items.length; i++) {
    if (signText !== '') {
      signText += '&';
    }
    signText += items[i].name;
    signText += '=';
    signText += _escapeUrl(items[i].value);
  }
  return signText;
}

function _makeTouchEnKeyE2E(form, etcOption) {
  var ksObj = document.getElementById("CKKeyPro");
  var items = [];
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].getAttribute('enc') === 'on' && (form.elements[i].type === 'text' || form.elements[i].type === 'password')) {
      items.push({
        name : '_E2E_' + form.elements[i].name,
        value : ksObj.GetEncData('', form.name, form.elements[i].name)
      });
    }
  }

  if (items.length == 0) {
    return;
  }

  if (serverCert === undefined) {
    throw new Error('키보드 보안 프로그램 E2E 암호화용 인증서 값이 없습니다.');
  }
  for ( var i = 0; i < items.length; i++) {
    _insertElement(form, items[i].name, items[i].value);
  }
  _insertElement(form, '_ENCSEED', ksObj.GetEncData(serverCert, '', ''));
  if (TNK_SR !== undefined) {
    _insertElement(form, '_SSEED', TNK_SR);
  }
}

function _putConfigInfo(policy, signOption) {
  yessignCrypto.PutConfigFileInfo(fileName, configInfo);
  yessignCrypto.PutBannerInfo(bannerURL);

  if (policy !== null && policy !== undefined && /[^0-9.;\t ]/.test(policy) === true) {
      throw new Error('The policy parameter is incorrect.'); // 이제 policy 값은 OID만 허용
  }
  if (policy === null || policy === undefined) {
    policy = '';
  }
  yessignCrypto.CertSelect(policy);
  
  var option = 0;
  if (policy === '' && (signOption & (YESSIGN_CERT_ALL | OTHERCA_CERT_ALL)) === 0) {
    // 인증서 종류를 명시하지 않으면 defaultCertOption이 이용된다.
    option = defaultCertOption;
  }
  option |= signOption;

  return option;
}

function _execAsync(form, elementName, funcName, args, onSuccess, onCancel) {
  if (form !== undefined && elementName !== undefined) {
    var _onSuccess = function(value) {
      _insertElement(form, elementName, value);
      if (onSuccess !== null && onSuccess !== undefined) {
        // 콜백 함수를 지정한 경우는 submit하지 않고 콜백 함수를 호출한다.
        onSuccess();
      } else {
        // 콜백 함수를 지정하지 않은 경우는 submit한다.
        form.submit();
      }
    };
  } else {
    var _onSuccess = function() {
      if (onSuccess !== null && onSuccess !== undefined) {
        onSuccess();
      }
    };
  }
  var _onCancel = function() {
    if (onCancel !== null && onCancel !== undefined) {
      onCancel();
    }
  };

  if (isPluginEnv() === true) {
    // ActiveX과 통합 보안 솔루션 방식이 동일하게 동작하도록 비동기적으로 호출한다.
    _returnAsync(function() {
      var script = 'yessignCrypto.' + funcName + '(';
      for ( var i = 0; i < args.length; i++) {
        if (i !== 0) {
          script += ', ';
        }
        script += 'args[' + i + ']';
      }
      script += ')';
      var value = eval(script);
      if (value !== '') {
        _onSuccess(value);
      } else {
        _onCancel();
      }
    });
  } else {
    var _args = args.concat([_onSuccess, _onCancel]);
    yessignCrypto[funcName].apply(yessignCrypto, _args);
  }
}

function setE2EServerSeed() {
  if (isPluginEnv() === false) {
    return;
  }
  
  var values = _sendHttpRequest(servletUrl, ['e2eServerSeed']);
  if (values === undefined) {
    throw new Error('키보드 보안 프로그램 E2E 암호화 SEED 획득에 실패하였습니다.');
  }

  TNK_SR = values['e2eServerSeed'];
  if (typeof TouchEnKey_InvalidateSession === 'function') {
    TouchEnKey_InvalidateSession();
  }
}

/**
 * yessign 프로그램에 표시될 언어를 설정한다.
 * 
 * @param {number} lang 표시될 언어. YESSIGN_LANG_* 상수를 활용한다.
 */
function setLanguage(lang) {
  if (checkInstallCrypto() === false) {
    return;
  }

  yessignCrypto.SetLanguage(lang);
}

/**
 * 인증서를 옵션에 따라 정렬한다. 전자서명 함수 이전에 호출해야 한다.<br>
 * 더 이상 정렬되지 않기 위해서는 priorityList를 ''로 하여 다시 호출하면 된다.
 *  
 * @param {number} sortOption SORT_BY_POLICY 상수
 * @param {string} priorityList 표시하고자 하는 인증서 정책(종류) 순서대로 ;로 구분하여 입력한다. CP_* 상수를 활용한다.
 */
function sortCertList(sortOption, priorityList) {
  if (checkInstallCrypto() === false) {
    return;
  }

  // 정책으로 리스트를 설정하도록 활성화 되어 있으면 처리.
  if (sortOption === SORT_BY_POLICY) {
    yessignCrypto.SortCertList(priorityList);
  }
}

/**
 * 인중서 갯수를 반환한다.
 * 
 * @param {string} policy 화면에 표시하고자 하는 인증서 정책(종류) OID.
 * @param {number} signOption 전자서명 옵션. 스크립트 상단에 정의된 상수를 BITWISE-OR로 조합해서 지정한다.<br>
 *          policy나 signOption으로 인증서 정책(종류)가 지정되지 않을 경우는 defaultCertOption에 지정된 값이 이용된다.
 * @param {function=} onSuccess 성공 시 호출될 콜백 함수. 
 * @param {function=} onCancel 취소 또는 오류 시 호출될 콜백 함수. (optional)
 */
function checkYessign(policy, signOption, onSuccess, onCancel) {
  if (checkInstallCrypto() === false) {
    return;
  }
  var option = _putConfigInfo(policy, signOption);

  yessignCrypto.CheckYessign(option, onSuccess, onCancel);
}

// 
/**
 * E2E 키보드보안 암호화를 수행한다. 전자서명을 하지 않는 입력 폼에서 이용한다.<br>
 * TouchEnKey 키보드보안 프로그램을 위해서만 필요하다.
 * 
 * @param {object} form 입력 폼
 */
function makeInput(form) {
  if (isPluginEnv() === true) {
    if (checkInstallCrypto() === false) {
      return;
    }

    _makeTouchEnKeyE2E(form, {});
  }
}

function _getURLInfo() {
  return location.hostname;
}

function _getUCPIDNonce() {
  var nonceRequest = ['nonce'];
  var nonceValue = _sendHttpRequest(servletUrl, nonceRequest);
  if (nonceValue === undefined) {
    throw new Error('전자서명 과정에서 서버와 통신 도중 오류가 발생하였습니다.');
  }

  return nonceValue['nonce'];  
}


/**
 * 전자서명을 수행한다.<br>
 * 비동기적으로 동작하므로 함수는 곧바로 리턴하고 수행 완료 후 콜백 함수가 호출된다.
 * 
 * @param {object} form 입력 폼.
 * @param {string} ssn 본인확인을 위한 주민(사업자)등록번호. 이 값이 지정되어야 본인확인을 위한 난수가 전자서명문에 포함된다.<br>
 *          따라서 별도의 방법으로 주민(사업자)등록번호가 전달되어 본인확인을 하는 경우는 이 값을 더미 값으로 지정해야 한다.
 * @param {string} policy 화면에 표시하고자 하는 인증서 정책(종류) OID.
 * @param {number} signOption 전자서명 옵션. 스크립트 상단에 정의된 상수를 BITWISE-OR로 조합해서 지정한다.<br>
 *          policy나 signOption으로 인증서 정책(종류)가 지정되지 않을 경우는 defaultCertOption에 지정된 값이 이용된다.
 * @param {object=} etcOption 기타 옵션. (optional)
 * @param {function=} onSuccess 성공 시 호출될 콜백 함수. 미 지정 시에는 자동으로 입력 폼을 submit한다. (optional)
 * @param {function=} onCancel 취소 또는 오류 시 호출될 콜백 함수. (optional)
 */
function sign(form, ssn, policy, signOption, etcOption, onSuccess, onCancel)
{
  if (checkInstallCrypto() == false) {
    return;
  }

  try {
    if (ssn === null || ssn === undefined) {
      ssn = '';
    }

    // 20210611 업무팀 요청으로 브라우저인증서 비활성화
    signOption = signOption | DISABLE_BROWSER;
    
    // 환경 설정
    var option = _putConfigInfo(policy, signOption);
    if (etcOption === null || etcOption === undefined) {
      etcOption = {
        signingTime : true,
        nonce : true
      };
    }

    // 키보드보안 E2E 적용(ActiveX인 경우)
    if (isPluginEnv() === true) {
      _makeTouchEnKeyE2E(form, etcOption);
    }

    // 서명데이터 생성
    var input = _makeSignText(form, etcOption);
    //var newOption = option; //{sign : option, mediaOption: {setDefault: 'BROWSER', browserInfoUrl: browserInfoUrl}};
    var newOption = {sign : option, mediaOption: {setDefault: 'HDD'}};

    // yessign 프로그램 비동기 호출
    _execAsync(form, 'signedval', 'Sign', [input, ssn, newOption], onSuccess, onCancel);
  } catch (err) {
    alert('sign() error : ' + err);
  }
}

/**
 * UCPID(공인인증서 본인확인)를 위한 개인정보활용 동의 요청 구문을 생성한다.<br>
 * 비동기적으로 동작하므로 함수는 곧바로 리턴하고 수행 완료 후 콜백 함수가 호출된다.
 * 
 * @param {object} form 입력 폼.
 * @param {string} userAgreement 이용 약관.
 * @param {number} userAgreeInfo 활용에 동의하는 개인정보. UCPID_* 상수를 BITWISE-OR로 조합해서 지정한다.
 * @param {string} policy 화면에 표시하고자 하는 인증서 정책(종류) OID.
 * @param {number} signOption 전자서명 옵션. 스크립트 상단에 정의된 상수를 BITWISE-OR로 조합해서 지정한다.<br>
 *          policy나 signOption으로 인증서 정책(종류)가 지정되지 않을 경우는 defaultCertOption에 지정된 값이 이용된다.
 * @param {object=} etcOption 기타 옵션. (optional)
 * @param {function=} onSuccess 성공 시 호출될 콜백 함수. 미 지정 시에는 자동으로 입력 폼을 submit한다. (optional)
 * @param {function=} onCancel 취소 또는 오류 시 호출될 콜백 함수. (optional)
 */
function signUCPID(form, userAgreement, userAgreeInfo, policy, signOption, etcOption, onSuccess, onCancel) {
  if (checkInstallCrypto() == false) {
    return;
  }

  try {
    // userAgreeInfo를 입력하지 않으면 모든 정보 제공 동의로 본다.
    if (userAgreeInfo === null || userAgreeInfo === undefined) {
      userAgreeInfo = UCPID_PERSON_REAL_NAME | UCPID_PERSON_GENDER | UCPID_PERSON_NATIONAL_INFO | UCPID_PERSON_BIRTH_DATE;
    }

    // 환경 설정
    var option = _putConfigInfo(policy, signOption);

    // 키보드보안 E2E 적용(ActiveX인 경우)
    if (isPluginEnv() === true) {
      _makeTouchEnKeyE2E(form, etcOption);
    }

    var newOption = option; //{sign : option, mediaOption: {setDefault: 'BROWSER', browserInfoUrl: browserInfoUrl}};

    // yessign 프로그램 비동기 호출
    _execAsync(form, 'ucpidval', 'UCPIDSign', [userAgreement, userAgreeInfo, newOption, 0], onSuccess, onCancel);
  } catch (err) {
    alert('signUCPID() error : ' + err);
  }
}

/**
 * 전자서명과 UCPID(공인인증서 본인확인)를 위한 개인정보활용 동의 요청 구문을 동시에 생성한다.<br>
 * 비동기적으로 동작하므로 함수는 곧바로 리턴하고 수행 완료 후 콜백 함수가 호출된다.
 * 
 * @param {object} form 입력 폼.
 * @param {string} ssn 본인확인을 위한 주민(사업자)등록번호. 이 값이 지정되어야 본인확인을 위한 난수가 전자서명문에 포함된다.<br>
 *          따라서 별도의 방법으로 주민(사업자)등록번호가 전달되어 본인확인을 하는 경우는 이 값을 더미 값으로 지정해야 한다.
 * @param {string} userAgreement 이용 약관.
 * @param {number} userAgreeInfo 활용에 동의하는 개인정보. UCPID_* 상수를 BITWISE-OR로 조합해서 지정한다.
 * @param {string} policy 화면에 표시하고자 하는 인증서 정책(종류) OID.
 * @param {number} signOption 전자서명 옵션. 스크립트 상단에 정의된 상수를 BITWISE-OR로 조합해서 지정한다.<br>
 *          policy나 signOption으로 인증서 정책(종류)가 지정되지 않을 경우는 defaultCertOption에 지정된 값이 이용된다.
 * @param {object=} etcOption 기타 옵션. (optional)
 * @param {function=} onSuccess 성공 시 호출될 콜백 함수. 미 지정 시에는 자동으로 입력 폼을 submit한다. (optional)
 * @param {function=} onCancel 취소 또는 오류 시 호출될 콜백 함수. (optional)
 */
function multiSignUCPID(form, ssn, userAgreement, userAgreeInfo, policy, signOption, etcOption, onSuccess, onCancel) {
  if (checkInstallCrypto() == false) {
    return;
  }

  try {
    if (ssn === null || ssn === undefined) {
      ssn = '';
    }

    // userAgreeInfo를 입력하지 않으면 모든 정보 제공 동의로 본다.
    if (userAgreeInfo === null || userAgreeInfo === undefined) {
      userAgreeInfo = UCPID_PERSON_REAL_NAME | UCPID_PERSON_GENDER | UCPID_PERSON_NATIONAL_INFO | UCPID_PERSON_BIRTH_DATE;
    }

    // 환경 설정
    var option = _putConfigInfo(policy, signOption);
    if (etcOption === null || etcOption === undefined) {
      etcOption = {
        signingTime : true,
        nonce : true
      };
    }

    // 키보드보안 E2E 적용(ActiveX인 경우)
    if (isPluginEnv() === true) {
      _makeTouchEnKeyE2E(form, etcOption);
    }

    // 서명데이터 생성
    var input = _makeSignText(form, etcOption);
    var newOption = option; //;{sign : option, mediaOption: {setDefault: 'BROWSER', browserInfoUrl: browserInfoUrl}};

    // yessign 프로그램 비동기 호출
    _execAsync(form, 'multiucpidval', 'SignAndUCPIDSign', [input, ssn, userAgreement, userAgreeInfo, newOption], onSuccess, onCancel);
  } catch (err) {
    alert('sign() error : ' + err);
  }
}

var _sdkInit = false;
function _checkSdkInit(onComplete, onError) {
  if (_sdkInit) {
    onComplete();
  } else {
    var date = new Date();
    var dateStr = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
    var scriptElem = document.createElement('script');
    scriptElem.src = finCertUrl + '?dt=' + dateStr;
    document.querySelector('body').appendChild(scriptElem);
    
    scriptElem.onload = function (e, f) {
      FinCert.Sdk.init({
        orgCode: finOrgCode,
        apiKey: finApiKey,
        lang: 'kor',
        success: function() {
          _sdkInit = true;
          onComplete();
        },
        fail: function(error) {
          onError(error.code + " : " + error.message);
        }
      });
    };
  }
}

/**
 * @description BASE64URL 디코딩을 수행한다.
 *
 * @param {string} str js binary string.
 *
 * @returns {string} BASE64URL 인코딩된 문자열.
 */
function encodeBase64Url (str) {
  function toBase64Url(base64Str) {
    return base64Str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/m, '');
  }

  var base64Enc = btoa(str);
  return toBase64Url(base64Enc);
};

/**
 * @description BASE64URL 디코딩을 수행한다.
 *
 * @param {string} str BASE64URL 인코딩된 문자열.
 *
 * @returns {string} js binary string.
 */
function decodeBase64Url (str) {
  function fromBase64Url(base64Url) {
    var base64Dec = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var padCount = (4 - (base64Dec.length % 4)) % 4;
    for (var i = padCount; i > 0; i--) {
      base64Dec += '=';
    }
    return base64Dec;
  }

  var base64Dec = fromBase64Url(str);
  return atob(base64Dec);
};

/**
 * @description js binary string을 hexa 인코딩한다.
 *
 * @param {string} str js binary string.
 *
 * @returns {string} hex 인코딩된 문자열.
 */
function binaryToHex (bstr) {
  var rval = '';
  for(var i = 0; i < bstr.length; i++) {
    var b = bstr.charCodeAt(i);
    if(b < 16) {
      rval += '0';
    }
    rval += b.toString(16);
  }
  return rval;
}

function changeToHex(str) {
  return binaryToHex(decodeBase64Url(str));
}

/**
 * 전자서명을 수행한다.<br>
 * 비동기적으로 동작하므로 함수는 곧바로 리턴하고 수행 완료 후 콜백 함수가 호출된다.
 * 
 * @param {object} form 입력 폼.
 * @param {string} ssn 본인확인을 위한 주민(사업자)등록번호. 이 값이 지정되어야 본인확인을 위한 난수가 전자서명문에 포함된다.<br>
 *          따라서 별도의 방법으로 주민(사업자)등록번호가 전달되어 본인확인을 하는 경우는 이 값을 더미 값으로 지정해야 한다.
 * @param {string} policy 화면에 표시하고자 하는 인증서 정책(종류) OID.
 * @param {number} signOption 전자서명 옵션. 스크립트 상단에 정의된 상수를 BITWISE-OR로 조합해서 지정한다.<br>
 *          policy나 signOption으로 인증서 정책(종류)가 지정되지 않을 경우는 defaultCertOption에 지정된 값이 이용된다.
 * @param {object=} etcOption 기타 옵션. (optional)
 * @param {function=} onSuccess 성공 시 호출될 콜백 함수. 미 지정 시에는 자동으로 입력 폼을 submit한다. (optional)
 * @param {function=} onCancel 취소 또는 오류 시 호출될 콜백 함수. (optional)
 */
function signFin(form, ssn, policy, signOption, etcOption, signType, onSuccess, onCancel)
{
  if (typeof signType === 'function') {
    onCancel = onSuccess;
    onSuccess = signType;
    signType = '99';
  }
  _checkSdkInit(_doSignFin, onCancel);
  
  function _doSignFin () {
    try {
      if (ssn === null || ssn === undefined) {
        ssn = '';
      }

      // 환경 설정      
      var option = 0;
      if (policy === '' && (signOption & (YESSIGN_CERT_ALL | OTHERCA_CERT_ALL)) === 0) {
        // 인증서 종류를 명시하지 않으면 defaultCertOption이 이용된다.
        option = defaultCertOption;
      }
      option |= signOption;
      if (etcOption === null || etcOption === undefined) {
        etcOption = {
          signingTime : true,
          nonce : true
        };
      }

      // 서명데이터 생성
      var input = _makeSignText(form, etcOption);
      
      var signParams = {};
      signParams.signFormat = {type: 'CMS'};
      
      // 20210531 인증개발팀 조치로 추가
      if (ssn) {
    	  signParams.signFormat.CMSInfo = {ssn : ssn};
      }
      signParams.content = {};
      signParams.content.plainText = {plainTexts: [input], encoding: 'EUC-KR'};
      signParams.algorithms = 'RSASSA-PKCS1-v1_5_SHA256';
      signParams.view = {};
      signParams.view.lastAccessCert = !!(option & LASTACCESS_CERT);
      signParams.view.enableTextView = !!(option & ENABLE_SIGN_TEXT_VIEW);
      signParams.info = {'signType': signType};
      signParams.success = function(result) {
        var resVal = changeToHex(result.signedVals[0]);
        if (form !== undefined) {
          _insertElement(form, 'signedval', resVal);
          form.submit();
        }
        onSuccess && onSuccess(resVal);
      };
      signParams.fail = function(error) {
        console.log(error.code + ' : ' + error.message);
        onCancel && onCancel(error);
      };
      FinCert.Sdk.sign(signParams);
    } catch (err) {
      alert('sign() error : ' + err);
    }
  }
}

function _constructUCPIDRequestInfo(userAgreement, userAgreeInfo, ispUrlInfo, ucpidNonce) {
  var asn1f = yessignForge.asn1;
  var protocolVersion = [1, 5, 0, 0];
  var userAgreementEncoded = yessignForge.util.encodeUtf8(userAgreement);
  var userAgreeInfoFormatted = String.fromCharCode(0x0);
  if (userAgreeInfo !== 0) {
    userAgreeInfoFormatted = String.fromCharCode(0x3) + String.fromCharCode((userAgreeInfo >>> 27) << 3);
  }
  var ucpidNonceBytes;
  if (ucpidNonce) {
    ucpidNonceBytes = new yessignForge.util.ByteBuffer(yessignForge.util.binary.hex.decode(ucpidNonce));
  }
  
  var personInfoReq = asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.SEQUENCE, true, [
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.UTF8, false, userAgreementEncoded),
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.BITSTRING, false, userAgreeInfoFormatted)]);

  var moduleVersion = asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.SEQUENCE, true, [
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.INTEGER, false, String.fromCharCode(protocolVersion[0])), 
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.INTEGER, false, String.fromCharCode(protocolVersion[1])),
    asn1f.create(asn1f.Class.CONTEXT_SPECIFIC, 0, true, [asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.INTEGER, false, String.fromCharCode(protocolVersion[2]))]),
    asn1f.create(asn1f.Class.CONTEXT_SPECIFIC, 1, true, [asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.INTEGER, false, String.fromCharCode(protocolVersion[3]))])]);

  var moduleInfo = asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.SEQUENCE, true, [
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.UTF8, false, 'yessignWeb'),
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.UTF8, false, 'KFTC'),
    moduleVersion]);

  var plainAsn1 = asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.SEQUENCE, true, [
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.INTEGER, false, String.fromCharCode(0x2)),
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.OCTETSTRING, false, ucpidNonceBytes ? ucpidNonceBytes.getBytes() : null),
    personInfoReq,
    moduleInfo,
    asn1f.create(asn1f.Class.UNIVERSAL, asn1f.Type.UTF8, false, ispUrlInfo)]);

  // 200708 backward compatibility
  return encodeBase64Url(asn1f.toDer(ispUrlInfo === null ? personInfoReq : plainAsn1).getBytes());      
}

/**
 * UCPID(공인인증서 본인확인)를 위한 개인정보활용 동의 요청 구문을 생성한다.<br>
 * 비동기적으로 동작하므로 함수는 곧바로 리턴하고 수행 완료 후 콜백 함수가 호출된다.
 * 
 * @param {object} form 입력 폼.
 * @param {string} userAgreement 이용 약관.
 * @param {number} userAgreeInfo 활용에 동의하는 개인정보. UCPID_* 상수를 BITWISE-OR로 조합해서 지정한다.
 * @param {string} policy 화면에 표시하고자 하는 인증서 정책(종류) OID.
 * @param {number} signOption 전자서명 옵션. 스크립트 상단에 정의된 상수를 BITWISE-OR로 조합해서 지정한다.<br>
 *          policy나 signOption으로 인증서 정책(종류)가 지정되지 않을 경우는 defaultCertOption에 지정된 값이 이용된다.
 * @param {object=} etcOption 기타 옵션. (optional)
 * @param {function=} onSuccess 성공 시 호출될 콜백 함수. 미 지정 시에는 자동으로 입력 폼을 submit한다. (optional)
 * @param {function=} onCancel 취소 또는 오류 시 호출될 콜백 함수. (optional)
 */
function signUCPIDFin(form, userAgreement, userAgreeInfo, policy, signOption, etcOption, signType, onSuccess, onCancel) {
  if (typeof signType === 'function') {
    onCancel = onSuccess;
    onSuccess = signType;
    signType = '99';
  }
  _checkSdkInit(_doSignUCPIDFin, onCancel);
  
  function _doSignUCPIDFin () {
    try {
      // userAgreeInfo를 입력하지 않으면 모든 정보 제공 동의로 본다.
      if (userAgreeInfo === null || userAgreeInfo === undefined) {
        userAgreeInfo = UCPID_PERSON_REAL_NAME | UCPID_PERSON_GENDER | UCPID_PERSON_NATIONAL_INFO | UCPID_PERSON_BIRTH_DATE | UCPID_PERSON_CI;
      }

      // 환경 설정      
      var option = 0;
      if (policy === '' && (signOption & (YESSIGN_CERT_ALL | OTHERCA_CERT_ALL)) === 0) {
        // 인증서 종류를 명시하지 않으면 defaultCertOption이 이용된다.
        option = defaultCertOption;
      }
      option |= signOption;

      var ispUrlInfo = _getURLInfo();
      var ucpidNonce = _getUCPIDNonce();

      // 서명데이터 생성
      var input = _constructUCPIDRequestInfo(userAgreement, userAgreeInfo, ispUrlInfo, ucpidNonce);
      
      var signParams = {};
      signParams.signFormat = {type: 'CMS'};
      signParams.content = {};
      signParams.content.binary = {binaries: [input]};
      signParams.algorithms = 'RSASSA-PKCS1-v1_5_SHA256';
      signParams.view = {};
      signParams.view.lastAccessCert = !!(option & LASTACCESS_CERT);
      signParams.view.enableTextView = !!(option & ENABLE_SIGN_TEXT_VIEW);
      signParams.info = {'signType': signType};
      signParams.success = function(result) {
        var resVal = changeToHex(result.signedVals[0]);
        if (form !== undefined) {
          _insertElement(form, 'ucpidval', resVal);
        }
        onSuccess && onSuccess(resVal);
      };
      signParams.fail = function(error) {
        console.log(error.code + ' : ' + error.message);
        onCancel && onCancel(error);
      };
      FinCert.Sdk.sign(signParams);
    } catch (err) {
      alert('sign() error : ' + err);
    }
  }
}

/**
 * 전자서명과 UCPID(공인인증서 본인확인)를 위한 개인정보활용 동의 요청 구문을 동시에 생성한다.<br>
 * 비동기적으로 동작하므로 함수는 곧바로 리턴하고 수행 완료 후 콜백 함수가 호출된다.
 * 
 * @param {object} form 입력 폼.
 * @param {string} ssn 본인확인을 위한 주민(사업자)등록번호. 이 값이 지정되어야 본인확인을 위한 난수가 전자서명문에 포함된다.<br>
 *          따라서 별도의 방법으로 주민(사업자)등록번호가 전달되어 본인확인을 하는 경우는 이 값을 더미 값으로 지정해야 한다.
 * @param {string} userAgreement 이용 약관.
 * @param {number} userAgreeInfo 활용에 동의하는 개인정보. UCPID_* 상수를 BITWISE-OR로 조합해서 지정한다.
 * @param {string} policy 화면에 표시하고자 하는 인증서 정책(종류) OID.
 * @param {number} signOption 전자서명 옵션. 스크립트 상단에 정의된 상수를 BITWISE-OR로 조합해서 지정한다.<br>
 *          policy나 signOption으로 인증서 정책(종류)가 지정되지 않을 경우는 defaultCertOption에 지정된 값이 이용된다.
 * @param {object=} etcOption 기타 옵션. (optional)
 * @param {function=} onSuccess 성공 시 호출될 콜백 함수. 미 지정 시에는 자동으로 입력 폼을 submit한다. (optional)
 * @param {function=} onCancel 취소 또는 오류 시 호출될 콜백 함수. (optional)
 */
function multiSignUCPIDFin(form, ssn, userAgreement, userAgreeInfo, policy, signOption, etcOption, signType, onSuccess, onCancel) {
  if (typeof signType === 'function') {
    onCancel = onSuccess;
    onSuccess = signType;
    signType = '99';
  }
  _checkSdkInit(_doMultiSignUCPIDFin, onCancel);
  
  function _doMultiSignUCPIDFin () {
    try {
      if (ssn === null || ssn === undefined) {
        ssn = '';
      }
        
      // userAgreeInfo를 입력하지 않으면 모든 정보 제공 동의로 본다.
      if (userAgreeInfo === null || userAgreeInfo === undefined) {
        userAgreeInfo = UCPID_PERSON_REAL_NAME | UCPID_PERSON_GENDER | UCPID_PERSON_NATIONAL_INFO | UCPID_PERSON_BIRTH_DATE | UCPID_PERSON_CI;
      }

      // 환경 설정      
      var option = 0;
      if (policy === '' && (signOption & (YESSIGN_CERT_ALL | OTHERCA_CERT_ALL)) === 0) {
        // 인증서 종류를 명시하지 않으면 defaultCertOption이 이용된다.
        option = defaultCertOption;
      }
      option |= signOption;
      if (etcOption === null || etcOption === undefined) {
        etcOption = {
          signingTime : true,
          nonce : true
        };
      }

      var ispUrlInfo = _getURLInfo();
      var ucpidNonce = _getUCPIDNonce();

      // 서명데이터 생성
      var inputSign = _makeSignText(form, etcOption);
      var inputEnc = new yessignForge.util.ByteBuffer(yessignWeb.euckr.encode(inputSign)).getBytes();
      var inputUCPID = _constructUCPIDRequestInfo(userAgreement, userAgreeInfo, ispUrlInfo, ucpidNonce);
      
      var signParams = {};
      signParams.signFormat = {type: 'CMS'};
      signParams.content = {};
      signParams.content.binary = {binaries: [encodeBase64Url(inputEnc), inputUCPID]};
      signParams.algorithms = 'RSASSA-PKCS1-v1_5_SHA256';
      signParams.view = {};
      signParams.view.lastAccessCert = !!(option & LASTACCESS_CERT);
      signParams.view.enableTextView = !!(option & ENABLE_SIGN_TEXT_VIEW);
      signParams.info = {'signType': signType};
      signParams.success = function(result) {
        var resVal = changeToHex(result.signedVals[0]) + '|' + changeToHex(result.signedVals[1]);
        if (form !== undefined) {
          _insertElement(form, 'multiucpidval', resVal);
        }
        onSuccess && onSuccess(resVal);
      };
      signParams.fail = function(error) {
        console.log(error.code + ' : ' + error.message);
        onCancel && onCancel(error);
      };
      FinCert.Sdk.sign(signParams);
    } catch (err) {
      alert('sign() error : ' + err);
    }
  }
}

function issueFinCert(refer, auth, onSuccess, onCancel) {
  _checkSdkInit(_doIssueFin, onCancel);
  
  function _doIssueFin () {
    var issueParams = {};
    issueParams.refNum = refer;
    issueParams.authCode = auth;
    issueParams.success = function(result) {
      onSuccess && onSuccess(result.certificate);
    };
    issueParams.fail = function(error) {
      console.log(error.code + ' : ' + error.message);
      onCancel && onCancel(error);
    };
    FinCert.Sdk.issue(issueParams);
  }
}

