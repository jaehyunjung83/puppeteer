// window에서는...
// <nos>
// 1. 디버그 키면 page home으로 redirecting, 
// 2. 삭제 해도 되긴 함
// 3. jumin2 마우스 입력은 nos랑 상관x. nppfs.js -> 서버(:2443) -> keypad.jsp 로 매 번 주고 받는 거



//  1. chrome 개발자도구 설정 -> javascript사용 중단 -> payinfo.or.kr -> javascript 다시 사용
//  2. https://payinfo.or.kr/acntcb/qryAcntSummary.do?menu=1

// 중요!! mainFrame(inputRlnmNumAgree.do) frame에서!!
$('#r_chk_all').click();
OnSearch();




// 중요!! mainFrame(inputRlnmNum.do) frame에서!!! 금융인증서 로그인버튼
frmMain1.installed.value = 'T';
npAddon.isSupported = function() {
    return true;
  };

$('#rlnmNum1').val('831206');



// $('#rlnmNum2').val('1001722');
// 중요!!!! TouchEnKey Div element를 form(frmMain1)에 붙이기
// 이 붙여진 form으로 submit해야 정상인증됨!!
npPfsStartup(document.Frm1, true, true, false, true, "enc", "on");

const touchEnButton1 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[4].action
const touchEnButton2 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[5].action
const touchEnButton3 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[6].action
const touchEnButton4 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[7].action
const touchEnButton5 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[8].action
const touchEnButton6 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[9].action
const touchEnButton7 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[10].action
const touchEnButton8 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[11].action
const touchEnButton9 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[12].action
const touchEnButton0 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons)[13].action
const touchEnButtonConfirm = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.action == 'action:enter').action;


$(`img[data-action="${touchEnButton1}"]`).click();   //  주민번호 TouchEnKey 창에서 data-action attr이 'data:211ca898b2bf92e503367b090adce492eafc8f41:1'인 element를 찾아 클릭한다.
$(`img[data-action="${touchEnButton0}"]`).click();
$(`img[data-action="${touchEnButton0}"]`).click();
$(`img[data-action="${touchEnButton1}"]`).click();   
$(`img[data-action="${touchEnButton7}"]`).click();   
$(`img[data-action="${touchEnButton2}"]`).click();   
$(`img[data-action="${touchEnButton2}"]`).click();   

$(`img[data-action="${touchEnButtonConfirm}"]`).click();   

// 금융인증서 로그인
// OnSearch('f');
// 와 same
signFin(frmMain1, frmMain1.rlnmNum.value , OID4Personal, null, null, '01'); 



// 자동로그인 아닐 떄!!









// 중요!! finCertSdkIframe(about:black) frame에서!! 금융인증서 hash별 버튼 label
const button0 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 0).action;    
const button1 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 1).action;    
const button2 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 2).action;    
const button3 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 3).action;    
const button4 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 4).action;    
const button5 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 5).action;    // 'data:p53:p53'
const button6 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 6).action;    
const button7 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 7).action;    
const button8 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 8).action;    
const button9 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 9).action;    



$(`img[data-action="${button5}"]`).click().keyup();   //  금융인증서 창에서 data-action attr이 data:p53:p53인 element를 찾아 클릭한다.
$(`img[data-action="${button0}"]`).click().keyup();   
$(`img[data-action="${button0}"]`).click().keyup();   
$(`img[data-action="${button9}"]`).click().keyup();   
$(`img[data-action="${button0}"]`).click().keyup();   
$(`img[data-action="${button0}"]`).click().keyup();   



// 본인확인 휴대폰 인증(본인확인하러 가기>)

$('#contents > div > a > div > span').click()




// function _makeTouchEnKeyE2E(form, etcOption) {
//   console.log("🚀 ~ file: PayInfo_DOM.js ~ line 105 ~ _makeTouchEnKeyE2E ~ etcOption", etcOption)
//   console.log("🚀 ~ file: PayInfo_DOM.js ~ line 105 ~ _makeTouchEnKeyE2E ~ form", form)
//   var ksObj = document.getElementById("CKKeyPro");
//   console.log("🚀 ~ file: PayInfo_DOM.js ~ line 108 ~ _makeTouchEnKeyE2E ~ ksObj", ksObj)
//   var items = [];
//   for (var i = 0; i < form.elements.length; i++) {
//       if (form.elements[i].getAttribute('enc') === 'on' && (form.elements[i].type === 'text' || form.elements[i].type === 'password')) {
//           items.push({
//               name: '_E2E_' + form.elements[i].name,
//               value: ksObj.GetEncData('', form.name, form.elements[i].name)
//           });
//       }
//   }
//   console.log(items)

//   if (items.length == 0) {
//       return;
//   }

//   if (serverCert === undefined) {
//       throw new Error('키보드 보안 프로그램 E2E 암호화용 인증서 값이 없습니다.');
//   }
//   for (var i = 0; i < items.length; i++) {
//       _insertElement(form, items[i].name, items[i].value);
//   }
//   _insertElement(form, '_ENCSEED', ksObj.GetEncData(serverCert, '', ''));
//   if (TNK_SR !== undefined) {
//       _insertElement(form, '_SSEED', TNK_SR);
//   }
// }