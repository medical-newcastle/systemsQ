rapidQ = (function() {
  // Globals
  let chainsort   = utilities.chainsort
  let round       = utilities.round
  let sort_by     = utilities.sort_by
  let uniqueArray = utilities.uniqueArray
  let uuid        = utilities.uuid
  // Elements
  let content     = document.getElementById('board')
  let footer      = document.getElementById('navigator')
  // Internal Options
  let delay        = 210
  let url          = 'https://api.github.com/repos/medical-newcastle/clinx/contents?time=' + (new Date().getTime())
  let storageKey   = 'sQ-rapidQ-perms'
  let storageLocal = 'sQ-rapidQ-local'
  // Internal Variables
  let db           = []
  let categories   = {}
  let tags         = {}
  let permissions  = {}
  let permitAll    = true
  let initialStore = false
  
  // Initialise
  let initialise = function() {
    render()
    interact()
  
    let notice = document.getElementById('rapidQ-download-notice')

    let size  = 0
    let index = 0
    let total = 0
    
    let retrieve = function(list) {
      index++
      if (total === 0) { total = list.length }
      let ele = list.shift()
      notice.innerHTML = 'Downloading ' + round( ele.size / 10000, 2) + ' kB from ' + index + '/' + total + ' files.'
      
      let url = ele.download_url
      let xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)
          xhr.send()
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              parse(xhr.response)
              if (list.length > 0) {
                retrieve(list)
              } else {
                exit(size, total)
                return
              }
            }
          }
    }
    
    let m = new XMLHttpRequest()
        m.open('GET', url)
        m.onload = function() {
          if (m.status === 200) {
            let v = JSON.parse(m.response)
            size = 0
            v.forEach(x => size += x.size)
            
            notice.innerHTML = 'Downloading ' + round(size / 10000, 2) + ' kB across ' + v.length + ' files...'
            
            retrieve(v)
          }
        }
        m.send()
  }

  /* Parse data */
  // Some patterns to reduce overhead
  let _category  = /.*\%\%/
  let _reference = /\$\+.*\$\$/
  let _newline   = /\n/
  let _preanswer = /^- /
  
  let parse = function(datum) {
    let items = datum.split(/##/g)
    items.forEach(function(e) {
      if (e.length) {
        let category  = e.match( _category )
        let reference = e.match( _reference ) || []
        let answers   = e.replace(category,'').replace(reference,'').trim().split( _newline )
        let question  = []
        
        category = category[0].replace('%%','')
        category = category.split(',')
        category = category.map(x => x.trim())
        
        reference = reference.map(x => x.replace('$+','').replace('$$','').trim())
        
        question = answers.shift()
        answers = answers.map(x => x.replace( _preanswer, ''))
        
        let item = {Q: question, A: answers, categories: category, reference: reference, uuid: uuid()}
        db.push(item)
      }
    })
  }
  
  /* Completed DB download */
  let exit = function(size, total) {
    let notice = document.getElementById('rapidQ-download-notice')
    
    // UX
    notice.innerHTML = 'Downloaded ' + round(size / 10000, 2) + ' kB across ' + total + ' files.'
    setTimeout(()=> notice.classList.add('rapidQ-fadeOut'), 400)
    document.getElementById('rapidQ-qsize').innerHTML = db.length

    // Categorise    
    categories  = {}
    tags        = {}
    permissions = {}
    db.forEach(function(item) {
      item.categories.forEach((category, index) => {
        tags[category] = tags[category] || []
        tags[category].push(item.uuid)
        if (index == 0) {
          categories[category] = categories[category] || []
          categories[category].push(item.uuid)
          if (typeof permissions[category] == 'undefined') { permissions[category] = true }
        }
        // categories[category]
      })
    })
    // Update permissions from localStorage
    storageInitialisation()
    if (initialStore) {
      storageSave()
      initialStore = false
    }
    // Generate Filters
    makeFilter()
    // First Question
    poseQuestion()
  }
  
  /* Major Functions */
  let poseQuestion = function(query) {
    let performanceStart = window.performance.now()
    
  // permissions.Abdominal = false
  // permissions.Haematology = false
  // permissions.Endocrine = false
    // Reconcile permissions
    let _permitted = Object.entries(permissions).filter(e => e[1] == true).map(e => e[0])
    let _db = []
    db.forEach(function(item, index) {
      let intersect = item.categories.filter(e => _permitted.includes(e))
      if (intersect.length) {
        _db.push(item)
      }
    })
    if (false) { console.log(_db) }
    console.log('Picked a question in ' + round(window.performance.now() - performanceStart, 5) + ' milliseconds.')
    
    // Build the Query
    let b = []
    if (!query || query == '') {
      b = _db
    } else if (retrieve(query) != null) {
      b = [retrieve(query)]
    } else {
      db.forEach(function(item, index) {
        if (item.categories.indexOf(query) != -1) {
          b.push(item)
        }
      })
    }
    if (b.length <= 0) {
      uxShowError('No valid questions from selected categories.')
      document.getElementById('rapidQ-answer-content').innerHTML = ''
      return
    } else {
      Question = b[Math.floor(Math.random() * b.length)]
      document.getElementById('rapidQ-query-content').innerHTML = Question.Q
    }
    
    uxHideSource()
    document.getElementById('rapidQ-answer-src').style.display = 'none'
    uxHideFilter()
    document.getElementById('rapidQ-qback').classList.remove('useable')
    document.getElementById('rapidQ-qsize').innerHTML = _db.length
    
    document.getElementById('rapidQ-answer').style.display = 'none'
    document.getElementById('rapidQ-query').style.display = 'inline-block'
  }

  let replyQuestion = function() {
    let answers = Question.A
    document.getElementById('rapidQ-answer-content').innerHTML = answers.join('<br>')
    document.getElementById('rapidQ-query').style.display = 'none'
    document.getElementById('rapidQ-answer').style.display = 'flex' // 'inline-block'
    document.getElementById('rapidQ-answer-src').style.display = 'inline-block'
    document.getElementById('rapidQ-qback').classList.add('useable')
    uxHideFilter()
  }
  
  let retrieve = function(id) {
    for (var i = 0; i < db.length; i++) {
      if (db[i].uuid == id) { return db[i] }
    }
    return null
  }

  /* Search Functions */
  let interrogate = function(term) {
    if (!term) { return false }
    term = term.toLowerCase()
    if (term[0] == '?' && term.length > 1) { term = term.substring(1) }
    let L = []
    try {
     db.filter(item => {
       if (item.Q.toLowerCase().match(term) && L.indexOf(item.uuid) == -1) {
         L.push(item.uuid)
       }
     })
    } catch(err) { console.log(err) }
    return L
  }
  let search = function(term) {
    if (!term) { return false }
    term  = term.toLowerCase()
    if (term[0] == '?' && term.length > 1) { term = term.substring(1) }
    let L = []
    try {
     for (var key in tags) {
       if (key.toLowerCase().match(term)) {
         tags[key].forEach(item => {
           if (L.indexOf(item) == -1) { L.push(item) }
         })
       }
     }
    } catch(err) { console.log(err) }
    return L
  }
  let deepsearch = function(term) {
    if (!term) { return false }
    if (term[0] != '?') { return [] }
    if (term.length <= 1) { return [] }

    term  = term.toLowerCase().substring(1)
    let L = []
    try {
     db.forEach(function(item, index) {
       if (item.Q.toLowerCase().match(term)) {
         L.push(item.uuid)
       } else {
         for (let answer of item.A) {
           if (answer.toLowerCase().match(term)) {
             L.push(item.uuid)
             break
           }
         }
       }
     })
    } catch(err) {
      console.log(err)
    }
    return L
  }
  
  /* UI/UX */
  let clicks = 0
  let interact = function() {
    document.getElementById('rapidQ-query').addEventListener('click', replyQuestion)
    document.getElementById('rapidQ-answer').addEventListener('click', function() {
      clicks++
      if (clicks === 1) {
        rapidQtimer = setTimeout(function() { poseQuestion(); clicks = 0 }, delay)
      } else {
        clearTimeout(rapidQtimer)
        uxReverse()
        clicks = 0
      }
    })
    document.getElementById('rapidQ-qback').addEventListener('click', uxReverse)
    let input = document.querySelector('#rapidQ-qbar input')
    input.addEventListener('focus', function() {
      uxHideFilter()
      document.getElementById('rapidQ-qsearch').style.display = 'block'
      uxFocus()
    })
    input.addEventListener('focusout', function() {
      uxHideSearch()
    })
    input.addEventListener('keyup', function() {
      uxFocus()
    })
    document.getElementById('rapidQ-qutil').addEventListener('click', function() {
      document.getElementById('rapidQ-qfilter').style.display == 'none' ? uxShowFilter() : uxHideFilter()
    })
    document.getElementById('rapidQ-answer-src').addEventListener('click', function() {
      let hidden = document.getElementById('rapidQ-answer-source').style.display
      if (hidden == 'none') { uxShowSource() } else { uxHideSource() }
    })
    document.getElementById('rapidQ-addQuestion').addEventListener('click', function() {
      uxAddQuestionInterface()
    })
  }
  // Filter UX
  let makeFilter = function() {
    let template = ''
    template += '<li class="rapidQ-li-selector">'
    template +=  '<label class="rapidQ-switch">'
    template +=  '<input class="rapidQ-in-check DATUM" type="checkbox" checked="checked" data="DATUM">'
    template +=  '<span class="rapidQ-slider rapidQ-round"></span>'
    template +=  '</label>'
    template +=  '<div class="rapidQ-selector">CONTENT</div>'
    template += '</li>'
    
    let str = ''
    let R = /DATUM/g
    for (var category in permissions) {
      let c = category
      let p = permissions[category]
      if (typeof categories != 'undefined' && typeof categories[category] != 'undefined' && typeof categories[category].length == 'number') { // surely there is a neater way to do this
        c = category + ' (' + categories[category].length + ')'
      }
      str += template.replace('CONTENT', c).replace(R, category)
    }
    str = template.replace('CONTENT', 'All').replace(R, 'All') + str
    document.getElementById('rapidQ-qfilter').innerHTML = str
    for (var category in permissions) {
      if (!permissions[category]) {
        document.querySelector('.rapidQ-li-selector .rapidQ-in-check.' + category).removeAttribute('checked')
      } else {
        document.querySelector('.rapidQ-li-selector .rapidQ-in-check.' + category).setAttribute('checked', permissions[category])
      }
    }
    if (permitAll) {
      document.querySelector('.rapidQ-li-selector .rapidQ-in-check.All').setAttribute('checked', permitAll)
    } else {
      document.querySelector('.rapidQ-li-selector .rapidQ-in-check.All').removeAttribute('checked')
    }
    
    // Remodel behaviours
    document.querySelectorAll('#rapidQ-qfilter li input').forEach(item => item.addEventListener('change', function() {
      let header = this.getAttribute('data')
      if (header == 'All') { } else {
        if (this.checked) { 
          permissions[header] = true 
        } else {
          permissions[header] = false
        }
      }
      storageSave()
    }))
    document.querySelector('.rapidQ-in-check.All').addEventListener('change', function() {
      if (this.checked) {
        permitAll = true
        document.querySelectorAll('#rapidQ-qfilter .rapidQ-in-check:not(All)').forEach(function(item, index) {
          item.setAttribute('checked', true)
          for (let category in permissions) {
            permissions[category] = true
          }
        })
      } else {
        permitAll = false
        document.querySelectorAll('#rapidQ-qfilter .rapidQ-in-check:not(All)').forEach(function(item, index) {
          item.removeAttribute('checked')
          for (let category in permissions) {
            permissions[category] = false
          }
        })
      }
      storageSave()
    })
  }

  let registerNewQuestion = function() {
    let Q = document.querySelector('#rapidQ-addQ-question textarea').value
    let A = document.querySelector('#rapidQ-addQ-answers textarea').value
    let T = document.querySelector('#rapidQ-addQ-tags textarea').value
    let S = document.querySelector('#rapidQ-addQ-source textarea').value
    if (Q.length < 1) { uxShowError('Unable to register new question without a question.'); return }
    if (A.length < 1) { uxShowError('Unable to register new question without answers.'); return }


    let textQuestion = ``
    textQuestion += '## ' + T + ' \%\%%0d%0a'
    textQuestion += Q + '%0d%0a'
    textQuestion += A + '%0d%0a'
    textQuestion += '$+ ' + S + ' $$'
 
    textQuestion.replace(/\%/g, '%%')
    // console.log(textQuestion)
    
    window.location = 'mailto:will.xm.yu@gmail.com?subject=RapidQ%20New%20Question&body=' + textQuestion + '"'

    /*
    A = A.split(/\r\n/g)
    // Handle Tags
    T.length <= 0 ? T = 'Miscellaneous' : T
    T = T.split(/,/g)
    T = T.map(e => e.trim())
    // Handle Sources
    S = [S]
    let _uuid = uuid()

    let newQuestion = {Q: Q, A: A, categories: T, reference: S, uuid: _uuid}
    // Register the question
    db.push(newQuestion)
    let newCategory = true
    for (let category in categories) {
      if (T.indexOf(category) != -1) { categories[category].push(_uuid); newCategory = false }
    }
    for (let tag in tags) {
      if (T.indexOf(tag) != -1) { tags[tag].push(_uuid) }
    }
    // New Category!
    if (newCategory) {
      newCategory = T[0]
      permissions[newCategory] = true
      categories[newCategory] = [_uuid]
      tags[newCategory] = [_uuid]
    }
    */
    uxShowError('Submitted new question.')
    uxRemoveQuestionInterface()
  }

  
  let refresh = function() {
  
  }
  let render = function() {
    let ele = ''
    // ele += '<div id="rapidQ-footer-extension"></div>'
    // ele += '<div id="rapidQ-minimum"></div>'
    ele += '<div id="rapidQ-error"></div>'
    ele += '<div id="rapidQ-query"><div id="rapidQ-query-content"></div></div>'
    ele += '<div id="rapidQ-answer"><div id="rapidQ-answer-content"></div></div>'
    ele += '<div id="rapidQ-qbar"><div id="rapidQ-qback">&lsaquo;</div><input id="" placeholder="?"></input>'
    ele +=   '<div id="rapidQ-qutil">&dHar;</div><div id="rapidQ-qsize"></div><ul id="rapidQ-qsearch"></ul>'
    ele += '</div>'
    ele += '<ul id="rapidQ-qfilter"></ul>'
    content.insertAdjacentHTML('beforeend', ele)
    
    let copy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Copy</title>
    <desc>A solid styled icon from Orion Icon Library.</desc>
    <path data-name="layer2"
     fill="rgba( 35,  35,  35, 0.85)" d="M14 14h50v50H14z"></path>
    <path data-name="layer1" fill="rgba( 35,  35,  35, 0.65)" d="M50 0H0v50h10V10h40V0z"></path>
    </svg>`
    
    ele  = '<div id="rapidQ-footer">'
    ele +=   '<div id="rapidQ-contribute">Read all the questions @ <a href="https://github.com/medical-newcastle/clinx">Github</a></div>'
    ele +=   '<div id="rapidQ-download-notice"></div>'
    ele +=   '<div id="rapidQ-feeder">'
    ele +=      '<div id="rapidQ-addQuestion" class="rapidQ-feeder-icon">+</div>'
    ele +=      '<div id="rapidQ-answer-src" class="rapidQ-feeder-icon">{}</div>'
    ele +=      '<div id="rapidQ-answer-source"></div>'
    ele +=   '</div>'
    ele +=   '<div id="rapidQ-copy" onclick="rapidQ.clipboard()"><div id="rapidQ-copy-icon" class="rapidQ-feeder-icon">' + copy + '</div></div>'
    ele +=   '<div id="rapidQ-copied">Copied to clipboard!</div>'
    ele +=   '<div id="rapidQ-clear" onclick="rapidQ.clearStorage()">&cross;</div>'
    ele += '</div>'
    footer.insertAdjacentHTML('beforeend', ele)
  }

  
  let uxReverse = function() {
    document.getElementById('rapidQ-answer').style.display = 'none'
    document.getElementById('rapidQ-query').style.display = 'inline-block'
    document.getElementById('rapidQ-qback').classList.remove('useable')
  }
  let uxFocus = function() {
    let str   = ''
    let item  = '<li><div onclick="QUERICAL">CONTENT</div></li>'
    let input = document.querySelector('#rapidQ-qbar input')
    if (input.value == '') {
      for (let key in categories) {
        let u = categories[key][Math.floor(Math.random() * categories[key].length)]
        str  += item.replace('CONTENT', key).replace('QUERICAL', 'rapidQ.poseQuestion(\'' + u + '\')')
      }
    } else {
      let L = search(input.value)
          L = L.concat(interrogate(input.value))
          L = L.concat(deepsearch(input.value))
          L = uniqueArray(L)
      L.forEach((ele, index) => {
        L[index] = retrieve(ele)
        L[index].indexable = L[index].categories[0]
      })
      L.sort(chainsort([
        sort_by('indexable', true, null),
        sort_by('Q',         true, null),
      ]))
      L.forEach((ele, index) => {
        str += item.replace('CONTENT', ele.Q).replace('QUERICAL', 'rapidQ.poseQuestion(\'' + ele.uuid + '\')')
      })
    }
    document.getElementById('rapidQ-qsearch').innerHTML = str
  }
  let uxHideSearch = function() {
    setTimeout(function() { document.getElementById('rapidQ-qsearch').style.display = 'none' }, 150)
  }
  let uxShowSource = function() {
    if (typeof Question != 'undefined' && typeof Question.reference != 'undefined') {
      let source = document.getElementById('rapidQ-answer-source')
          source.innerHTML = Question.reference
          source.style.display = 'inline-block'
      let src = document.getElementById('rapidQ-answer-src')
          src.innerHTML = 'x'
          src.classList.add('shown')
          src.style.borderTopRightRadius = '0%'
          src.style.borderTopLeftRadius = '0%'
    }
  }
  let uxHideSource = function() {
    let source = document.getElementById('rapidQ-answer-source')
        source.innerHTML = ''
        source.style.display = 'none'
    let src = document.getElementById('rapidQ-answer-src')
        src.innerHTML = '{}'
        src.classList.remove('shown')
  }
  let uxShowFilter = function() {
    let dropdown = document.getElementById('rapidQ-qutil')
        dropdown.innerHTML = '&rHar;'
    makeFilter()
    let filter = document.getElementById('rapidQ-qfilter')
        filter.style.display = 'block'
  }
  let uxHideFilter = function() {
    let dropdown = document.getElementById('rapidQ-qutil')
        dropdown.innerHTML = '&dHar;'
    let filter = document.getElementById('rapidQ-qfilter')
        filter.style.display = 'none'
  }
  let uxShowError = function(errormsg) {
    let error = document.getElementById('rapidQ-error')
        error.classList.remove('rapidQ-fadeOut')
        error.style.opacity = 1
        error.innerHTML     = errormsg
    setTimeout(()=> { error.classList.add('rapidQ-fadeOut') }, 1100)
  }
  let uxAddQuestionInterface = function() {
    uxRemoveQuestionInterface()
    let ele  = ''
        ele += '<div id="rapidQ-addQ">'
        ele +=   '<div id="rapidQ-addQ-background"></div>'
        ele +=   '<div id="rapidQ-addQ-content">'
        ele +=     '<div id="rapidQ-addQ-question"><div id="rapidQ-addQ-question-label">New Question:</div><textarea></textarea></div>'
        ele +=     '<div id="rapidQ-addQ-answers"><div id="rapidQ-addQ-answers-label">Answers:</div><textarea></textarea></div>'
        ele +=     '<div id="rapidQ-addQ-tags"><div id="rapidQ-addQ-tags-label">Tags:</div><textarea></textarea></div>'
        ele +=     '<div id="rapidQ-addQ-source"><div id="rapidQ-addQ-source-label">Source:</div><textarea></textarea></div>'
        ele +=   '<div id="rapidQ-addQ-save" onclick="rapidQ.addNew()">Submit New Question</div>'
        ele +=   '<div id="rapidQ-addQ-closer" onclick="rapidQ.removeNew()">x</div>'
        ele +=   '</div>'
        ele += '</div>'
    content.insertAdjacentHTML('beforeend', ele)
  }
  let uxRemoveQuestionInterface = function() {
    let Q = document.getElementById('rapidQ-addQ')
    if (Q) {
      Q.parentNode.removeChild(Q)
    }
  }

  // Helper Functions
  let clipboard = function() {
    let unwind = function(str) {
      str = str
              .replace(/&amp;/g, '&')
              .replace(/&gt;/g, '>')
              .replace(/&lt;/g, '<')
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
      return str
    }
    let question = document.getElementById('rapidQ-query-content')
    let answer   = document.getElementById('rapidQ-answer')
    if (answer.style.display == 'none') { 
      answer = question
    } else {
      answer = document.getElementById('rapidQ-answer-content')
    }
    let t = document.createElement('textarea')
        t.setAttribute('id','rapidQ-hidden-textarea')
    document.getElementById('main').appendChild(t)
    let hiddenNode = document.getElementById('rapidQ-hidden-textarea')
    hiddenNode.value = unwind(answer.innerHTML.replace(/<br\s*[\/]?>/gi, '\r\n'))
    hiddenNode.select()
    document.execCommand('copy')
    hiddenNode.parentNode.removeChild(hiddenNode)

    let copymsg = document.getElementById('rapidQ-copied')
        copymsg.classList.remove('rapidQ-fadeOutSine')
    setTimeout(function() {
        copymsg.classList.add('rapidQ-fadeOutSine')
    }, 450)
  }
  
  // Storage Functions
  let storageInitialisation = function() {
    // Test localStorage capabilities
    try { let t = 'test'; localStorage.setItem(t,t); localStorage.removeItem(t) } catch(err) { console.log('No ability to use localStorage.'); console.log(err); uxShowError('No ability to use localStorage.' ); return false }

    // Retrieve and unpack browser data
    if (typeof storageKey !== 'string') { uxShowError('Key used is not a string type.'); return }
    let item = localStorage.getItem( storageKey )
    if (item === null) {
      initialStore = true
      uxShowError('No such key <br/><span style="color:rgba(14,14,14,0.67);">(<span style="color:rgba(255,255,255,0.33);">' + storageKey + '</span>)</span><br/> found in browser memory.')
      return false
    } else {
      item = JSON.parse(item)
    }
    // Allocate saved data to permissions{}
    for (var category in item) {
      if (typeof item[category] == 'boolean') {
        permissions[category] = item[category]
      }
    }
  }
  let storageClearPermissions = function() {
    uxShowError('Cleared filter from browser memory.')
    localStorage.clear( storageKey )
  }
  let storageSave = function() {
    localStorage.setItem( storageKey, JSON.stringify(permissions) )
  }

  return {
    // Default Functions
    initialise: initialise,
    render : render,
    refresh: refresh,
   
    // API
    poseQuestion: poseQuestion,
    clipboard   : clipboard,
    clearStorage: storageClearPermissions,
    addNew      : registerNewQuestion,
    removeNew   : uxRemoveQuestionInterface,

    // Introspection
    db: function() { return db },
    categories: function() { return categories },
    tags: function() { return tags },
  }
})()