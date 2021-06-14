modules = (function() {
  let pointer = 0
  let list = [
    'rapidQ',
  ]

  let registry = []
  
  
  let initialise = async function() {
    let L = list.map(x => './modules/' + x + '.js')
    list.forEach(e => L.push('./modules/' + e + '.css.js'))
    
    dependents.reload(L, 'modules-loaded')
  }
  
  let initial = function() {
    let head = list[pointer] ? list[pointer] : false
    if (window[head] && typeof window[head].render == 'function') {
      window[head].initialise()
    }
  }

  let register = function(module) {
  
  }

  return {
    register: register,
    registry: function() { return registry },
    
    initialise: initialise,
    initial   : initial,
  }
})()