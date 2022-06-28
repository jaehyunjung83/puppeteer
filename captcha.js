const catcha = require("catcha");
 
const settings = {
  transforms: [
    {key: 'resize', value: '240x100'},
    {key: 'colorspace', value: 'gray'},
    {key: 'negate'},
    {key: 'threshold', value: '12%'},
    {key: 'blur', value: '10 '},
    {key: 'threshold', value: '43%'},
    {key: 'negate'},
  ],
  digitOnly: true,
  deleteTemporaryImage: false,
};
const kitten = catcha(settings);
kitten('https://nice.checkplus.co.kr/botdetectcaptcha?get=image&c=CAPTCHA&t=bbca8e28aa3a4a47bcfe0c1f65e2ceb7&d=1656282441493')
  .then((text) => {
    console.log(text); // 314400
  });