const resText = `)]}'

1786
[["wrb.fr","B7fdke","[[\"728728969159897\",1,1],null,[null,null,null,[[[null,[0.5,0.5,1,1],[[3,\"abEdHsgZ2AE\\u003d\",\"Unknown Type\",1.0E-4,null,null,[null,null,\"0:1:0\"],1,[0],null,null,[[\"UNIFIED_GRID\"]]]],[null,2],null,null,null,null,null,null,2,\"0:1:0\"],[null,[0.5303806,0.43831843,0.84166664,0.8,-0.00923935],[[3,null,null,null,null,[null,null,null
    ,[[[[[\"976780\",[0.025,0.108333334,0.84166664,0.8,0,-0.52937317],null,null,0]],[0.025,0.108333334,0.84166664,0.8,0,-0.52937317]]],[0.025,0.108333334,0.84166664,0.8,0,-0.52937317],0]],[null,null,\"text:0:wrnfdfa8Kuw\\u003d\"],6]]
    ,[null,3]]]]],[null,null,null,\"en\",[[[\"976780\"]],\"Acna4Ga3K/9U7sanvdMEUvzbySYwU4BvKr4EdQ6xmtlNiC6SLpW5pVcGdVCmi9ppnGo2W83P9DKEEaNpymRMoTfKSifpZ91fh9OyNojIwl/9NXCGWozRmNEJ0A\\u003d\\u003d\",[1670854924,345289000]],null,[18,0.979352,3,0.9968675]],null,null,[[null,true]],true,null,null,[],null,null,null,null,null,null,[[1,[[7,\"1592729550122592\"],[1,\"1592729550122592\",[\"728728969159897\",1,1]],[22,\"1592730080370742\"],[23,\"1592730085302862\"],[5,\"1592730080370742\"],[6,\"1592730085302862\"],[24,\"1592730085504292\"],[25,\"1592730088996802\"],[5,\"1592730085504292\"],[6,\"1592730088996802\"],[13,\"1592729550166361\"],[14,\"1592729775090181\"],[3,\"1592729776640500\"],[4,\"1592730080206212\"],[49,\"1592730080723252\"],[50,\"1592730115911129\"],[8,\"1592730115999429\"]]]],null,\"EkcKJDMxYTA3MTNkLWJlY2EtNDAyMS1iMDhkLTkyMGE1NzZiZGE0OBIfUXcxWG5zdXprY01Zd01DYV9XaGZVT1Z1NUxGZFVCZw\\u003d\\u003d\",null,null,null,null,null,null,null,null,\"https://www.google.com/search?tbs\\u003dsbi:AMhZZisgLZVIVobeh9kh2fnLcKbK_10-N0WtkgpFyVnXuCJ8JDZONDG6922zk4ZRPm_1ta1K86uq-QkIVg79EiTICL7HIwKBET0NdfmiQqeumA_1SqfiFXRqhDRFguWRSz7xg6-k3TOx6ckQO_1SuhqT_1-2edVgSOq0meg\"]",null,null,null,"generic"]]
58
[["di",620],["af.httprm",620,"-5944804218575811034",57]]
26
[["e",4,null,null,1884]]`;

const resCaptcha = resText.match(/\[{3}\"[0-9]{6}\"/g);
console.log("🚀 ~ file: regex.js ~ line 9 ~ resCaptcha", resCaptcha)

const test2 = resText.match(/\n+[0-9]+\n|\n/g)
console.log("🚀 ~ file: regex.js ~ line 14 ~ test2", test2)

var test3 = resText.match(/[[[\"[0-9]{6}\"/g)
console.log("🚀 ~ file: regex.js ~ line 17 ~ test3", test3)
var test4 = resText.match(/\[{3}/g)
console.log("🚀 ~ file: regex.js ~ line 19 ~ test4", test4)
var test5 = resText.match(/\D{4}\d{6}\D{2}/g)
console.log("🚀 ~ file: regex.js ~ line 21 ~ test5", test5)
