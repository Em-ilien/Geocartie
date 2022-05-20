<?php
    if (!isset($_GET["code"]) || $_GET["code"] != "vivelageo")
        die("Erreur : code invalide");

    // Cette page web permet de récupérer les images du département sur Google Image via l'application console cloud google  API "Custom Search API"
?>
<script>
	function getJSONFromFile(url) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send();
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			return JSON.parse(xhr.responseText);
		}
	}

    let json = getJSONFromFile("../data/departements.json");

    for (var i = 0; i < json.length; i++) {
        let departementInfos = json[i];

        let req = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAD9PQpUwnjsJUAxwEPUuYeZk3v68Dww_I&cx=12d426587d6da4cbd&lr=lang_fr&searchType=image&q=" + encodeURIComponent(departementInfos.name + " département paysage")
        let jsonGoogle = getJSONFromFile(req);
    
        for (var j = 0; j < jsonGoogle.items.length; j++) {
            var item = jsonGoogle.items[j];
    
            let image = {
                src: item.link,
                description: item.snippet,
                contextLink: item.image.contextLink
            }
            console.log(json[i])
            json[i].images.push(image);
        }
    }

    console.log(json);
    
</script>