import axios from 'axios';
import os from 'os';
import clipboard from 'clipboardy';
import qs from 'qs';
import fs from 'fs';

var networkInterfaces = os.networkInterfaces();


// axios
//     .get('http://1.239.128.41:3005/그래그래')
//     .then(function (result) {
//         console.log('result.data: ', result.data);
//     })
//     .catch(function (error) {
//         console.log("에러 발생 : ", error);
//     });


// axios.interceptors.request.use(
//     function (config) {
//         console.log("🚀 ~ file: justAxios.js:16 ~ config", config)
        
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     });

// axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBHfFN-pVpiBAtYjCps1mYCj2T6gDAn7cU')
// .then((ipGeoInfo) => { 
//     console.log('accuracy:', ipGeoInfo.data.accuracy)
//     return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ipGeoInfo?.data.location.lat},${ipGeoInfo?.data.location.lng}&key=AIzaSyBHfFN-pVpiBAtYjCps1mYCj2T6gDAn7cU`)
//     })
// .then(({data}) => console.log(data.results[0]));








var authdata = qs.stringify({
  'ReturnURL': '',
  'loadcnt': '1',
  'plain': 'CertLogin',
  'signed_msg': '3082078106092a864886f70d010702a08207723082076e020101310f300d06096086480165030402010500301806092a864886f70d010701a00b0409436572744c6f67696ea08205b3308205af30820497a00302010202042e51e7f8300d06092a864886f70d01010b05003052310b3009060355040613026b723110300e060355040a0c077965737369676e31153013060355040b0c0c416363726564697465644341311a301806035504030c117965737369676e434120436c6173732032301e170d3232303631323135303030305a170d3233303631353134353935395a3071310b3009060355040613026b723110300e060355040a0c077965737369676e31143012060355040b0c0b706572736f6e616c344942310c300a060355040b0c03534842312c302a06035504030c23eca095ec9eaced9884282930303838303436323031383036313131383830303030353530820122300d06092a864886f70d01010105000382010f003082010a02820101008aa4f1b9741bcd2bc693d821b90abdb5df56ed7ae04c9aeac678af0a293a99e9d3dbf8110f53571b66d0a25b6ef84e2e8a0a9eac5a990def33f08cad63d6b552e908ebbf135d7944545d0d2f349343b3b289a968339a2ebc42f1fecac5375600aac2967c58c18aa45ebb3bc23bc2ce72adb6c0f42aa79a9dd67d388c1c54a1978fbd16bb27c09d5341ea15a909e39d6fcc3aa59d4ae5943e1056605cd89d1ec35693e1f7fdd28c3ed5ba45f3944266825e7c7db878aea942fef1c6496e6b77a521df67c32223cefda67691319b0b097bd72184c832d7b50401f6e8131a8322bd921e831264d565252c52fa82e214c5d2c5a2e47dad7ebe0fa47e10a96d6fbb450203010001a382026c3082026830818f0603551d230481873081848014efdc44d2c68dc00ea338c07c93c6c341bf4a8ff0a168a4663064310b3009060355040613024b52310d300b060355040a0c044b495341312e302c060355040b0c254b6f7265612043657274696669636174696f6e20417574686f726974792043656e7472616c3116301406035504030c0d4b49534120526f6f74434120348202101c301d0603551d0e041604149511225d239751c47b622be5bd3495a94b7566d6300e0603551d0f0101ff0404030206c030818c0603551d200101ff048181307f307d06092a831a8c9a450101043070304006082b0601050507020230341e32c7740020c778c99dc11cb2940020ae08c735acb0c81cc6d0c5d0c11c0020bc1cae09d55c0020c778c99dc11cc785b2c8b2e4302c06082b060105050702011620687474703a2f2f7777772e7965737369676e2e6f722e6b722f6370732e68746d30680603551d110461305fa05d06092a831a8c9a440a0101a050304e0c09eca095ec9eaced98843041303f060a2a831a8c9a440a0101013031300b0609608648016503040201a022042050ac5033c905526735aa1f134deeb6a637e471a4230b60b2e4029bd60fcbae2630720603551d1f046b30693067a065a06386616c6461703a2f2f64732e7965737369676e2e6f722e6b723a3338392f6f753d6470357039383033382c6f753d4163637265646974656443412c6f3d7965737369676e2c633d6b723f63657274696669636174655265766f636174696f6e4c697374303806082b06010505070101042c302a302806082b06010505073001861c687474703a2f2f6f6373702e7965737369676e2e6f72673a34363132300d06092a864886f70d01010b0500038201010062dd2323ec834e28ee35d3fecbeae4f34a0e3c92fcbd4ee27933c6953b6ae230d883c5d55dd02e338d99b0226f3b27051c1c3b4ea372d85beec239edf5d6f3e1b1a69f8f71b4319574d85af08d6d3a474099c9eded928a095b0cf7abbc57b951e7f78ed41462bb4bbfdd0c2b03f260b535b2caa7e872b7c82b485f740d6a51fa3915fa7cb6147d4e335a7cb9cd6eb3086c31e21245c88bce53cb5f601321570fa5508d25253cf89d6f08d202b69325c742e995787226e60dd9fd7342240f3089fb0d9746254f3acf03fd439c4d34c6f8d4a17095220a436525f2ff92a4301bf0aaac955224169b2c58f0bcae62f351b77ba4dddf1e33e502559a6187f2e22a683182018530820181020101305a3052310b3009060355040613026b723110300e060355040a0c077965737369676e31153013060355040b0c0c416363726564697465644341311a301806035504030c117965737369676e434120436c617373203202042e51e7f8300d06096086480165030402010500300d06092a864886f70d010101050004820100753833093b7c62b71c7c75ca8809a8882e791c793a88f4fc480ff33af86146ca0157dd79f0aae2fcc59662c3a3fcca31742f49fdd29dbba1766ac16a1bfadbef9e60faff4c52663f351e1474662f46efa6f44328aa0728718126fa13f3b20fca5d9ff8b1abebe2a662724981477c683884d588b92924677f74c6c89f57138e9e99b38269861464bd7bf50899035b3eb865520870b3774a7e61b82c6673acd6c0b91b1487ff3370341ceb7a29854265ffdd7d2d17dfb505f531d78f3c88f36c4d7fafad2f8d0665d4df67939b7bb5d28c06ac25d6669e8e278566ecf9255c7d1cf9f8889c29199c27b06bfde6b3fafe6e412e5367da9b5c241e8db6876ac384c4' 
});
var config = {
  method: 'post',
  url: 'https://www.kics.go.kr/portal/site/public2012/template.MAXIMIZE/menuitem.8edb4a3446374da7119c3981ec2007a0/?javax.portlet.tpst=46ec61fdac1352b7119c3981ec2007a0_ws_MX&javax.portlet.prp_46ec61fdac1352b7119c3981ec2007a0=viewID%3DSignResult&javax.portlet.begCacheTok=com.vignette.cachetoken&javax.portlet.endCacheTok=com.vignette.cachetoken',
  headers: { 
    'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"macOS"', 
    'Upgrade-Insecure-Requests': '1', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
    'host': 'www.kics.go.kr', 
    'Cookie': "JSESSIONID1=JSESSIONID=aTgxy7K2uVOa1kenzprZc8aUga1Lar8wBsaEf9lbP4KHrKlObEtJUmHt4R1hagG5.amV1c19kb21haW4veWEyMQ==;",
  },
  data : authdata
};

