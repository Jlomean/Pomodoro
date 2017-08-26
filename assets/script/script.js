var endTimeMinutes;
var endTimeSeconds;
var timer;
var endAlert = "C'est parti !";
var step = 0;
var steps = 0;
var isRunning = false;
var notifySound = new Audio('assets/sounds/job-done.wav');
var week = ['dim','lun','mar','mer','jeu','ven','sam'];
var year = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
var taskList = ['<b>Tâches développeuse :</b>','','Mettre en place un bouton "Activer les sons" et rendre le Pomodoro muet de base', 'Mettre en place l\'historique des tâches terminées','', '<b>Vos tâches :</b>',''];
var doneList = ['Affichage du temps en minutes et secondes', 'Le timer dure 25 minutes','Une fois les minutes de travail dépassées, il change en un timer de repos de 5mn', 'La fin du temps de travail/pause est dans une boîte d\'alerte', 'Bouton pour mettre en pause, lancer, et reset le timer', 'Mise en forme graphique', 'Tous les 4 sprints, faire une pause plus longue de 15 mn', 'Assigner la barre espace à la pause/reprise du timer', 'Jouer un son d\'alarme pour la fin/reprise du sprint', 'Activer les notifications du navigateur', 'Afficher le timer dans le titre de l\'onglet, pour le confort utilisateur', 'Afficher l\'heure locale sur une horloge dans le header', 'Ajouter un calendrier', 'Mettre en place des jauges pour le timer', 'Mettre en place le formulaire pour la liste de tâches'];

