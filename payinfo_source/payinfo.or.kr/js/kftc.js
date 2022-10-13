
function getQryListUri() {
	var uri = new URI();
	var filename = uri.filename();
	filename = filename.replace("qryDetail", "qryList");
	filename = filename.replace("write", "qryList");
	filename = filename.replace("delete", "qryList");
	// 해지요청내역조회 추가
	filename = filename.replace("reqCaclCancel", "reqCaclList");
	uri.filename(filename);
	uri.removeSearch("pk");
	uri.hash("");
	return uri;
}

function getQryDetailUri() {
	var uri = new URI();
	var filename = uri.filename();
	filename = filename.replace("qryList", "qryDetail");
	filename = filename.replace("write", "qryDetail");
	filename = filename.replace("delete", "qryDetail");
	uri.filename(filename);
	uri.hash("");
	return uri;
}

function getWriteUri() {
	var uri = new URI();
	var filename = uri.filename();
	filename = filename.replace("qryList", "write");
	filename = filename.replace("qryDetail", "write");
	filename = filename.replace("delete", "write");
	uri.filename(filename);
	uri.hash("");
	return uri;
}

function getPostUri() {
	
	var uri = new URI();
	var filename = uri.filename();
	filename = filename.replace("qryList", "post");
	filename = filename.replace("qryDetail", "post");
	filename = filename.replace("write", "post");
	uri.filename(filename).suffix("json");
	uri.hash("");
	return uri;
}

function getDeleteUri() {
	var uri = new URI();
	var filename = uri.filename();
	filename = filename.replace("qryList", "delete");
	filename = filename.replace("qryDetail", "delete");
	filename = filename.replace("write", "delete");
	uri.filename(filename).suffix("json");
	//uri.setSearch("pk", document.getElementById("pk").value);
	//uri.hash("");
	return uri;
}

function getInitPwdUri() {
	var uri = new URI();
	var filename = uri.filename();
	filename = filename.replace("qryList", "initpwd");
	filename = filename.replace("qryDetail", "initpwd");
	filename = filename.replace("write", "initpwd");
	uri.filename(filename).suffix("json");
	//uri.setSearch("pk", document.getElementById("pk").value);
	//uri.hash("");
	return uri;
}

function getQryWtrnsUri() {
	var uri = new URI();
	var filename = uri.filename();
	filename = filename.replace("inputRlnmNum", "qryListAcntNum");
	uri.filename(filename).suffix("json");
	//uri.setSearch("pk", document.getElementById("pk").value);
	//uri.hash("");
	return uri;
}

function getFileDeleteUri() {
	//deletefilewebnoti
	var uri = "";
	uri = document.getElementById("admin_url").value +"/mngt/"+document.getElementById("gubun").value + "/deletefile"+
	document.getElementById("gubun").value+".do?pk=" +document.getElementById("pk").value;
	return uri;
}

function kftcGoDetail(pk, seq) {
	var uri = getQryDetailUri();
	uri.setSearch("pk", pk);
	uri.setSearch("seq", seq);
	document.location.href = uri.toString();
}
function kftcGoPage(page) {
//	var uri = getQryListUri();
//	uri.setSearch("page", page);
//	document.location.href = uri.toString();
	
	var paramUtil = $("input[type=hidden][name=paramUtil]").val();
	var uri = getQryListUri();
	uri.search(paramUtil);
	uri.setSearch("page", page);

	var $form = $("form[name=frmPage]");
	var data = uri.search(true);
	for (var key in data) {
		var value = data[key];
		var $input = $('<input type="hidden" name="' + key + '" />');
		$input.val(value);
		$form.append($input);
	}
	
	$form.attr('action', uri.filename());
	$form.attr('method', 'post');
	$form.submit();	
}

function kftcAlert(msg, defaultMsg) {
	if (msg) { alert(msg); }
	else { alert(defaultMsg); }
}

