(function(config){var e=navigator.userAgent.toLowerCase(),x=window,B=document;function C(a){return-1!==e.indexOf(a)}
var aa=C("ucbrowser"),ba=C("micromessenger"),ca=C("mqqbrowser"),E="ActiveXObject"in x,da=E&&!x.XMLHttpRequest,ea=E&&!B.querySelector,fa=E&&!B.addEventListener,ha=E&&C("ie 9"),ia=E&&C("rv:11"),ja=x.navigator&&x.navigator.msPointerEnabled&&!!x.navigator.msMaxTouchPoints,ka=ja||C("touch")||"ontouchstart"in B,la=C("webkit"),chrome=C("chrome"),ma=C("firefox"),na=C("android"),oa=-1!==e.search(/android( |\/)4\./),pa=-1!==e.search(/android [23]/),qa=C("windows phone"),ra="devicePixelRatio"in x&&1<x.devicePixelRatio||
"matchMedia"in x&&x.matchMedia("(min-resolution:144dpi)")&&x.matchMedia("(min-resolution:144dpi)").matches,sa=C("ipad;"),ta=sa&&ra,ua=C("ipod touch;"),va=C("iphone;"),wa=va||sa||ua,xa=C("safari"),ya=(C(" os 7")||C(" os 8"))&&wa,F=na||wa||qa||C("mobile")||"undefined"!==typeof orientation,za=B.documentElement,Aa=E&&"transition"in za.style,Ba=!!B.createElementNS&&!!B.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,Ca=!!B.createElement("canvas").getContext,Da="WebKitCSSMatrix"in x&&
"m11"in new window.WebKitCSSMatrix,Ea="MozPerspective"in za.style,Fa="OTransition"in za.style,Ga=Aa||Da||Ea||Fa,Ha=C("windows nt"),Ia=!F&&Ha&&-1===e.search(/nt [67]\.[1-9]/),Ja;
if(!(Ja=!Ca)){var Ka;if(!(Ka=na&&!(oa&&(-1!==e.search(/m351|firefox/)?0:ba&&ca?-1===e.search(/hm note|gt-|m1 note/):C("gt-n710")&&-1!==e.search(/android( |\/)4\.1/)?0:-1!==e.search(/ucbrowser\/((9\.[0-5]\.)|(10\.))/)?-1===e.search(/huawei( p6|h30)/):C("baidubrowser")?-1===e.search(/hm201|sm-g900/):-1!==e.search(/lbbrowser|360|liebao|oupeng|mqqbrowser|sogou|micromessenger|chrome/)||!C("ucbrowser")&&-1!==e.search(/sm-n900|(gt-(n710|i95|p[67]))|(mi( [1-4]|-one))|(huawei( p6|_c8813|h30| g750))|lenovo k900|coolpad_9150/))))){var La;
if(La=va){var Ma=screen.width;La=!(ya&&(aa||ba?!(375<Ma):xa))}Ka=La||ua||ta||qa||E&&!ia||F&&ma||Ha&&C("version")}Ja=Ka}var Na=Ja,Oa=!1;try{Oa="undefined"!==typeof x.localStorage}catch(Pa){}config.f={size:100,Vp:C("macintosh"),Oo:C("baidubrowser"),FJ:ca,Ze:E,Xc:da,zk:ea,xc:fa,XD:E&&!ia,bH:la,um:Oa,oe:na,YH:pa,Qq:aa,chrome:chrome,Ju:ma,aJ:Aa,cH:Da,zI:Ea,yJ:Fa,KB:Ga,Y:F,vJ:F&&la,FE:F&&Da,uJ:F&&x.opera,fE:wa,Gb:ka,Dv:ja,bJ:ha,ka:ra,ag:Ba,lv:Ca,gq:Na,Qi:!Na&&!Ia,fq:!Ba&&F&&Ca};var x=window,G="http map anip layers overlay0 brender mrender".split(" ");config.nc="main";config.f.Gb&&(G+=",touch",config.nc+="t");config.f.Y||(G+=",mouse",config.nc+="m");config.f.gq&&!config.f.fq?(config.nc+="d",G+=",drender"):(G+=",crender",config.nc+="c",config.f.Qi&&(config.nc+="v",G+=",vectorlayer,overlay",G+=",vp",config.nc+="p"),config.f.Qi&&(config.nc+="vt",G+=",vt"));config[7]&&(G+=","+config[7],config.nc+=config[7].replace(",","").replace(eval("/AMap./gi"),""));G+=",sync";config.px=G.split(",");window.AMap=window.AMap||{};window.AMap.Df="1.3.8.1.3";var Qa=window.AMap.Xq={},Ra=config[2].split(",")[0],Sa=Ra+"/theme/v"+config[4]+"/style1.3.8.1.3.css",Ta=document.head||document.getElementsByTagName("head")[0];if(Ta){var Ua=document.createElement("link");Ua.setAttribute("rel","stylesheet");Ua.setAttribute("type","text/css");Ua.setAttribute("href",Sa);Ta.insertBefore(Ua,Ta.firstChild)}else document.write("<link rel='stylesheet' href='"+Sa+"'/>");
function Va(){var a=Wa,b=document,c=b.createElement("script");c.charset="utf-8";c.src=a;return(a=b.body||Ta)?(a.appendChild(c),!0):!1}var Xa=(new Date).getTime();Qa.__load__=function(a){a(config,Xa);delete Qa.__load__};try{if(window.localStorage){var I=window.localStorage["_AMap_"+config.nc],Ya=!1;I?(I=JSON.parse(I),I.version===window.AMap.Df?(eval(I.script),Qa.loaded=!0):Ya=!0):Ya=!0;if(Ya)for(var Za in window.localStorage)window.localStorage.hasOwnProperty(Za)&&0===Za.indexOf("_AMap_")&&window.localStorage.removeItem(Za)}}catch($a){}
if(!Qa.loaded){var Wa=Ra+"/maps/main?v="+config[4]+"&key="+config[0]+"&m="+config.px.join(",")+"&vrs=1.3.8.1.3";config[5]&&Va()||(document.write('<script id="a$m@p&j^s_" src=\''+Wa+"' type='text/javascript'>\x3c/script>"),document.getElementById("a$m@p&j^s_")||Va());delete config.px};
})(["3f31aeb5a9c70b1efdbdb7cbab69cab8",[107.663753,33.693877,109.822433,34.743104,108.948024,34.263161],"http://js.webapi.amap.com",1,"1.3",null,"610100",""])