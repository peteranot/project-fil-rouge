/*--------------------------------------------------------------
# CHANGER DE THEME (Couleur du body) -> LocalStorage
--------------------------------------------------------------*/

/* Verifie s'il existe dans le localStorage" */

let themeChangerBtnElem = document.querySelector('.changeTheme');
if(localStorage.currentTheme == null){
    console.log('currentTheme does not exist', )
    localStorage.currentTheme = "color1"
}else{
    console.log('CurrentTheme does exist', )
    console.log('Localstorage: ', localStorage.currentTheme)
}

themeChangerBtnElem.addEventListener('click',()=>{
  if(localStorage.currentTheme == "color1"){
      localStorage.currentTheme = "color2"
      
    }else if (localStorage.currentTheme == "color2"){
      localStorage.currentTheme = "color1"
  }

  updateUI();
});


/* FOONCTION updateUI() --> Attribue la couleurs et le texte du thème" */
updateUI();
function updateUI(){
    if(localStorage.currentTheme == "color1"){
      document.body.style.setProperty("--themeColor", 'white')
      document.body.style.setProperty("--themeTextColor", 'black')
      document.getElementById('btnTheme').style.backgroundColor='white' /* Changer la couleur du bg en blanc */
      document.getElementById('btnTheme').style.color='black' /* Changer la couleur du texte en noir */
      document.getElementById("changerNom").innerHTML = 'Claire' /* Changer le texte du thème en "Claire" */
      document.getElementById('slider_carousel').style.backgroundColor='#F9FADA' /* Changer la couleur du bg du carousel en blanc */
      document.getElementById('wrap_carousel').style.color='black' 
      
      
    }else if (localStorage.currentTheme == "color2"){
      document.body.style.setProperty("--themeColor", "black")
      document.getElementById("changerNom").innerHTML = 'Sombre'; /* Changer le texte du thème en "Sombre" */
      document.body.style.setProperty("--themeTextColor", 'white')
      document.body.style.setProperty("--bgbtnthemeColor", 'white')
      document.getElementById('btnTheme').style.backgroundColor='black' /* Changer la couleur du bg en noir */
      document.getElementById('btnTheme').style.color='#fff'; /* Changer la couleur du texte en blanc */
      document.getElementById('slider_carousel').style.backgroundColor='black'
      document.getElementById('wrap_carousel').style.color='white'
    }

  };

/*--------------------------------------------------------------
# FIN CHANGER DE THEME (Couleur du body) -> LocalStorage
--------------------------------------------------------------*/
    



/*--------------------------------------------------------------
# C A R O U S E L     J A V A S C R I P T
--------------------------------------------------------------*/

function init() {
  const slider = document.querySelector(".slider");
  const nextBtn = slider.querySelector(".slider .nav .next");
  const prevBtn = slider.querySelector(".slider .nav .prev");
  const items = slider.querySelectorAll(".slider .item");

  let current = 0;

  items.forEach((item) => {
      const textWrapper = item.querySelector(".wrap");
      textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
      );
  });

  function anim(current, next, callback) {
      const currentImgs = current.querySelectorAll(".img");
      const currentText = current.querySelectorAll(".content .letter");
      const nextImgs = next.querySelectorAll(".img");
      const nextText = next.querySelectorAll(".content .letter");

      const duration = 400;
      const offset = "-=" + 300;
      const imgOffset = duration * 0.8;

      const tl = anime.timeline({
          easing: "easeInOutQuint",
          duration: duration,
          complete: callback
      });

      // Add children
      tl
          .add({
              targets: currentText,
              translateY: [0, "-.75em"],
              /*clipPath: ['polygon(0 0, 100% 0, 100% 100%, 0% 100%)', 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'],*/
              opacity: [1, 0],
              easing: "easeInQuint",
              duration: 600,
              delay: (el, i) => 10 * (i + 1)
          })
          .add({
                  targets: currentImgs[0],
                  translateY: -600,
                  rotate: [0, "-15deg"],
                  opacity: [1, 0],
                  easing: "easeInCubic"
              },
              offset
          )
          .add({
                  targets: currentImgs[1],
                  translateY: -600,
                  rotate: [0, "15deg"],
                  opacity: [1, 0],
                  easing: "easeInCubic"
              },
              "-=" + imgOffset
          )
          .add({
                  targets: currentImgs[2],
                  translateY: -600,
                  rotate: [0, "-15deg"],
                  opacity: [1, 0],
                  easing: "easeInCubic"
              },
              "-=" + imgOffset
          )
          .add({
                  targets: currentImgs[3],
                  translateY: -600,
                  rotate: [0, "15deg"],
                  opacity: [1, 0],
                  easing: "easeInCubic"
              },
              "-=" + imgOffset
          )
          .add({
              targets: current,
              opacity: 0,
              duration: 10,
              easing: "easeInCubic"
          })
          .add({
                  targets: next,
                  opacity: 1,
                  duration: 10
              },
              offset
          )
          .add({
                  targets: nextImgs[0],
                  translateY: [600, 0],
                  rotate: ["15deg", 0],
                  opacity: [0, 1],
                  easing: "easeOutCubic"
              },
              offset
          )
          .add({
                  targets: nextImgs[1],
                  translateY: [600, 0],
                  rotate: ["-15deg", 0],
                  opacity: [0, 1],
                  easing: "easeOutCubic"
              },
              "-=" + imgOffset
          )
          .add({
                  targets: nextImgs[2],
                  translateY: [600, 0],
                  rotate: ["15deg", 0],
                  opacity: [0, 1],
                  easing: "easeOutCubic"
              },
              "-=" + imgOffset
          )
          .add({
                  targets: nextImgs[3],
                  translateY: [600, 0],
                  rotate: ["-15deg", 0],
                  opacity: [0, 1],
                  easing: "easeOutCubic"
              },
              "-=" + imgOffset
          )
          .add({
                  targets: nextText,
                  translateY: [".75em", 0],
                  /*clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)','polygon(0 0, 100% 0, 100% 100%, 0% 100%)'],*/
                  opacity: [0, 1],
                  easing: "easeOutQuint",
                  duration: 600,
                  delay: (el, i) => 10 * (i + 1)
              },
              offset
          );
  }

  let isPlaying = false;

  function updateSlider(newIndex) {
      const currentItem = items[current];
      const newItem = items[newIndex];

      function callback() {
          currentItem.classList.remove("is-active");
          newItem.classList.add("is-active");
          current = newIndex;
          isPlaying = false;
      }

      anim(currentItem, newItem, callback);
  }

  function next() {
      if (isPlaying) return;
      isPlaying = true;

      const newIndex = current === items.length - 1 ? 0 : current + 1;
      updateSlider(newIndex);

  }

  function prev() {
      if (isPlaying) return;
      isPlaying = true;

      const newIndex = current === 0 ? items.length - 1 : current - 1;
      updateSlider(newIndex);
  }

  nextBtn.onclick = next;
  prevBtn.onclick = prev;
}

document.addEventListener("DOMContentLoaded", init);

/*--------------------------------------------------------------
# F I N    
          C A R O U S E L     J A V A S C R I P T
--------------------------------------------------------------*/