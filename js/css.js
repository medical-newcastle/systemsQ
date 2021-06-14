/* CSS Injector */
let rules = `
body {
  background-color : rgba(  30, 105, 165, 1);
  background-color : rgba(  35, 155, 255, 1);
}
#main {
  position: absolute;
  left    : 0px;
  top     : 0px;
  height  : 100%;
  width   : 100%;
  background-image: url('./assets/raster.png');
}
#navigator {
  position  : absolute;
  left      : 50%;
  bottom    : 0px;
  height    : 45px;
  width     : 345px;
  transform : translate( -50%, 0% );
}
#navigator {
  background: rgba(   5, 115, 205, 0.30 );
  background: rgba( 195, 195, 255, 0.11 );
  background-filter: blur(3px);
  box-shadow: inset 0 7px 6px -7px rgba( 255, 255, 255, 0.03 );
}
#board {
  position   : absolute;
  left       : 50%;
  top        : 0px;
  height     : calc(100% - 45px);
  width      : 345px;
  transform  : translate( -50%, 0% );
}

/* Module Selector */
#module-selector {
  position    : absolute;
  bottom      : 100%;
  width       : 100%;
  min-height  : 270px;
  background  : rgba( 14, 14, 14, 0.13);
  background  : rgba( 15, 115, 225, 1.00 );
  background  : rgba( 45, 155, 255, 0.45 );
  background  : rgba( 255, 255, 255, 0.07 );
  backdrop-filter: blur(3px);
  /* opacity     : 0; */
  display     : none;
  transition  : all 140ms;
}

#module-selector .module {
  font-family  : 'Quicksand','Karla';
  font-size    : 11pt;
  margin-left  : 8px;
  margin-right : 8px;
  padding-left : 1.4em;
  line-height  : 2.4em;
  cursor       : pointer;
  color        : rgba( 15, 15, 15, 1.00 );
}

#module-selector .module:hover {
  color        : rgba( 175, 175, 175, 1.00 );
  background   : rgba(  55, 185, 201, 0.35 );
}

/* Menu */
#menu {
  position     : absolute;
  width        : 44px;
  height       : 44px;
  top          : 50%;
  left         : 23px;
  transform    : translate(-50%, -50%);
  cursor       : pointer;
  background   : rgba(144,144,144,0);
  border-radius: 50%;
  border       : none;
  outline      : none;
}
#menu span {
  position     : absolute;
  width        : 18px;
  height       : 3px;
  top          : 50%;
  left         : 50%;
  background   : #262626;
  background   : rgba( 155, 155, 155, 0.81 );
  background   : rgba( 0, 0, 0, 0.67 );
  border-radius: 2px;
  overflow     : hidden;
  transition   : all 0.24s linear;
}
#menu span::before {
  content   : "";
  position  : absolute;
  width     : 0;
  height    : 100%;
  top       : 0;
  right     : 0;
  background: rgba( 25, 25, 215, 1 );
  transition: all 0.24s linear;
}
#menu span:nth-child(1) {
  animation: span-first-off 0.33s ease-in-out;
  animation-fill-mode: forwards;
}
#menu span:nth-child(2) {
  animation: span-second-off 0.33s ease-in-out;
  animation-fill-mode: forwards;
}
#menu span:nth-child(3) {
  animation: span-third-off 0.33s ease-in-out;
  animation-fill-mode: forwards;
}

#menu.on:hover span::before {
  width: 100%;
  transition: all 0.11s linear;
}
#menu.on span:nth-child(1) {
  animation: span-first-on 0.33s ease-in-out;
  animation-fill-mode: forwards;
}
#menu.on span:nth-child(2) {
  animation: span-second-on 0.33s ease-in-out;
  animation-fill-mode: forwards;
}
#menu.on span:nth-child(3) {
  animation: span-third-on 0.33s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes span-first-on {
  0% {
    transform: translate(-50%, -300%);
  }
  30% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
@keyframes span-first-off {
  0% {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  30% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -300%);
  }
}
@keyframes span-second-on {
  0% {
    transform: translate(-50%, -50%);
  }
  25% {
    background: gray;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-150%, -50%) scale(0);
  }
}
@keyframes span-second-off {
  0% {
    transform: translate(-150%, -50%) scale(0);
  }
  25% {
    background: gray;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
@keyframes span-third-on {
  0% {
    transform: translate(-50%, 200%);
  }
  30% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
@keyframes span-third-off {
  0% {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  30% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, 200%);
  }
}
`

css = (function() {
  let body = document.querySelector('body')  
  let ruleClass = 'css-rules'

  let inject = function(rule, container, rclass) {
    let rc = rclass ? rclass : ruleClass
    let output = '<div class="' + rc + '">&shy;<style>' + rule + '</style></div>'
    if (container) {
      document.querySelector(container).insertAdjacentHTML('beforeend', output)
    } else {
      body.insertAdjacentHTML('beforeend', output)
    }
  }

  let wipe = function(container, rclass) {
    let nodes = document.querySelector(rclass ? rclass : '.' + ruleClass)
    // console.log(nodes)
    if (!nodes) { return false }
    if (container) {
      document.querySelector(container).removeChild(nodes)
    } else {
      body.removeChild(nodes)
    }
  }

  let add = function(rules, container, rclass) {
    inject(rules, container, rclass)
  }

  let make = function(rules) {
    wipe()
    add(rules)
  }

  return {
    add : add,
    make: make,
  }
})()