$(function () {
	
	function notifyMe() {
		Push.create("Pomodoro Timer", {
			body: endAlert,
			icon: 'assets/img/timericon.png',
			timeout: 4000,
			onClick: function() {
				window.focus();
				this.close();
			}
		});
	}
	
	$('body').keypress(function(e) {
		if (e.which == 32){
			e.preventDefault();
			pauseTime();
		}
		if (e.which == 13) {
			e.preventDefault();
			pushNew();
		}
	});
	
	$('#wiki').hover(function() {
		$(this).html('<span class="fa fa-wikipedia-w"></span> Pour aller plus loin');
	},
		function () {
			$(this).html($('<span class="fa fa-wikipedia-w"></span>'));
	});
	
	function clock() {
		var d = new Date();
		var wD = week[d.getDay()];
		var nD = d.getDate();
		var mo = year[d.getMonth()];
		$('#day').html(wD);
		$('#daynum').html(nD);
		$('#month').html(mo);
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		var hourDeg = h * 30 + (m / 2) - 180;
		var hourRun = "rotate(" + hourDeg + "deg)";
		$("#hours").css({ "transform": hourRun});
		var minDeg = m * 6 - 180;
		var minRun = "rotate(" + minDeg + "deg)";
		$("#min").css({ "transform" : minRun });
		var secDeg = s * 6 - 179;
		var secRun = "rotate(" + secDeg + "deg)";
		$("#sec").css({ "transform": secRun });
	}
	
	setInterval(clock, 1000);
 	
 	function workTimer () {
 		isRunning = true;
 		if (endTimeSeconds < 10) {
 			var endTime = "Temps restant <br/><br/> " + endTimeMinutes + ' m 0' + endTimeSeconds + ' s';
 		} else {
 			var endTime = "Temps restant <br/><br/> " + endTimeMinutes + ' m ' + endTimeSeconds + ' s';
 		}
 		endTimeSeconds--;
 		if (endTimeSeconds < 0) {
 			endTimeMinutes--;
 			endTimeSeconds += 60;
 		}
 		$('#timer').html(endTime);
		$('title').html(endTimeMinutes + ' m ' + endTimeSeconds + ' s');
 		if (endTimeMinutes < 0) {
 			end();
 		}
 	};
 	
 	function stopIt() {
		clearInterval(timer);
	}
	
	function end() {
		notifySound.play();
		stopIt();
		if (steps == 4) {
			endAlert = "On respire !";
			longBreakIt();
			steps = 0;
		} else {
			if (step == 1) {
				endAlert = "C'est la pause !";
				shortBreakIt();
			}
			else if (step == 2) {
				endAlert = "On reprend !";
				workIt();
			}
		}
	}
	
	function animate() {
 		$('.load, .unload').css({"animation-duration": (endTimeMinutes*60 + endTimeSeconds) + 's' });
	}
	
	function workIt() {
		notifyMe();
		steps++;
		step = 1;
		stopIt();
		endTimeMinutes = 25;
		endTimeSeconds = 0;
		$('#timer').css({"color": "green"});
		$('.images').css({'background-image': 'url("assets/img/working.jpg")'});
		$('#progressbar').removeClass('load').addClass('unload');
		animate();
		timer = setInterval(function () { workTimer() }, 1000);
	}
	
	function shortBreakIt() {
		notifyMe();
		step = 2;
		stopIt();
		endTimeMinutes = 5;
		endTimeSeconds = 0;
		$('#timer').css({"color": "green"});
		$('.images').css({'background-image': 'url("assets/img/shortbreak.jpg")'});
		$('#progressbar').removeClass('unload').addClass('load');
		animate();
		timer = setInterval(function () { workTimer() }, 1000);
	}
	
	function longBreakIt() {
		notifyMe();
		step = 2;
		stopIt();
		endTimeMinutes = 15;
		endTimeSeconds = 0;
		$('#timer').css({"color": "green"});
		$('#progressbar').removeClass('unload').addClass('load');
		$('.images').css({'background-image': 'url("assets/img/longbreak.jpg")'});
		animate();
		timer = setInterval(function () { workTimer() }, 1000);
	}
	
	function pauseTime() {
		if ((endTimeSeconds >= 1) || (endTimeMinutes >= 1)) {
			if (isRunning == true) {
				stopIt();
				isRunning = false;
				$('#stop').text('Reprendre (espace)');
				$('#timer').css({"color": "black"});
			} else {
				timer = setInterval(function () { workTimer() }, 1000);
				$('#stop').text('Pause (espace)');
				$('#timer').css({"color": "green"});
			}
		}
	}
	
	function pushNew() {
		if ($('.entry').val() !== '') {
			taskList.push($('.entry').val());
		}
		$('#running ul').html('<li>' + taskList.join('</li> <li>') + '</li>' );
		$('#newone').toggle(500);
		$('.entry').val('');
		$('.entry').focus();
	}
	
	function reset() {		
		stopIt();
		endTimeMinutes = 0;
		endTimeSeconds = 0;
		step = 0;
		steps = 0;
		isRunning = false;
		$('#stop').text('Pause (espace)');
		$('#timer').empty();
		endTime =  "Temps restant <br/><br/> " + endTimeMinutes + ' m 0' + endTimeSeconds + ' s';
 		$('#timer').html(endTime);
		$('title').html("Pomodoro timer");
		$('#timer').css({"color": "black"});
		$('.images').css({'background-image': 'url("assets/img/tomatime.jpg")'});
		$('#progressbar').removeClass();
	}
	
	$('#stop').click(pauseTime);
	$('#work, .images').click(workIt);
	$('#shortbreak').click(shortBreakIt);	
	$('#longbreak').click(longBreakIt); 	
	$('#reset').click(reset);
	$('.close').click(function() {
		$('.explain').toggle(500, function() {
			$('.tasks').toggle(500);
			if (taskList.length > 0) {
				$('#running ul').html('<li>' + taskList.join('</li> <li>') + '</li>' );
				$('#running').toggle(500);
			}
		});
	});
	$('#newtask').click(function() {
		$('#newone').toggle(500);
		$('.entry').focus();
	});
	$('#push').click(pushNew);
	$('#history').click(function() {
		if (doneList.length > 0) {
			$('#done').toggle(500);
			$('#done ul').html('<li>' + doneList.join('</li> <li>') + '</li>' );
		};
		if (taskList.length > 0) {
				$('#running').toggle(500);
				$('#history').text(function(i, text){
					return text === "Retour" ? "Tâches terminées" : "Retour";
				})
		};
	});
	
	
 });
