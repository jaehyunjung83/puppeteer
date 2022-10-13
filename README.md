# puppeteer-get-image 🐳

![License](https://img.shields.io/github/license/tquangdo/puppeteer-get-image?color=f05340)
![demo](demo.png)

## deploy local
1/ npm i 2/nodemon index

access to URL(https://demo.tutorialzine.com/2009/09/simple-ajax-website-jquery/demo.html) > download image file at #page3 into "images" folder


# POSTMAN request record(intercept)

1. chrome 확장 프로그램 - postman intercept 설치
2. postman desktop app 설치
3. (!!중요!!) bridge를 별도 download 해야 함!!
 
 [bridge별도 down](https://community.postman.com/t/manually-download-and-install-interceptor-bridge/20947/6)



# set-cookie로 받는 httpOnly 옵션 포함된 JSSESSIONID와 그 option들 어떻게??

1. puppeteer의 CDPSESSION으로는 탈취가능.
   - puppeteer에서 받아서 react front로 전송
   - react front에서 JSSESSONID 저장해서 각 document들 req
   - 문제: react-cookies에서 httpOnly: true로는 브라우저에 저장 안 됨!!
   - httpOnly는 서버에서 set-cookie로 보내서 자동 저장하는 방법밖에 없음!!


2. 