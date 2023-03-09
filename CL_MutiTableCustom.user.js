// ==UserScript==
// @name     CL 多台懶人工具
// @description CL 多台懶人工具..
// @license MIT
// @version  0.0.2
// @include *://www.cali999.net/*
// @include *://www.cali888.net/*
// @include *://www.cali777.net/*
// @include *://www.cali666.net/*
// @include *://www.cali555.net/*
// @include *://www.cali333.net/*
// @include *://www.cali1122.net/*
// @include *://www.cali2233.net/*
// @include *://www.calibet8.net/*
// @include *://www.calibet9.net/*
// @include *://www.cali1356a.net/*
// @include *://www.cali1356b.net/*
// @grant    none
// ==/UserScript==
//----------------------------------
var room = [' Q001', ' Q002', ' Q003', ' Q004', ' Q005', ' B031', ' B001', ' B002', ' B018', ' B019', ' B301', ' B302', ' B303', ' B304', ' B305'];

//----------------------------------

var RefreshObserver = null;

document.onreadystatechange = function () {  
  OnWebStateChanged();
};


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
              HandleTableWrap(addn);
            }
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

function HandleTableWrap(tableWrap) {
  console.log("find!!")
  setTimeout(function () {
    let tableNameNode = tableWrap.querySelector(".MultiTableTableName")

    if (!room.some(t => tableNameNode.innerText.includes(t))) {
      console.log("砍掉: " + tableNameNode.innerText)
      tableWrap.remove();
    } else {
      console.log("保留: " + tableNameNode.innerText)
    }
  }, 3000);
}

