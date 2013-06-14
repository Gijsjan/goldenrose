(function() {
	var currentDB = null;
	var currentColl = null;
	var currentDocs = null;

	$(document).on('click', '.add.collection', function(ev) {
		var collName = window.prompt("Enter collection name", "");
		if ((collName !== null) && (collName !== "")) {

			jqXHR = $.ajax({
				type: 'post',
				url: '/mongo/db/'+currentDB+'/add',
				data: {'collName': collName}
			});
			jqXHR.done(function(collName) {
				$('#colls').append($('<li />').html(currentDB+'.'+collName));
				// console.log(collectionName);
			});
		}
	});

	$(document).on('click', '.add.doc', function(ev) {
		var data = {"": ""};
		editor.setValue(JSON.stringify(data, null, 4), -1);
		$('#editorhead').removeClass('hidden');
		$('#editordiv').removeClass('hidden');
	});

	$(document).on('click', '.save.doc', function(ev) {
		var json = editor.getValue();
		console.log(json);
		jqXHR = $.ajax({
			type: 'post',
			url: '/mongo/db/'+currentDB+'/coll/'+currentColl+'/add',
			data: {'json': json}
		});
		jqXHR.done(function(result) {
			editor.setValue(JSON.stringify(result, null, 4), -1);
			var index = currentDocs.push(result) - 1;
			var name = (result.name) ? result.name : result._id
			$('#docs').append($('<li data-index="'+index+'" />').html(name));
		});
	});

	$(document).on('click', 'ul#dbs li', function(ev) {
		$('#body [id]').addClass('hidden');
		$('#heads [id]').addClass('hidden');

		$('ul#dbs li.active').removeClass('active');
		$(ev.currentTarget).addClass('active');
		currentDB = ev.currentTarget.innerHTML;
		getColls(currentDB);

		$('#collshead').removeClass('hidden');
		$('#collsdiv').removeClass('hidden');
	});	
	$(document).on('click', 'ul#colls li', function(ev) {
		$('#docshead').addClass('hidden');
		$('#docsdiv').addClass('hidden');
		$('#editorhead').addClass('hidden');
		$('#editordiv').addClass('hidden');

		$('ul#colls li.active').removeClass('active');
		$(ev.currentTarget).addClass('active');
		
		// Strip db from name: "user.users" => "users"
		currentColl = ev.currentTarget.innerHTML;
		var dot = currentColl.indexOf('.');
		currentColl = currentColl.substr(dot+1);

		getDocs(currentDB, currentColl);

		$('#docshead').removeClass('hidden');
		$('#docsdiv').removeClass('hidden');
	});
	$(document).on('click', 'ul#docs li', function(ev) {
		$('ul#docs li.active').removeClass('active');
		$(ev.currentTarget).addClass('active');
		var index = ev.currentTarget.getAttribute('data-index');
		showDoc(index);

		$('#editorhead').removeClass('hidden');
		$('#editordiv').removeClass('hidden');
	});
	function showDoc(id) {
		// console.log(currentDocs[id]);
		var str = currentDocs[id];
		editor.setValue(JSON.stringify(str, null, 4), -1);
	}
	function getDocs(db, coll) {
		$docs = $('#docs');

		jqXHR = $.ajax({
			type: 'get',
			url: '/mongo/db/'+db+'/coll/'+coll
		});
		jqXHR.done(function(docs) {
			$docs.html('');
			currentDocs = docs;
			_.each(docs, function(doc, index) {
				var name = (doc.name) ? doc.name : doc._id
				$docs.append($('<li data-index="'+index+'" />').html(name));
			});
		});
	}
	function getColls(db) {
		var $colls = $('#colls');

		jqXHR = $.ajax({
			type: 'get',
			url: '/mongo/db/'+db+'/colls/'
		});
		jqXHR.done(function(data) {
			$colls.html('');

			_.each(data, function(coll) {
				$colls.append($('<li />').html(coll.name));
			});

		});
	}
	function getDBs() {
		jqXHR = $.ajax({
			type: 'get',
			url: '/mongo/dbs'
		});
		jqXHR.done(function(data) {
			_.each(data.databases, function(db) {
				$('#dbs').append($('<li />').html(db.name));
			});

		});
	}
	getDBs();
}());