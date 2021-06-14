/* Dependency Loader */
dependents = (function() {
  // Load Sequence
  let list = [
    './js/utilities.js',
    './js/css.js',
    './js/ux.js',
    './js/thread.js',
    './js/navigate.js',
    './js/modules.js',
    // './js/stratum.js',
    // 'account.js',
  ]

  // variables
  let head = document.getElementsByTagName('head')[0]
  // functions
  let copy  = function(thing) { var out; if (null == thing || 'object' != typeof thing) return thing; if (thing instanceof Date) { out = new Date(); out.setTime(thing.getTime()); return out }; if (thing instanceof Array) { out = []; for (var i=0;i<thing.length;i++) { out[i] = copy(thing[i]) }; return out }; if (thing instanceof Object) { out = {}; for (var attr in thing) { if (out.hasOwnProperty(attr)) { out[attr] = copy(thing[attr]) } }; return out }; throw new Error('Unable to copy thing! Type not supported.'); }
  let raise = function(data) { notify('thread-dependents', {data: data}) }

  // variables for reload()
  let inProgress   = false
  let verbose      = false
  let count        = 0
  let iteration    = []
  let notification = 'default-threaded'
  let performance  = new Date()
  let callback = function() { if (verbose) { raise('completed.') }; count++; reload(); }
  
  let reload = async function(overwriteList, eventToRaise) {
    let vlist = copy(overwriteList ? overwriteList : list)
    if (!inProgress) {
      inProgress = true
      if (eventToRaise) { notification = eventToRaise }
      let uri = window.location.protocol + '//' + window.location.host + window.location.pathname
          uri = uri.replace(/\/[^\\\/]+?\.html/,'')
      let styles  = head.getElementsByTagName('style')
      let scripts = head.getElementsByTagName('script')
      let links   = head.getElementsByTagName('link')
      var i;
      // i = styles.length;  while(i--) { styles[i].parentNode.removeChild(styles[i])   } // this will delete fast style loads for ACE and others
      if (!overwriteList) {
        i = links.length;   while(i--) { links[i].parentNode.removeChild(links[i])     }
        i = scripts.length; while(i--) {
          if (scripts[i].src.match(uri)) {
            scripts[i].parentNode.removeChild(scripts[i])
          }
        }
      }
      // head.appendChild($('<link>',{'rel':'icon','type':'image/png','href':'./core/resources/icon.png'})[0])
    }
    if (iteration.length === 0) { 
      iteration = copy(vlist)
      performance = new Date()
      raise('Loading client dependencies.')
    }
    if (count >= iteration.length) {
      inProgress   = false
      count        = 0
      iteration    = []
      notify(notification)
      raise('Load sequence complete. ' + (new Date() - performance) + 'ms')
      notification = 'default-threaded'
      return true
    }
    let addr = iteration[count]
    let elem = document.createElement('script')
        elem.src = addr + '?' + Math.random()
        elem.onload = callback
        elem.onerror = function() {
          console.log('Error loading: ' + this.src)
          raise('Error loading ' + this.src)
        }
    head.appendChild(elem)
    if (verbose) {
     raise('Successfully loaded ' + addr + '.')
    } else {
     raise('.')
    }
  }

  return {
    reload : reload,
  }
})()