var chrono = 0;
var affiche_temps_restant = true;

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {c = c.substring(1,c.length);}
		if (c.indexOf(nameEQ) == 0) {return c.substring(nameEQ.length,c.length);}
	}
	return null;
}

function reset_cookie(page) {
  if (page == 'examen') {
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    examen_page();
  }
  else if (page == 'controle') {
    document.cookie = 'session_controle=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    controle_page();
  }
  else if (page == 'entete') {
    document.cookie = 'entete=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    examen_page('reinit_entete');
  }
}


function appendLeadingZeroes(n){
  if (n <= 9) {
    return "0" + n;
  }
  return n
}

function printTime(fin) { /*Fonction d'affichage de l'horloge*/
  var date = new Date();
  if (affiche_temps_restant == true) {
    var d = fin - date;
    var hours = appendLeadingZeroes(parseInt(d / 3600000));
    var mins = appendLeadingZeroes(parseInt((d-hours*3600000)/60000));
    var secs = appendLeadingZeroes(parseInt(((d-hours*3600000)-mins*60000)/1000));
  }
  else {
    var hours = appendLeadingZeroes(date.getHours());
    var mins = appendLeadingZeroes(date.getMinutes());
    var secs = appendLeadingZeroes(date.getSeconds());
  }
  if (date < fin) {
    document.getElementById("horloge").innerHTML = hours+' : '+mins+' : '+secs;
  }
  else {
    clearInterval(chrono);
    if (document.getElementById("controle_page").innerHTML != '') {
      document.getElementById("controle_page").style.display = 'block';
      document.getElementById("controle_page").innerHTML = '<h1 class="horloge">FIN du contrôle</h1><p class="horloge">Veuillez poser vos stylos et rendre vos copies.</p>';
      document.cookie = 'session_controle=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    else if (document.getElementById("corps").innerHTML != '') {
      document.getElementById("corps").style.display = 'block';
      document.getElementById("corps").innerHTML = '<h1 class="horloge">FIN de l\'examen</h1><p class="horloge">Veuillez poser vos stylos et rendre vos copies.</p>';
      document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
}

function print_defined_Time(time) {
  var hours = appendLeadingZeroes(time.getHours());
  var mins = appendLeadingZeroes(time.getMinutes());
  var secs = appendLeadingZeroes(time.getSeconds());
  return hours+' : '+mins+' : '+secs;
}

function examen_page(param) {
  if (param != 'reinit_entete'){
    clearInterval(chrono);
    document.getElementById("controle_page").innerHTML = '';
    document.getElementById("horloge_page").innerHTML = '';
    var session = readCookie('session');
    document.getElementById("corps").style.display = 'flex';
    if (session == null) {
      document.getElementById("corps").innerHTML = '<form name="form2">Quelle est la durée de l\'examen en HH:MM <br/><input type="time" name="input" value="01:00" onKeyPress="if(event.keyCode == 13) examen(form2);">  <input type="button" name="bouton" value="Départ" onClick="examen(form2)"></form>';
    }
    else {
      document.getElementById("corps").innerHTML = '<form name="form2">Voulez-vous reprendre l\'horloge précédente ? <br/><input type="button" value="Oui" onClick="examen(form2)">   <input type="button" value="Non" onClick="reset_cookie(\'examen\')"></form>';
    }
  }
  if (readCookie('entete') == null) { /*Si l'entete n'a pas encore été remplie*/
    document.getElementById("exam").innerHTML = '<form name="form3">Veuillez remplir l\'entête des feuilles d\'examen<br/>Académie<input type="texte" name="academie" value="Créteil"><br/>Examen<input type="text" name="exam" value="Baccalauréat"><br/>Série<input type="text" name="serie" value=""><br/>Spécialité ou option<input type="text" name="specialite" value=""><br/>Épreuve<input type="text" name="epreuve" value=""><br/>Repère<input type="text" name="repere" value="Sur le sujet"><br/><input type="button" name="bouton" value="Valider" onClick="entete(form3)"></form>';
  }
  else { /*Si l'entete a déjà été remplie*/
    entete()
  }
  if (document.getElementById("exam").style.display != "block") {
    document.getElementById("affiche_entete").innerHTML = '<input id="bouton_entete" type="button" value="<<" onClick="masquer_afficher_entete()">';
  }
  else {
    document.getElementById("affiche_entete").innerHTML = '<input id="bouton_entete" type="button" value=">>" onClick="masquer_afficher_entete()">';
  }
}
  

function examen(form2) {
  clearInterval(chrono);
  var session = readCookie('session');
  document.getElementById("corps").style.display = 'block';

  if (session == null) {
    var choix = document.form2.input.value.split(':');
    if (choix[0] == '' | choix[1] == ''){
      examen_page();
    }
    else {
      var deb = new Date();
      var fin = new Date();
      fin.setHours(deb.getHours()+parseInt(choix[0]));
      fin.setMinutes(deb.getMinutes()+parseInt(choix[1]));
      if (fin - deb < 3600000) {
        var sortie = fin;
      }
      else {
        var sortie = new Date();
        sortie.setHours(deb.getHours()+1);
      }
      document.cookie = 'session='+deb+'$'+sortie+'$'+fin+'; expires='+fin.toGMTString()+'; path=/';
    }
  }
  else {
    session = session.split('$');
    var deb = new Date(session[0]);
    var sortie = new Date(session[1]);
    var fin = new Date(session[2]);
  }

  if (affiche_temps_restant == true) {
    document.getElementById("corps").innerHTML = '<table><tr><th>Début</th><th>Sortie autorisée</th><th>Fin</th></tr><tr><td>'+print_defined_Time(deb)+'</td><td>'+print_defined_Time(sortie)+'</td><td>'+print_defined_Time(fin)+'</td></tr></table><div onClick="if (affiche_temps_restant == true){affiche_temps_restant = false;}else{affiche_temps_restant = true;}examen();" style="cursor:url(reverse.png),w-resize;"><h2 class="horloge">Temps restant</h2><h1 id="horloge" class="horloge"></h1></div>';
    chrono = setInterval(printTime, 1000, fin);
  }
  else {
    document.getElementById("corps").innerHTML = '<table><tr><th>Début</th><th>Sortie autorisée</th><th>Fin</th></tr><tr><td>'+print_defined_Time(deb)+'</td><td>'+print_defined_Time(sortie)+'</td><td>'+print_defined_Time(fin)+'</td></tr></table><div onClick="if (affiche_temps_restant == true){affiche_temps_restant = false;}else{affiche_temps_restant = true;}examen();" style="cursor:url(reverse.png),e-resize;"><h2 class="horloge">Heure actuelle</h2><h1 id="horloge" class="horloge" ></h1></div>';
    chrono = setInterval(printTime, 1000, fin);
  }
}

function entete(form3) { /*Fonction d'affichage de l'entête d'exam*/
    if (readCookie('entete') == null) { /*Si l'entête n'a pas encore été validée*/
      var academie = document.form3.academie.value;
      var date = new Date();
      var exam = document.form3.exam.value;
      var serie = document.form3.serie.value;
      var specialite = document.form3.specialite.value;
      var epreuve = document.form3.epreuve.value;
      var repere = document.form3.repere.value;
      var expires = new Date();
      if (readCookie('session') == null) {
        expires.setHours(date.getHours()+5);
      }
      else {
        var fin = new Date(readCookie('session').split('$')[2]);
        expires.setMinutes(fin.getMinutes()+30);
      }
      document.cookie = 'entete='+academie+'$'+date+'$'+exam+'$'+serie+'$'+specialite+'$'+epreuve+'$'+repere+'; expires='+expires.toGMTString()+'; path=/';
    }
    else { /*Si l'entête a déjà été validée*/
      var entete = readCookie('entete').split('$');
      var academie = entete[0];
      var date = new Date(entete[1]);
      var exam = entete[2];
      var serie = entete[3];
      var specialite = entete[4];
      var epreuve = entete[5];
      var repere = entete[6];
    }   /*Affichage de l'entête*/
  document.getElementById("exam").innerHTML = '<div id="entete"><div class="entete" style="position: absolute; top: 4px; left: 90px;" contenteditable="true" spellcheck="false">'+academie+'</div><div class="entete" contenteditable="true" spellcheck="false" style="position: absolute; top: 3px; left: 335px;">'+date.getFullYear()+'</div><div class="entete" contenteditable="true" spellcheck="false" style="position: absolute; top: 23px; left: 160px;">'+exam+'</div><div class="entete" contenteditable="true" spellcheck="false" style="position: absolute; top: 22px; left: 525px;">'+serie+'</div><div class="entete" contenteditable="true" spellcheck="false" style="position: absolute; top: 43px; left: 135px;">'+specialite+'</div><div class="entete" style="position: absolute; top: 42px; left: 520px; width:110px;" contenteditable="true" spellcheck="false">'+repere+'</div><div class="entete" contenteditable="true" spellcheck="false" style="position: absolute; top: 63px; left: 160px;">'+epreuve+'</div><div class="entete" style="position: absolute; top: 83px; left: 60px;">À compléter</div><div class="entete" style="position: absolute; top: 107px; left: 85px;">À compléter</div><div class="entete" style="position: absolute; top: 110px; left: 485px;">À compléter</div><div class="entete" style="position: absolute; top: 127px; left: 80px;">À compléter</div><div class="entete" contenteditable="true" spellcheck="false" style="position: absolute; top: 161px; left: 155px;">'+exam+'</div><div class="entete" contenteditable="true" spellcheck="false" style="position: absolute; top: 161px; left: 410px;">'+serie+'</div><div class="entete" contenteditable="true" spellcheck="false" style="position: absolute; top: 181px; left: 130px;">'+specialite+'</div><div contenteditable="true" spellcheck="false" class="entete" style="position: absolute; top: 201px; left: 150px;">'+repere+'</div><div contenteditable="true" spellcheck="false" class="entete" style="position: absolute; top: 221px; left: 165px;">'+epreuve+'</div></div><button OnClick="reset_cookie(\'entete\')">Réinitialiser</button>';
}

function masquer_afficher_entete() {
  if (document.getElementById("exam").style.display != "none"){
    document.getElementById("exam").style.display = "none";
    document.getElementById("corps").style.textAlign = "center";
    document.getElementById("affiche_entete").innerHTML = '<input id="bouton_entete" type="button" value="<<" onClick="masquer_afficher_entete()">';
  }
  else {
    document.getElementById("exam").style.display = "block";
    document.getElementById("corps").style.textAlign = "";
    document.getElementById("affiche_entete").innerHTML = '<input id="bouton_entete" type="button" value=">>" onClick="masquer_afficher_entete()">';
  }
}

function fin_cours() {
  var deb = new Date();
  var fin = new Date();
  fin.setSeconds(0);
  if (deb.getDay() == 0 | (deb.getDay() == 6 & (deb.getHours() > 12 | (deb.getHours() == 12 & deb.getMinutes()>5))) | (deb.getDay() == 3 & (deb.getHours() > 13 | (deb.getHours() == 13 & deb.getMinutes()>5)))) {
  /*En dehors des heures de l'établissement, il ne se passe rien !*/}
  else {
    switch (deb.getHours()) {
      case 8:
        if (deb.getMinutes() < 55) {
          fin.setMinutes(55);
        }
        else {fin.setHours(9);fin.setMinutes(55);}
        break;
      case 9:
        if (deb.getMinutes() < 55) {
          fin.setMinutes(55);
        }
        else {fin.setHours(11);fin.setMinutes(5);}
        break;
      case 10:
        fin.setHours(11);fin.setMinutes(5);
        break;
      case 11:
      case 12:
      case 13:
      case 14:
        if (deb.getMinutes() < 5) {
          fin.setMinutes(5);
        }
        else {fin.setHours(parseInt(deb.getHours()) + 1);fin.setMinutes(5);}
        break;
      case 15:
        fin.setHours(16);fin.setMinutes(15);
        break;
      case 16:
      case 17:
        if (deb.getMinutes() < 15) {
          fin.setMinutes(15);
        }
        else {fin.setHours(parseInt(deb.getHours()) + 1);fin.setMinutes(15);}
        break;
      case 18:
        if (deb.getMinutes() < 15) {
          fin.setMinutes(15);
        }
        break;
      default:
    }
  }
  return fin;
}

function controle_page() {
  clearInterval(chrono);
  document.getElementById("corps").innerHTML = '';
  document.getElementById("exam").innerHTML = '';
  document.getElementById("horloge_page").innerHTML = '';
  document.getElementById("affiche_entete").innerHTML = '';
  var session = readCookie('session_controle');
  document.getElementById("controle_page").style.display = 'flex';
  if (session == null) {
    var fin_du_cours = fin_cours();
    document.getElementById("controle_page").innerHTML = '<form class="horloge" name="form2">Quelle est l\'heure de fin du contrôle en HH:MM <br/><input type="time" name="input" value="'+appendLeadingZeroes(fin_du_cours.getHours())+':'+appendLeadingZeroes(fin_du_cours.getMinutes())+'" onKeyPress="if(event.keyCode == 13) control(form2);">  <input type="button" value="Départ" onClick="control(form2)"></form>';
  }
  else {
    document.getElementById("controle_page").innerHTML = '<form class="horloge" name="form2">Voulez-vous reprendre l\'horloge précédente ? <br/><input type="button" value="Oui" onClick="control()">   <input type="button" value="Non" onClick="reset_cookie(\'controle\')"></form>';
  }
}

function control(form2) { /* Validation sur la page Contrôle */
  clearInterval(chrono);
  var session = readCookie('session_controle');
  document.getElementById("controle_page").style.display = 'block';
  if (session == null) { /*Si il n'y a pas d'horloge en cours*/
    var choix = document.form2.input.value.split(':');
    if ((choix[0] != '') & (choix[1] != '')) {
      var deb = new Date();
      var fin = new Date();
      fin.setHours(parseInt(choix[0]));
      fin.setMinutes(parseInt(choix[1]));
      fin.setSeconds(0);
      document.cookie = 'session_controle='+deb+'$ $'+fin+'; expires='+fin.toGMTString()+'; path=/';
    }
  }
  else { /*S'il y a une horloge en cours*/
    session = session.split('$');
    var deb = new Date(session[0]);
    var fin = new Date(session[2]);
    var choix = ['19','87'];
  }
  var date = new Date();
  if ((fin - date < 0) | (choix[0] == '') | (choix[1] == '')) {
      controle_page();
  }
  else {
    if (affiche_temps_restant == true) {
      document.getElementById("controle_page").innerHTML = '<table><tr><th>Début</th><th>Fin</th></tr><tr><td>'+print_defined_Time(deb)+'</td><td>'+print_defined_Time(fin)+'</td></tr></table><div onClick="if (affiche_temps_restant == true){affiche_temps_restant = false;}else{affiche_temps_restant = true;}control();" style="cursor:url(reverse.png),w-resize;"><h2 class="horloge">Temps restant</h2><h1 id="horloge" class="horloge"></h1></div>';
      chrono = setInterval(printTime, 1000, fin);
    }
    else {
      document.getElementById("controle_page").innerHTML = '<table><tr><th>Début</th><th>Fin</th></tr><tr><td>'+print_defined_Time(deb)+'</td><td>'+print_defined_Time(fin)+'</td></tr></table><div onClick="if (affiche_temps_restant == true){affiche_temps_restant = false;}else{affiche_temps_restant = true;}control();" style="cursor:url(reverse.png),e-resize;"><h2 class="horloge">Heure actuelle</h2><h1 id="horloge" class="horloge" ></h1></div>';
      chrono = setInterval(printTime, 1000, fin);
    }
  }
}


function horloge_page() {
  clearInterval(chrono);
  document.getElementById("corps").innerHTML = '';
  document.getElementById("exam").innerHTML = '';
  document.getElementById("controle_page").innerHTML = '';
  document.getElementById("affiche_entete").innerHTML = '';
  document.getElementById("horloge_page").innerHTML = '<p class="horloge">Au lycée Marx Dormoy, il est actuellement</p><h1 class="horloge" id="horloge"></h1>';
  chrono = setInterval(printTime2, 1000);
  function printTime2() {
    var d = new Date();
    var hours = appendLeadingZeroes(d.getHours());
    var mins = appendLeadingZeroes(d.getMinutes());
    var secs = appendLeadingZeroes(d.getSeconds());
    document.getElementById("horloge").innerHTML = hours+' : '+mins+' : '+secs;
  }
}

function mode_exam() {
  if (document.getElementById('overlay').style.display != 'block'){
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    if ((document.getElementById("exam").style.display != 'none') & (document.getElementById("corps").innerHTML != '')){
      masquer_afficher_entete();document.getElementById("affiche_entete").style.display = 'none';
    }
  }
  else {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    if (document.getElementById("exam").innerHTML != '') {
      document.getElementById("affiche_entete").style.display = 'block';
    }
  }
}

/*Pour le passage en plein écran*/
var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function fullscreen() {
  if (document.fullscreenElement == null) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}