$("#bouton").bind('click' , function(){
	$.ajax({
		url:"http://localhost:9000/students",
		data:JSON.stringify({
			nom: $('#nom').val(),
			dateNaissance:$('#dateNaissance').val()
		}),
		contentType: "application/json", dataType:"json", method:"POST"
	})
});


$("#recup_bouton").bind('click', function(){
	//alert()
	$.ajax({
		url:"http://localhost:9000/students",
		contentType: "application/json", dataType:"json",
		method:"GET"
	}).done(function(data){
		console.log(data)
		$('#recup').html(""); // pour qu'au clique il y a une seul fois l'affichage des enregistrements
		for (var i = 0; i < data.length; i++) {
			$('#recup').html($('#recup').html() + /** le + ici permet de concaténer le resultat précédent avec le suivant sinon il sera ecrasé **/ data[i].id + ' ' + data[i].nom +' ' + data[i].dateNaissance + '<br/>');
		}
	});
});


$("#matiere_bouton").bind('click' , function(){
	$.ajax({
		url:"http://localhost:9000/subjects",
		data:JSON.stringify({
			name: $('#matiere').val(),
		}),
		contentType: "application/json", dataType:"json", method:"POST"
		
	})
});


$.ajax({
		url:"http://localhost:9000/students",
		contentType: "application/json", dataType:"json",
		method:"GET"
	}).done(function(data){
		console.log(data)
		for (var i = 0; i < data.length; i++) {
			$('#nom_eleve').html($('#nom_eleve').html() +'<option value='+ data[i].id +'>'+data[i].nom +'</option>');
		}
	});


$.ajax({
		url:"http://localhost:9000/subjects",
		contentType: "application/json", dataType:"json",
		method:"GET"
	}).done(function(data){
		console.log(data)
		for (var i = 0; i < data.length; i++) {
			$('#matieres').html($('#matieres').html() +'<option value='+ data[i].id +'>'+data[i].name +'</option>');
		}
	});



$("#valid_note").bind('click' , function(){
	$.ajax({
		url:"http://localhost:9000/notes",
		data:JSON.stringify({
			studentId: $('#nom_eleve').val(),
			subjectId: $('#matieres').val(),
			note: $('#nb').val(),
		}),
		contentType: "application/json", dataType:"json", method:"POST"
	})
});


$.ajax({
	url:"http://localhost:9000/students",
	contentType: "application/json", dataType:"json",
	method:"GET"
	}).done(function(data){
		console.log(data)
		for (var i = 0; i < data.length; i++) {
			$('#noteEleve').html($('#noteEleve').html() +'<option value='+ data[i].id +'>'+data[i].nom +'</option>'); 
		}

	});

$("#affichNoteEleve").bind('click', function(){ 
	console.log($('#noteEleve').val())
	//alert()
	$.ajax({
		url:"http://localhost:9000/notes?eleveId=" + $('#noteEleve').val(),
		contentType: "application/json", dataType:"json",
		method:"GET"
	}).done(function(data){
		console.log(data)
		$('#resNoteEleve').html(""); // pour qu'au clique il y a une seul fois l'affichage des enregistrements
	//	console.log(data[8].note);
		var moyenne = 0;
		compteur = 0;
		for (var i = 0; i < data.length; i++) {
			//if($('#noteEleve').val()==data[i].studentId){ // le if ici n'est pas utile car le serveur compare toujours l'id selctionné avec l'id de celui qui a eu la note mais si le serveur agit autrement il faudra mettre cette ligne de code.
				$('#resNoteEleve').html($('#resNoteEleve').html() + data[i].note +"/20"+"<br/>");
				moyenne +=data[i].note;
				compteur+=1
			//}	
		}moyenne=moyenne/compteur;
		$('#moyenne').html("La moyenne de l'élève est : " +moyenne+"/20");
	});
});