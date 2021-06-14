/* UI/UX Controller */
ux = (function() {
  let content = document.getElementById('main')

  let wipe = function() {
    content.innerHTML = ''
  }

  let refresh = function() {
    wipe()
  }

  let landing = function() {
    let ele = ''
    ele += '<div id="board"></div>'
    ele += '<div id="navigator">'
    ele += '<button id="menu" onclick="navigate.cmd(\'menu\')"><span></span><span></span><span></span></button>'
    ele += '<div id="module-selector"></div>'
    ele += '</div>'
    content.insertAdjacentHTML('beforeend', ele)
  }

  let initialise = function() {
    refresh()
    landing()
  }

  return {
    refresh: refresh,
    initialise: initialise,
    
  }
})()