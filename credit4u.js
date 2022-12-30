// captcha 우회(DOM)

$('#form1')[0][10].value = 'jjjh1983';
$('#form1')[0][12].value = 'wjdwogus1@';
$('#form1')[0][14].value = '123456';    //CAPTCHA input에는 6자리 아무거나
function chkCaptcha() { return true };  //CAPTCHA check function force to "true"
$('#login').click();

$('.layerPopupArea')? $('.layerPopupArea').remove() : null;


// 공동인증서 키보드 보안 우회(DOM)

touchenexInfo.isInstalled = true;
yettie.signFormNewUCPID($('#signMsg').val(), true, true, true, true, true, 'credit4u.or.kr', {
	encoding: 'hex'
}, function resultCallback(result) {
	$("#signedMsg").val(result.signature);
	$("#storageType").val(result.storageType);
    alert('success시: ', result.signature)
	
	if($("#signedMsg").val() ==  null || $("#signedMsg").val() == "") {
		alert("전자서명문 또는 식별번호 검증 메시지가 올바르지 않습니다.");
		return ;
	}
	
	if(makeEncData(frm)){
		document.frm.submit();
	}
}, function errorCallback(error) {
	if(error.code == -9999) alert('error시: ', error.code);  // 취소 버튼 이벤트 error.code: -9999
	else alert(error.msg);
});


// 회원가입

//  form안에 있는 전체 체크박스 찾아서 true처리
$("#termForm").find('input').prop("checked", true);
$('#confirmTermBase').click();
$('#popupChk1').prop("checked", true);
$('#popupChk2').prop("checked", true);
$('#confirmTerm02').click();
$('#popupChk3').prop("checked", true);
$('#confirmTerm03').click();


$("#termForm").find('input#userName').val('박금염');
$("#termForm").find('input#userJuminNo1').val('530613');
$("#termForm").find('input#userJuminNo2').val('2008918');
$("#termForm").find('a#a_next').click();

//  공동인증서 본인 확인(UCPID) 전체 동의
$('#container > div.certifStep.jointCertificate.contentsWrap > form').find('input').prop("checked", true);


touchenexInfo.isInstalled = true;

yettie.signFormNewUCPID($('#signMsg').val(), true, true, true, true, true, 'credit4u.or.kr', {
	encoding: 'hex'
}, function resultCallback(result) {
	$("#signedMsg").val(result.signature);
	$("#storageType").val(result.storageType);
    alert('success시: ', result.signature)
	
	if($("#signedMsg").val() ==  null || $("#signedMsg").val() == "") {
		alert("전자서명문 또는 식별번호 검증 메시지가 올바르지 않습니다.");
		return ;
	}
	
	if(makeEncData(frm)){
		document.frm.submit();
	}
}, function errorCallback(error) {
	if(error.code == -9999) alert('error시: ', error.code);  // 취소 버튼 이벤트 error.code: -9999
	else alert(error.msg);
});


$('#container > div.certifStep.jointCertificate.contentsWrap > form').find('button#btnPubCert').click();




