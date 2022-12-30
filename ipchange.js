import axios from "axios";
import dns from 'native-dns';

axios.interceptors.request.use(
    function (config) {
        //   console.log("🚀 ~ file: ipchange.js:6 ~ config", config)
        // 요청을 보내기 전에 수행할 일
        // ...
        return config;
    },
    function (error) {
        // 오류 요청을 보내기전 수행할 일
        // ...
        return Promise.reject(error);
    });

    const proxyIP = ['148.76.97.250', '34.67.79.204']
    const proxyPort = [80, 80]

axios.get(
    // 'http://1.239.128.41:3005/rn-upload-multi',
    'https://api.ipify.org/?format=json',
    {
        proxy: {
            protocol: 'http',
            host: proxyIP[1],
            port: proxyPort[1]
        }
    }
    )
    .then(res => {
        const {data} = res
        console.log(data.ip)
    }).catch(err => console.log('axios error', err.response.data))