var App = {
    // Prendre/charger les data ................................................................................
    start: function () {
        var ajax = new XMLHttpRequest(); // requete http
        ajax.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var elementBd = JSON.parse(this.responseText); // transformer la réponse en objet.
                App.elementBd = elementBd; // l objet elementBd de l'app est égal a la réponse. (comme une liaison)
                App.creerElement();
            }
            // else{
            //     console.log("TRY AGAIN");
            // }
        };
        ajax.open('POST', 'core/request.php', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("montreTout"); //montreTout se transforme en $_POST[montreTout] dans request.php
    },
    // Créer les div ............................................................................................
    creerElement: function () {
        var i = 0;
        var divToDo = document.getElementById("toDo");
        // Je veux un <ul> parent. Pour pas en avoir plusieurs il faut le faire avant la boucle
        var ulToDo = document.createElement("ul"); // créer la balise <ul>
        ulToDo.setAttribute('id', 'ulToDo'); // lui donner l'id ulToDo
        divToDo.appendChild(ulToDo); // Dire a la balise qui a l'id toDo qu'il a un enfant : mon ul.
        while (this.elementBd[i]) { // tant qu'il y a une réponseText
            var tout = this.elementBd[i];
            var titre = this.elementBd[i].titre;
            var description = this.elementBd[i].description;
            var liToDo = document.createElement("li"); // Créer la balise <li>
            ulToDo.appendChild(liToDo);
            liToDo.classList.add('liToDo'); // rajout de la classe
            liToDo.id = this.elementBd[i].id; // Je donne un id à mon <li> = à l'id de la db
            liToDo.innerHTML = titre + " " + description; // Le contenu texte de mon li

            var button = document.createElement("button");
            liToDo.appendChild(button);

            var buttonText = document.createTextNode("X");
            button.appendChild(buttonText);
            i++;
            button.addEventListener('click', function (e) {
                e.preventDefault();
               // let parent = e.target.parentNode.id;
                var parent = e.target.parentNode;
                var elementEfface = document.getElementById("ulToDo").removeChild(parent);

                App.deleteElement(parent.id);
            });
        }
    },
    // Effacer une div ..................................................................................................
    deleteElement: function (id) {
        
        var ajaxDelete = new XMLHttpRequest();
        ajaxDelete.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var deleteBd = this.responseText; // reponse php
                App.deleteBd = deleteBd;
                
            }
        };
        console.log("salut");
        ajaxDelete.open('POST', 'core/request.php', true);
        ajaxDelete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajaxDelete.send("delete=" + id); // delete se transforme en $_POST["delete"] et possede la valeur de l id de l'element effacé

    }
};
App.start();

