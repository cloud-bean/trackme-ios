angular.module('starter.common', [])
  .value('hi', 'world')
  .constant('Alert', [
  {
    code: '64',
    msg: "非法点火报警"
  },
  {
    code: '11',
    msg: "超速报警"
  },
  {
    code: '12',
    msg: "出围栏报警"
  },
  {
    code: '50',
    msg: "掉电报警"
  },
  {
    code: '12',
    msg: "出围栏报警"
  },
  {
    code: '14',
    msg: "终端开机报警"
  },
  {
    code: '01',
    msg: "SOS报警"
  },
  {
    code: '10',
    msg: "内置电池低电压报警"
  },
  {
    code: '03',
    msg: "接触成功"
  },
  {
    code: '33',
    msg: "脱落报警"
  },
  {
    code: '66',
    msg: "长时间停留报警"
  }])
  
;