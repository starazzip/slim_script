// ==UserScript==
// @name     CL 多台系統
// @version  0.0.1
// @grant    GM.xmlHttpRequest
// ==/UserScript==
//----------------------------------

var host;
var username;
var password;
var room;

//----------------------------------

var RefreshObserver = null;

const loginFaileThreshold = 1000 * 60;
const goDragonFaileThreshold = 1000 * 20;
var LoginFailedMethod;
var GoToMutiTableFailedMethod;

const NeedToReloginThreshold = 1000 * 60 * 60;

setTimeout(function () {
  GoLoginPage(null);
}, NeedToReloginThreshold);

InsertButton();
document.onreadystatechange = function () {
  host = unsafeWindow.host;
  username = unsafeWindow.username;
  password = unsafeWindow.password;
  room = unsafeWindow.room;
  OnWebStateChanged();
};


function InsertButton() {
  var zNode = document.createElement('div');
  zNode.innerHTML = `<button id="myButton" type="button">Enter Room</button><br>`;
  zNode.setAttribute('id', 'myContainer');
  var first = document.body.firstChild;
  document.body.insertBefore(zNode, first);
  document
    .getElementById('myButton')
    .addEventListener('click', GoLoginPage, false);
}


function OnWebStateChanged() {
  if (document.readyState === 'complete') {
    if (RefreshObserver != null) {
      RefreshObserver.disconnect();
      RefreshObserver = null;
    }
    RefreshObserver = new MutationObserver(mutations => {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (addn) {
          if (addn === undefined) {
            return;
          }
          if (addn.classList != undefined) {
            if (addn.classList.contains('tableWrap')) {
              clearTimeout(GoToMutiTableFailedMethod);
              HandleTableWrap(addn);
            }
          }
          if (addn.id === 'loginPage') {
            setTimeout(function () {
              ReLoginWebsite();
            }, 3000);
          }
        });
        mutation.removedNodes.forEach(function (n) {
          // console.log(n)
          if (n === undefined) {
            return;
          }
          if (n.id === 'loginPage') {
            console.log('cancel login faile method');
            clearTimeout(LoginFailedMethod);
            setTimeout(function () {
              console.log('NavigateToMutiTable');
              NavigateToMutiTable();
            }, 3000);
          }
        });
      });
    });

    RefreshObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }
}

function NavigateToMutiTable() {
  var evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true);
  document.getElementsByClassName('MULTITABLE')[0].dispatchEvent(evt);
  GoToMutiTableFailedMethod = setTimeout(GoLoginPage, goDragonFaileThreshold);
}

function GoLoginPage(zEvent) {
  window.location.href = host;
}

function ReLoginWebsite() {
  document.getElementById('mLoginInput').value = username;
  document.getElementById('mPasswordInput').value = password;
  var evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true);
  document.getElementById('loginBtn').dispatchEvent(evt);
  console.log('Login...');
  LoginFailedMethod = setTimeout(GoLoginPage, loginFaileThreshold);
}

function HandleTableWrap(tableWrap) {
  console.log("find!!")
  setTimeout(function () {
    let tableNameNode = tableWrap.querySelector(".MultiTableTableName")

    if (!room.some(t => tableNameNode.innerText.includes(t))) {
      console.log("砍掉: " + tableNameNode.innerText)
      tableWrap.remove();
    } else {
      console.log("保留: " + tableNameNode.innerText)
      tableWrap.style.height = '100px';
      tableWrap.style.backgroundColor = "#000000"
      var tableName = tableWrap.querySelector(".tableName");
      tableName.style.fontSize = '44px';
      tableName.style.top = '50px'
      var road = tableWrap.querySelector(".Baccarat8MultiTableRoadmap");
      road.remove();
      StartMonitorTotal(tableWrap);
    }
  }, 3000);
}


function StartMonitorTotal(tableWrap) {
  var tableName = tableWrap.querySelector(".tableName");
  let zNode = document.createElement('div');
  zNode.setAttribute('id', 'myRound');
	zNode.style.textAlign = 'left';
  zNode.style.left = '41px';
  zNode.style.color = "#FF0000"
  zNode.style.fontSize = '44px'
  tableName.parentNode.append(zNode);
  let totalValueNode = tableWrap.querySelector(".detailContainer.evenBg.baccarat")
    .querySelector(".detailTitle.yellow.Total")
    .parentNode
    .querySelector(".detailValue")
  let TotalRoundObserver = new MutationObserver(mutations => {
    mutations.forEach(function (mutation) {
      zNode.innerText = mutation.target.innerText;
      console.log("Total Monitor:");
      console.log(mutation.target.innerText);
    });
  });

  TotalRoundObserver.observe(totalValueNode, {
    childList: true,
    attributes: true,
    characterData: true,
  });
}