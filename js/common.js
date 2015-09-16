angular.module('starter.common', [])
    .constant('Alert', [{
        code: '64',
        msg: "非法点火报警"
    }, {
        code: '11',
        msg: "超速报警"
    }, {
        code: '12',
        msg: "出围栏报警"
    }, {
        code: '50',
        msg: "掉电报警"
    }, {
        code: '12',
        msg: "出围栏报警"
    }, {
        code: '14',
        msg: "终端开机报警"
    }, {
        code: '01',
        msg: "SOS报警"
    }, {
        code: '10',
        msg: "内置电池低电压报警"
    }, {
        code: '03',
        msg: "接触成功"
    }, {
        code: '33',
        msg: "脱落报警"
    }, {
        code: '66',
        msg: "长时间停留报警"
    }])

.constant('Period', [
    "1小时", "2小时", "3小时", "4小时", "5小时", "6小时", "7小时", "8小时",
    "9小时", "10小时", "11小时", "12小时", "13小时", "14小时", "15小时", "16小时",
    "17小时", "18小时", "19小时", "20小时", "21小时", "22小时", "23小时", "24小时"
])

.constant('TranslatorServerURL', 'http://120.25.227.156:8080/trackService/rest')

// .constant('TranslatorServerURL', 'http://192.168.191.5:8080/trackService/rest')
.constant('WilddogNotifyBaseURL', 'https://track-translator.wilddogio.com/');
