// ==UserScript==
// @name HS 多台設定
// @description HS 多台客制化設定
// @license MIT
// @version  0.0.1
// @include *://3scasino.com/*
// @grant GM.xmlHttpRequest
// @namespace https://greasyfork.org/users/1028078
// ==/UserScript==

var host = "http://3scasino.com"
var username = "帳號"
var password = "密碼"
var bet = 10;

// 籌碼列表有變化的時候才改:
var betList = [1,2,5,10,20,25,30,50,100,200,500,1000,2000,5000,10000];
//------------------------------

if (unsafeWindow.host == undefined) {
   unsafeWindow.host = host;
}
if (unsafeWindow.username == undefined) {
   unsafeWindow.username = username;
}
if (unsafeWindow.password == undefined) {
   unsafeWindow.password = password;
}
if (unsafeWindow.bet == undefined) {
   unsafeWindow.bet = bet;
}

if (unsafeWindow.betList == undefined) {
   unsafeWindow.betList = betList;
}
