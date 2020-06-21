# Horloge
It's a clock for school

## Fonctions :
- Horloge : affiche l'heure ;
- Examen : permet de définir un temps précis (par exemple 4h), calcule l'heure de début, de fin, de sortie (au bout d'une heure). Elle permet également d'afficher les entêtes det feuilles d'examen à compléter;
- Contrôle : permet de définir l'heure de fin de cours, calcul l'heure de début et de fin.

Pour ces deux dernières fonctions, on peut mettre l'heure actuelle, ou le temps restant (il suffit de cliquer sur l'heure).

## Pour installer cette appli :
Tout d'abord télécharger les fichier puis décompresser le fichier zip obtenu.
Ensuite ouvrez le fichier index.php, qui se trouve dans le dossier décompressé, avec un éditeur de texte, puis à la première ligne **$etablissement = 'lycée « Nom du lycee »'**;, remplacer **lycée « Nom du lycee »** par celui de votre établissement, par exemple :
- $etablissement = '**collège Molière**';
- $etablissement = '**lycée Molière**';

Puis modifier le fichier logo.png avec le logo de votre établissement, celui-ci doit aussi s'appeler logo.png !

Renomer le dossier décompressé en horloge puis déposer le dossier compressé dans le dossier racine de votre site internet, si vous en avez un, sinon il faut créer un hébergement.

Voilà tout est prêt ! Pour accéder à l'horloge, il suiffit de rentrer le nom de domaine de votre établissement, suivi de /horloge, en reprenant l'exemple du lycée Molière, ça donnerai lycee-moliere.fr/horloge
