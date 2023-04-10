// ==UserScript==
// @name HS 多台系統
// @description HS 多台
// @license MIT
// @version  0.0.4
// @include *://3scasino.com/*
// @include *://play.kasar.live/*
// @grant GM.xmlHttpRequest
// @namespace https://greasyfork.org/users/1028078
// ==/UserScript==
var host;
var username;
var password;
var bet;
var betCode;
var betList=[];

InsertButton();
window.addEventListener("DOMContentLoaded", function (event) {
  host = unsafeWindow.host;
  username = unsafeWindow.username;
  password = unsafeWindow.password;
  bet = unsafeWindow.bet;
  betCode = unsafeWindow.betCode;
  betList =unsafeWindow.betList;
  const betIndex =GetBetIndex(bet);
  window.localStorage.setItem(`chips-1-${betCode}-s`, `[${betIndex}]`);
  OnWebStateChanged()
});
function GetBetIndex(chip)
{
	var index = betList.indexOf(chip);
  if(index == -1)
  {
    console.log("Chip index can not find")
    return 0;
  }
  return index;
}

function InsertButton() {
  var zNode = document.createElement('div');
  zNode.innerHTML = `<button id="myButton" type="button">Enter Room</button>`;
  zNode.setAttribute('id', 'myContainer');
  zNode.setAttribute('align', 'center');
  zNode.style.position = "relative";
  zNode.style.zIndex = "99999";
  var first = document.body.firstChild;
  document.body.insertBefore(zNode, first);
  document.getElementById("myButton").addEventListener("click", ButtonClickAction, false);
}

function OnWebStateChanged() {
  setTimeout(function () {
    const login = document.querySelector("#loginBtn");
    if (login != null) {
      Login();
      return;
    }
    const lobby = document.querySelector("#gameLobby");
    if (lobby != null) {
      GoMutiTable();
    }
  }, 500);
}

function ButtonClickAction(ev) {
  window.location.href = host;
}


function Login() {
  console.log('hi: ' + host + ":10002/AjaxServer/Server.aspx?action=login&hyzh=" + username + "&pwd=" + password)
  GM.xmlHttpRequest({
    method: "GET",
    url: host + ":10002/AjaxServer/Server.aspx?action=login&hyzh=" + username + "&pwd=" + password,

    onload: function (response) {
      var loginResp = JSON.parse(response.responseText)
      if (loginResp["success"] == null)
        return;
      var result = loginResp["success"]
      if (result) {
        console.log("登入成功")
        GoMutiTable();
      }
    },
    onerror: function (error) {
      console.log("error!!")
      delay(5000);
      ButtonClickAction(null);
    }
  });
}

function GoMutiTable() {
  GM.xmlHttpRequest({
    method: "GET",
    url: host + ":10002/AjaxServer/Server.aspx?action=getLoginUrl&table=DT",

    onload: function (response) {
      var enterResp = JSON.parse(response.responseText)
      if (enterResp["success"] == null)
        return;
      var result = enterResp["success"]
      if (result) {
        var mutiUrl = enterResp["data"]["Data"]["LoginUrl"];
        console.log(mutiUrl);
        window.location.href = mutiUrl;
      }else
      {
      console.log(enterResp);
      }
    },
    onerror: function (error) {
      console.log("error!!")
      delay(5000);
      ButtonClickAction();
    }
  });
}