// window에서 제대로 공인인증 시 request data내용
data: {
    "__E2E_KEYPAD__":"2e517a8ffb507bd94d9472d60c31c10d10ddac436d8c65dc455fcd01ebb5f1fc1b5fd4ca2458bb2deb0096b7ec24e1c7772dd84cf81c474e5549d39c03b7d018b5121f03f952d1a8b96acae0a44a906f155189af184bca0b98a9ba527510eaf740f696968c87da765b82c74c346cc31c700ed2ecbfa515902a60ab8d885745f03ee2f31295f6e54e0ea553161c4833f3b8588d4abc6d1965c7969b8bec04f8f54360c3b56e9a93b8fb13403dc352539f94d5f0be39d09aa981a35c3760bb723f0305f9122609aa1d6a23fe02fbf2321914319b5abe41e8404ec3338906e5bc891d8ff2f433d0738ec9ac5fe4c88e12e9af3ccf6c12d5a085966e4a6ef7958126",
    "__E2E_UNIQUE__":"165761001482540",
    "__KH_a67b91978b73":"663a1578e4ea2f91ba928e2b45f77b992a12b917b702f23a3cb40b4589a38b76b75a1b82814e2a79b219c6e3aaf215df70998cfc7021130cc4312856c4f828582f6bacef855b5c82970b47332ea7024ec7f02b95ae5e8eacb15aaf64000924c770998cfc7021130cc4312856c4f828582f6bacef855b5c82970b47332ea7024ec7f02b95ae5e8eacb15aaf64000924c79b07bedf112619f17693e27b5ee8a7f6720409b815cdc9dd8cd6b1aa69b93da34f563607295d127d3eab432a2c01771fc9792755d18f288e9aa92318f10847ce1e2fe0efacbc81443fa721b61df9a052b5aa98906da43270164ee094ea5c5726fcc91a6d15ba54075262c2e052e9aa17a60fdcea1149ddc86b51d9425955c23ebf5d9f2e88a69bb2fdeed55869e556059b07bedf112619f17693e27b5ee8a7f6720409b815cdc9dd8cd6b1aa69b93da34f563607295d127d3eab432a2c01771f",
    "__KI_userJuminNo2":"b0ce5df004f4fe5469f4024feac0131c6272c9b744e56c93b2fd138e6ebf7f3d42586dbac01360a6b52ac88b66eddc928986135e9ea407842640b2ebe1c4274765feac87cecb10139647a7073f4cf93c85a596d84bf9318499283202e15f16f3",
    "__KU_a67b91978b73":"Y",
    "_csrf":"080c31cb-e2c3-4312-90b7-bd71b8b017f5",
    "userDiv":"1",
    "serverChk":"1",
    "tearm_item_base":"agree",
    "tearm_item01":"agree",
    "tearm_item01-01":"agree",
    "tearm_item01-02":"agree",
    "tearm_item02":"agree",
    "userName":"박금염",
    "userJuminNo1":"530613",
    "userJuminNo2":"1111111",
    "userBirth":"",
    "certType":"X"
}

//  mac에서 chrome자동완성으로 비번입력 시 req.payload
data: {
    "__E2E_KEYPAD__":"675ba27046aa7ee00beecfcc4e52c4f6e07af30057636ba47e93a2f78069d69f2c64e9878055193aff8f384f81fc65dd5cd1421dff7ea1d67f1785ef40ca0929cfab1de258810824f7d733f27752c3a5771e01a0a237e9268616b3f4fb6821a8c5ae50b3cf4d5e9a7ff62f886fcaa05ac507ab7804cf92c00c903c42507671e78ed13ed3b28cc55d64aa8381026fbd56f3758d56ab0965f5341592f4497f264fb64d4671bf8a5bda2feef600050f7e5cbe22a841f804cc8ead736140d184d99f9dac6bf221ea70f2ec9c3cdd77a82b13e5d01c76fa114d0e5f6e94e3828f1e17c8fae7b4b3fa4aa5ef01229ad6b6612d2855ba4e0e5ea79d5ec98677a5a3b074",
    "__E2E_UNIQUE__":"165762043898947",
    "__KH_54baa46bfc6a":"",
    "__KI_passwd":"08327e001851e73ca7f331914e8e139185c3bb56735dfc73e3d484ed1c630a17f4395db9b95d9f26209ff1dc8add69fe3c68655827995e6d1c5e8f570e04a02f55fecd7c9751dcad00c9aa4e04bccadcb2a71e2ac66ce2e95099819f6e34e6e0",
    "__KU_54baa46bfc6a":"Y",
    "_csrf":"79b72cf8-bd08-406a-8525-8661ed7f5bd8",
    "p_redirectUrl":"",
    "apcheck":"prod",
    "clientIp":"218.153.214.53",
    "userId":"jjjh1983",
    "passwd":"wjdwogus1@",
    "edtCheckNum":"123456"
}