$(function() {

    // 목록, 입력(수정), 삭제 버튼 이벤트 추가
    $("#btnQryList").click(function() {
    	var uri = getQryListUri();
    	document.location.href = uri.toString();
    });
	$("#btnInput").click(function() {
		var uri = getWriteUri();
		uri.removeSearch("pk");
		document.location.href = uri.toString();
	});
	$("#btnWrite").click(function() {
		var uri = getWriteUri();
		document.location.href = uri.toString();
	});
    $("#btnQry").click(function() {
        try {
        	//if (!OnUpdate()){
        	//	return;
        	//}
        	
        	var form = $(this).closest("form");
        	var url = getQryWtrnsUri();
        	form.attr("action", url);
        	//generate a random id, create an empty iframe
        	var  iframeId = 'unique' + (new Date().getTime());
        	var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
        	iframe.hide();
        	
        	//set form target to iframe
        	form.attr('target', iframeId);
        	
        	//Add iframe to body
        	iframe.appendTo('body');
        	form.submit();
        	iframe.load(function(){
        		
        		var data = iframe.contents().text();
        		var json = $.parseJSON(data);
        	
        		if (json.result) {
        			var uri ="";
        			if(json.cmd=="I"){
        				kftcAlert(json.alertMsg, "정상적으로 등록하였습니다.");
        				uri = getQryListUri();
        			}else if(json.cmd=="M"){
        				kftcAlert(json.alertMsg, "정상적으로 수정하였습니다.");
        				uri = getWriteUri();
        			}else{
        		
        				kftcAlert(json.alerMsg,"정상적으로 수정하였습니다.");
        				uri= getQryDetailUri();
        			}
        			document.location.href = uri.toString();
   
        		}
        	 	else {
        			kftcAlert(json.alertMsg, "등록(수정) 처리중 에러가 발생하였습니다.");
        		}
        			});
        	
        }
        catch(exception) {
        	kftcAlert("처리중 장애가 발생하였습니다."); 
        }
    });
    
    $("#btnPost").click(function() {
        try {
        	if (!OnUpdate()){
        		return;
        	}
        	
        	var form = $(this).closest("form");
        	var url = getPostUri();
        	form.attr("action", url);
        	//generate a random id, create an empty iframe
        	var  iframeId = 'unique' + (new Date().getTime());
        	var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
        	iframe.hide();
        	
        	//set form target to iframe
        	form.attr('target', iframeId);
        	
        	//Add iframe to body
        	iframe.appendTo('body');
        	form.submit();
        	iframe.load(function(){
        		
        		var data = iframe.contents().text();
        		var json = $.parseJSON(data);
        	
        		if (json.result) {
        			var uri ="";
        			if(json.cmd=="I"){
        				kftcAlert(json.alertMsg, "정상적으로 등록하였습니다.");
        				uri = getQryListUri();
        			}else if(json.cmd=="M"){
        				kftcAlert(json.alertMsg, "정상적으로 수정하였습니다.");
        				uri = getWriteUri();
        			}else{
        		
        				kftcAlert(json.alerMsg,"정상적으로 수정하였습니다.");
        				uri= getQryDetailUri();
        			}
        			document.location.href = uri.toString();
   
        		}
        	 	else {
        			kftcAlert(json.alertMsg, "등록(수정) 처리중 에러가 발생하였습니다.");
        		}
        			});
        	
        }
        catch(exception) {
        	kftcAlert("처리중 장애가 발생하였습니다."); 
        }
    });
    
	$("#btnDelete").click(function() {
		if(confirm("정말로 삭제 하시겠습니까?\n\n*주의) [확인]버튼을 클릭하실 경우 바로 삭제됩니다.")) {
	
			 try {
		        	var form = $(this).closest("form");
		        	var url = getDeleteUri();
		        	form.attr("action", url);
		        
		        	//generate a random id, create an empty iframe
		        	var  iframeId = 'unique' + (new Date().getTime());
		        	var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
		        	iframe.hide();
		        	
		        	//set form target to iframe
		        	form.attr('target', iframeId);
		        	
		        	//Add iframe to body
		        	iframe.appendTo('body');
		        	form.submit();
		        	iframe.load(function(){
		        		
		        		var data = iframe.contents().text();
		        		var json = $.parseJSON(data);
		        	
		        		if (json.result) {
		        			kftcAlert(json.alertMsg, "정상적으로 삭제 하였습니다.");
		        			var uri = getQryListUri();
		        			document.location.href = uri.toString();
		        		}
		        	 	else {
		        			kftcAlert(json.alertMsg, "삭제 처리중 에러가 발생하였습니다.");
		        		}
		        			});
		        	
		        }
		        catch(exception) {
		        	kftcAlert("처리중 장애가 발생하였습니다."); 
		        }
		}
		});

	
	$("#btn_file_del").click( function(){
		//첨부파일 삭제 공통 함수
		
			if(confirm("정말로 파일을 삭제 하시겠습니까?\n\n*주의) [확인]버튼을 클릭하실 경우 첨부파일이 바로 삭제됩니다.")) {
				$.ajax(getFileDeleteUri(), {
					cache : false,
					dataType : "json",
					success: function(json) {
						if (json.result) {
							kftcAlert(json.alertMsg, "정상적으로 삭제하였습니다.");
							$("div#file").hide();
							$("div#input").show();
						}else{
							alert("파일삭제 처리중 오류가 발생했습니다.\n\n다시 시도해 주십시오.");
						}
					},
					error : function(){
						kftcAlert(" 파일 삭제 장애가 발생하였습니다."); 
					}
				});
			}
		
		});
	
	
	$("#btnInitPwd").click( function(){
		if(confirm("정말로 초기화 하시겠습니까?\n\n*주의) [확인]버튼을 클릭하실 경우 바로초기화 됩니다.")) {
			
			 try {
		        	var form = $(this).closest("form");
		        	var url = getInitPwdUri();
		        	form.attr("action", url);
		        
		        	//generate a random id, create an empty iframe
		        	var  iframeId = 'unique' + (new Date().getTime());
		        	var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
		        	iframe.hide();
		        	
		        	//set form target to iframe
		        	form.attr('target', iframeId);
		        	
		        	//Add iframe to body
		        	iframe.appendTo('body');
		        	form.submit();
		        	iframe.load(function(){
		        		
		        		var data = iframe.contents().text();
		        		var json = $.parseJSON(data);
		        	
		        		if (json.result) {
		        			kftcAlert(json.alertMsg, "정상적으로 초기화 하였습니다");
		        			var uri = getQryDetailUri();
		        			document.location.href = uri.toString();
		        		}
		        	 	else {
		        			kftcAlert(json.alertMsg, "초기화중 에러가 발생했습니다");
		        		}
		        			});
		        	
		        }
		        catch(exception) {
		        	kftcAlert("처리중 장애가 발생하였습니다."); 
		        }
		}
		});
});
