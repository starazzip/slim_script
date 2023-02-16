// ==UserScript==
// @name HS 設定
// @description HS設定
// @license MIT
// @version  0.0.1
// @include *://3scasino.com/*
// @grant none
// @namespace https://greasyfork.org/users/1028078
// ==/UserScript==

var host = "http://3scasino.com"
var username = "azt001"
var password = "aaaa8888"
const room = "BC01"


if (unsafeWindow.host == undefined) {
   unsafeWindow.host = host;
}
if (unsafeWindow.username == undefined) {
   unsafeWindow.username = username;
}
if (unsafeWindow.password == undefined) {
   unsafeWindow.password = password;
}
if (unsafeWindow.room == undefined) {
   unsafeWindow.room = room;
}

