// ==UserScript==
// @name     CL 多台設定
// @description CL 多台的設定
// @license MIT
// @version  0.0.1
// @include *://www.cali111.net/*
// @include *://www.cali222.net/*
// @include *://www.cali333.net/*
// @include *://www.cali444.net/*
// @include *://www.cali555.net/*
// @include *://www.cali666.net/*
// @include *://www.cali777.net/*
// @include *://www.cali888.net/*
// @include *://www.cali999.net/*
// @grant    none
// ==/UserScript==
//----------------------------------
var host = "https://www.cali888.net/"
var username = "帳號"
var password = "密碼"
var room = [' Q001', ' Q002', ' Q003', ' Q004', ' Q005', ' B031', ' B001', ' B002', ' B018', ' B019', ' B301', ' B302', ' B303', ' B304', ' B305'];


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

