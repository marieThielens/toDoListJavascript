<?php

include 'connect.php';

// INSERT....................................

if(isset($_POST['add'])){ // add = name du bouton

    $titre = $_POST['titre']; // J'attribue à ma variable titre le contenu de l'input name titre
    $description = $_POST['description'];
    $insert = $bdd->prepare('INSERT INTO toDo (titre, description) VALUES (:titre, :description )');
    $insert->bindParam(":titre", $titre, PDO::PARAM_STR);
    $insert->bindParam(":description", $description, PDO::PARAM_STR);
    $insert->execute();
    header('Location:../index.php'); // Rediriger vers la page d'accueil
}
// DELETE...........................................
if(isset($_POST['delete'])){ 
      $delete = $bdd->prepare("DELETE FROM toDo WHERE id = :id");//
      $delete->bindParam(":id", $_POST['delete'], PDO::PARAM_INT); // PARAM_INT = un entier(sans virgule)
      $delete->execute();
     // echo('coucou');
      echo $_POST['delete'];
     // header('Location:../index.php');
      
    }

// GET ............................................



if(isset($_POST['montreTout'])){ // la valeur de mon ajax.send dans fonctions.js
    $reponse = $bdd->prepare('SELECT * FROM toDo');
    $reponse->execute();
    //  je boucle les réponses
    $donnees = $reponse->fetchAll();
    // envoi des réponses qui sera recupéré par js (a cause du ajax.send montre tout)
    echo json_encode($donnees); // Je le transforme en Json(texte) car php ne recoit et n'envoie que du texte
 }




//$reponse->closeCursor();
