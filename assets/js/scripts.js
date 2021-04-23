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
    }else if (localStorage.currentTheme == "color2"){
      document.body.style.setProperty("--themeColor", "black")
      document.getElementById("changerNom").innerHTML = 'Sombre'; /* Changer le texte du thème en "Sombre" */
      document.body.style.setProperty("--themeTextColor", 'white')
      document.body.style.setProperty("--bgbtnthemeColor", 'white')
      document.getElementById('btnTheme').style.backgroundColor='black' /* Changer la couleur du bg en noir */
      document.getElementById('btnTheme').style.color='#fff'; /* Changer la couleur du texte en blanc */
    }

  };

/*--------------------------------------------------------------
# FIN CHANGER DE THEME (Couleur du body) -> LocalStorage
--------------------------------------------------------------*/
    