const auth = () => {
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.headers));
    fs.writeFileSync(`kics.html1`, JSON.stringify(response.data))
})
.catch(function (error) {
  console.log(error);
});
}


var auth1data = qs.stringify({
  'ReturnURL': '',
  'a': '/portal/site/public2012/template.MAXIMIZE/menuitem.8edb4a3446374da7119c3981ec2007a0/?javax.portlet.tpst=46ec61fdac1352b7119c3981ec2007a0_ws_MX&javax.portlet.prp_46ec61fdac1352b7119c3981ec2007a0=viewID%3DPrmppLoginT&javax.portlet.begCacheTok=com.vignette.cachetoken&javax.portlet.endCacheTok=com.vignette.cachetoken',
  'brCodeName': 'Mozilla',
  'brLanguage': 'ko-KR',
  'brMimeType': '[object MimeTypeArray]',
  'brName': 'Netscape',
  'brPlatform': 'MacIntel',
  'brUsrAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'brVerion': '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' 
});
var config = {
  method: 'post',
  url: 'https://www.kics.go.kr/portal/site/public2012/template.MAXIMIZE/menuitem.8edb4a3446374da7119c3981ec2007a0/?javax.portlet.tpst=46ec61fdac1352b7119c3981ec2007a0_ws_MX&javax.portlet.prp_46ec61fdac1352b7119c3981ec2007a0=viewID%3DPrmppLoginT&javax.portlet.begCacheTok=com.vignette.cachetoken&javax.portlet.endCacheTok=com.vignette.cachetoken',
  headers: { 
    'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"macOS"', 
    'Upgrade-Insecure-Requests': '1', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
    'host': 'www.kics.go.kr', 
    'Cookie': 'JSESSIONID1=khXQxyqWrpRvMKpkyKtP0mC6vwlkwz1OB5nhhCP158hcnk7TbNl1mOgmLu4kNqHD.amV1c19kb21haW4venZhMjE=;'
  },
  data : auth1data
};


const auth2 = () => {
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.headers));
  fs.writeFileSync(`kics2.html`, JSON.stringify(response.data))
})
.catch(function (error) {
  console.log(error);
});
}


var mypagedata = qs.stringify({
    'agentYn': 'N',
    'caseNoDvCd': '0001',
    'caseObjpnNm': '',
    'caseObjpnNmOrg': 'C734EC6CA84CAB7B246088B2DB2E6F61',
    'caseRcptNo': '60B28AE9EA076ACCEDEAE066ABAD108D',
    'mnpnYn': 'N',
    'myCase': 'Y',
    'myCaseList': 'Y',
    'profCd': '210',
    'ptsRlsDv': '0002',
    'rrno': '93766E0731E00D8723314ABD73E0CD7D',
    'sstHnglNm': '',
    'sstId': 'E1218551834F12B71E80B7288958432D' 
  });
  var config = {
    method: 'post',
    url: 'https://ap.kics.go.kr/yaa.yaaa.TPSCasePLSMultiR.laf',
    headers: { 
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"', 
      'sec-ch-ua-mobile': '?0', 
      'sec-ch-ua-platform': '"macOS"', 
      'Upgrade-Insecure-Requests': '1', 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'host': 'ap.kics.go.kr', 
      'Cookie': 'JSESSIONID=ACFKhCuCZygxcgW5q7TEEjq785k125ODBXdqoSM9alkLPJQ7br0itNOecZIIcFMq.amV1c19kb21haW4veWEyMQ=='
    },
    data : mypagedata
  };
  
  const myPage = () => {
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.headers));
    fs.writeFileSync('kics3.html', response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}

// auth();
// auth2();
myPage();