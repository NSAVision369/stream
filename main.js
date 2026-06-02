const hd = document.querySelector('#hd')
const bx = document.querySelector('#bx')
const ply = document.querySelector('#ply')
const vd = document.querySelector('#vd')
const gb = document.querySelector('#gb')

let ht1 = '<div class="lb"><p class="ttl"></p><img class="tb"/></div>'

window.onload = () => {
  hd.style.paddingLeft = hd.offsetHeight + 'px'
  hd.style.backgroundSize = hd.offsetHeight/100*60 + 'px'
  hd.style.backgroundPositionX = (hd.offsetHeight - parseFloat(hd.style.backgroundSize))/2 + 'px'
  bx.style.top = hd.offsetHeight + bx.offsetLeft + 'px'
  bx.style.height = window.innerHeight - hd.offsetHeight - 2 * bx.offsetLeft + 'px'
  ply.style.height = window.innerHeight - hd.offsetHeight + 'px'
  ply.style.bottom = -ply.offsetHeight + 'px'
  gb.style.paddingLeft = gb.offsetHeight + 'px'
  gb.style.backgroundSize = gb.offsetHeight/100*40 + 'px'
  gb.style.backgroundPositionX = (gb.offsetHeight - parseFloat(gb.style.backgroundSize))/2 + 'px'
  let arr = []
  getxt('dt.txt').then(txt => {
    const ina = txt.split(`\n\n`)
    ina.forEach(v => {
      arr.push(v.split(`\n`))
    })
    for(let i = 0;i < arr.length;i++) {
      bx.innerHTML += ht1
      bx.children[i].setAttribute('id', i)
      bx.children[i].querySelector('.ttl').innerText = arr[i][0]
      bx.children[i].querySelector('.tb').src = 'img/img' + (i + 1) + '.png'
    }
    bx.querySelectorAll('#bx > *').forEach((v, ii) => {
      v.addEventListener('click', () => {
        ply.style.position = 'absolute'
        ply.style.bottom = '0dvh'
        ply.style.opacity = 1
        setTimeout(() => {
          ply.style.position = 'fixed'
          history.pushState(null, '', '')
        }, 500)
        try {
          vd.src = 'vids/vid' + (parseInt(v.getAttribute('id')) + 1) + '.mp4'
        } catch (e) {
          vd.src = arr[ii][3]
        }
        vd.setAttribute('poster', 'img/img' + (parseInt(v.getAttribute('id')) + 1) + '.png')
    })})
  })
}

async function getxt(fn) {
  const dt = await fetch(fn)
  const txt = dt.text()
  return txt
}

gb.addEventListener('click', () => {
  ply.style.position = 'absolute'
  ply.style.bottom = -ply.offsetHeight + 'px'
  ply.style.opacity = 0
  setTimeout(() => ply.style.position = 'fixed', 500)
})

window.onpopstate = () => {
  ply.style.position = 'absolute'
  ply.style.bottom = -ply.offsetHeight + 'px'
  ply.style.opacity = 0
  setTimeout(() => ply.style.position = 'fixed', 500)
}
