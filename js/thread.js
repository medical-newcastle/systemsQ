/* Thread Supervisor: Sequential Running */
thread = (function() {
  
  let initialise = function() {
    console.log('[Thread] running (initialise)')
    /* input initial functions here */
    css.make(rules) // rules passed from global scope but can be manufactured with any string
    ux.initialise()
    
    modules.initialise()
    
    // dependents.reload()
    console.log('[Thread] completed (initialise)')
  }

  let eventify = function() {
    // window loaded
    window.addEventListener('load', function() {
      initialise()
    })

    // other events
    document.querySelector('body').addEventListener('thread-dependents', function(e,v) {
      // console.log(e.detail.data)
    })
    
    // Module Handler
    document.querySelector('body').addEventListener('modules-loaded', function(e) {
      console.log('Modules loaded.')
      modules.initial()
    })
  }

  return {
    initialise: initialise,
    eventify  : eventify,
  }
})()

thread.eventify()
