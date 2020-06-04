<!DOCTYPE html>
<html>
  <head>
      <title>Horloge du Lycée Marx Dormoy</title>
      <meta name="author" content="M. Pol" />
      <link rel="stylesheet" type="text/css" href="style.css" />
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <link rel="shortcut icon" type="image/x-icon" href="favicon.png"> 
      <script>let time_server = new Date(<?php echo '"'.date('c', time()).'"';?>);let time_ordi = new Date();var ecart = time_server -  time_ordi; if (Math.abs(ecart) < 1000){window.location = 'http://lycee-marxdormoy-creteil.fr/horloge/index.html';}
      </script>
      <script src="script2.js"></script>
  </head>
  <body>
    <div id="overlay" onClick="mode_exam()">
      <h1>Calculatrice en mode examen</h1>
      <em>Cette explication ne concerne pas les calculatrices du collège, ces dernières n'ont pas besoin de mode examen pour être utilisées.</em>
      <p>D'abord il faut vérifier que sa calculatrice <strong>N'EST PAS</strong> en mode examen. Pour cela, on vérifie que la LED (lumière) sur le haut de la calculatrice reste ÉTEINTE.</p>
      <ul>
        <li>Si c'est le cas : le candidat montre le haut de la calculatrice au surveillant de la salle et attend qu'on lui demande de mettre la calculatrice en mode examen.</li>
        <li>Si la calculatrice est déjà en mode examen, la manipulation DOIT être faite par le surveillant de salle.</li>
      </ul>
      <table style="border-collapse: collapse;margin:50px 0px 30px 0px;">
        <tr>
          <th style="border-right:2px solid;">TI 82 ou 83</th>
          <th style="border-right:2px solid;">Casio Graph 25, 35 ou 90</th>
          <th>Numworks</th>
        </tr>
        <tr>
          <td style="border-right:2px solid;">La calculatrice doit être <strong>ÉTEINTE</strong>. <br/>Appuyez simultanément sur les touches <br/><img src="casio-exam.png"/><br/>Validez le mode examen avec la touche ZOOM.</td>
          <td style="border-right:2px solid;">La calculatrice doit être <strong>ÉTEINTE</strong>.<br/>Appuyez simultanément sur les touches <br/><img src="ti-exam.png"/><br/>Validez le mode examen.</td>
          <td>Allumez la calculatrice, puis sélectionnez le mode paramètre.<br/>Sélectionnez le « Mode Examen », puis validez.</td>
        </tr>
      </table>
      <p>Maintenant toutes les calculatrices doivent avoir leur LED qui clignotte.</p>
    </div>

    <div id="notoverlay">
      <div style="display:flex;justify-content: center;">
        <img src="logo.png" alt="logo" width="120" height="120"/>     

        <form id="menu" name="form1" style="margin:auto;">
          <input class="menu" type="button" value="Examen" onClick="examen_page()">
          <input class="menu" type="button" value="Contrôle" onClick="controle_page()">
          <input class="menu" type="button" value="Horloge" onClick="horloge_page()">
        </form>
      </div>
  
    

      <div style="display:flex;justify-content: space-between;margin-top: 100px;">
        <div id="corps" style="flex-grow: 1"></div>
        <div id="exam" style="flex-grow: 1;display:block;"></div>
      </div>
      <div id="affiche_entete" style="display:flex; justify-content: flex-end;"></div>
      <div id="horloge_page"></div>
      <div id="controle_page"></div>

      <div id="footer">
        <p onClick="mode_exam()" style="cursor:pointer;">Cliquez ici pour voir la mise en place du mode examen avec la calculatrice.</p>
        <p>***</p>
        <p style="cursor:pointer;" onclick="fullscreen()">Cliquez ici pour activer ou désactiver le mode plein écran.</p>
      </div>
    </div>
    <script type="text/javascript">
      horloge_page();
    </script>
  </body>
</html>