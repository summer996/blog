export const patch = (key, next, parent) => {
  
}


export const patchProps = (key, prev, next, el) => {
  //style
  if (key === "style") {
    //{style: {margin: '0px', padding: '10px'}}
    if (next) {
      for (let k in next) {
        el.style[k] = next[k]
      }
    }

    //{style: {padding: '0px', color: 'red'}} 
    if (prev) {
      for (let k in prev) {
        if (!next.hasOwnProperty(k)) {
          el.style[k] = ''
        }
      }
    }//class
  } else if (key === 'className') {
    if (!el.classList.contains(next)) {
      el.classList.add(next);
    }
  } else if (key[0] === 'o' && key[1] === 'n') {
    prev && el.removeEventListener(key.slice(2).toLowerCase(), prev);

    next && el.addEventListener(key.slice(2).toLowerCase, next);
  } else if (/\[A-Z]|^(?:value|checked|selected|muted)$/.test(key)) {
    el[key] = next;
  } else {
    el.setAttribute && el.setAttribute(key, next)
  }

  
}