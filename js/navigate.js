/* Module Router */
navigate = (function() {

  // parser
  let cmd = function(arg) {
    switch (arg) {
      case 'menu':
        let menu = document.getElementById('menu')
        let list = document.getElementById('module-selector')
        let on   = menu.classList.contains('on')
        on ? menu.classList.remove('on') : menu.classList.add('on')
        on ? list.style.display = 'none' : list.style.display = 'block'
        break;
      default:
        break;
    }
  }

  return {
    cmd : cmd,
  }
})()