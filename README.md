# Faire une todoList en ajax avec des requêtes vers la base de donnée

J'ai crée une todolist en javascript. Et comme le savoir ça se partage je me suis dit : "allez poulette, et si tu faisais ton premier article de dev ? " C'est donc avec une grande fierté et une maladresse de junior que je me lance dans l'aventure.
 
J'ai voulu employer Ajax afin de ne pas devoir rafraîchir la page lorsqu'on rajoute ou supprime un élément. 

Pour télécharger les fichiers voici le liens vers mon github : 

## Structure

Nous auront besoin de plusieurs fichier, chacun ayant son rôle :

- index.php : le fichier principal, notre page d'accueil
- un dossier core (contient tout ce qu'il faut pour se connecter à la db): 
    - un fichier config.php (la carte d'identité : nom de la db, mot de passe, etc...)
    - un fichier connect.php (inclure config.php, se connecter à la db et gérer les erreurs)
    - un fichier request.php (inclure connect.php, les requêtes SQL)
- un fichier ajax.js
    - Une fonction qui intègre dans la div #toDo les todos présents dans la db

### Le fichier request.php

- Une requête pour insérer l'élément dans la bd (INSERT). Chaque élement de la todolist a un titre et un contenu.

### ajax.js

| Méthode                  | Description                                                                                                                                                     | Exemple                                                                       |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| open(method, url, async) | Prend 3 paramètre : La méthode d'envoi, l'url/chemin vers le fichier/url  qui reçoit la requête, true = asynchrone (ne bloque pas le script si pas de réponse)  | ajax.open("POST", 'core/request.php', true);                                  |
| send()                   | Envoyer au serveur                                                                                                                                              | ajax.send();                                                                  |
| setRequestHeader()       | Quand on envoie un formulaire, cet en-tête spécifie les données envoyé avec send                                                                                | xhttp.setRequestHeader("Content-type",  "application/x-www-form-urlencoded"); |
| new XMLHttpRequest()     | Objet qui permet de faire des requêtes                                                                                                                          | var ajax = new XMLHttpRequest();                                              |
| getResponseHeader()      | Retourne les infos de l'en-tête http                                                                                                                            |                                                                               |
| PROPRIETE                |                                                                                                                                                                 |                                                                               |
| onreadystatechange       | Regarde le status de la requête (finie?, erreur?)                                                                                                               |  ajax.onreadystatechange = function() {function(){}};                      |
| readyState               | Le statut de la requête. 1 = connecté au serveur. 4 = finie et prête                                                                                            | (if ajax.readyState === 4)                                                    |
| reponseText              |                                                                                                                                                                 |                                                                               |
| status                   | Retourne un nombre sur le statut de la requête. 200 = OK, 404 not Found                                                                                         | (if ajax.status === 200 )                                                     |
