// ==UserScript==
// @name CL 設定
// @description CL設定
// @license MIT
// @version  0.0.1
// @updateURL https://github.com/starazzip/slim_script/raw/main/HSsetting.meta.js
// @downloadURL https://github.com/starazzip/slim_script/raw/main/HSsetting.user.js
// @include *://www.cali111.net/*
// @include *://www.cali222.net/*
// @include *://www.cali333.net/*
// @include *://www.cali444.net/*
// @include *://www.cali555.net/*
// @include *://www.cali666.net/*
// @include *://www.cali777.net/*
// @include *://www.cali888.net/*
// @include *://www.cali999.net/*
// @grant none
// @namespace https://greasyfork.org/users/1028078
// ==/UserScript==

var host = "http://3scasino.com"
var username = "帳號"
var password = "密碼"
const room = "房號"


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
