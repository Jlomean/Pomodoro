var endTimeMinutes;
var endTimeSeconds;
var timer;
var endAlert;
var step = 0;
var steps = 0;
var isRunning = false;

$('document').ready(function () {
	
 	setInterval(function () {
 		var d = new Date();
		var date = d.toLocaleDateString();
 		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
 		$('#day').empty();
 		$('#day').append(date, '.');
 		$('#hour').empty();
 		$('#hour').append(h, ' h ', m, ' m ', s, ' s.');
 	},1000);
 	
 	function workTimer () {
 		isRunning = true;
 		if (endTimeSeconds < 10) {
 			var endTime = endTimeMinutes + ' m 0' + endTimeSeconds + ' s';
 		} else {
 			var endTime = endTimeMinutes + ' m ' + endTimeSeconds + ' s';
 		} 		
 		$('#timer').empty();
 		endTimeSeconds--;
 		if (endTimeSeconds < 0) {
 			endTimeMinutes--;
 			endTimeSeconds += 60;
 		}
 		$('#timer').append(endTime);
 		if (endTimeMinutes < 0) {
 			end();
			alert(endAlert);
 		} 		
 	};
 	
 	function stopIt() {
		clearInterval(timer);
	}
	
	function end() {
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
	
	function workIt() {
		steps++;
		step = 1;
		stopIt();
		endTimeMinutes = 25;
		endTimeSeconds = 0;
		timer = setInterval(function () { workTimer() }, 1000);
	}
	
	function shortBreakIt() {
		step = 2;
		stopIt();
		endTimeMinutes = 5;
		endTimeSeconds = 0;
		timer = setInterval(function () { workTimer() }, 1000);
	}
	
	function longBreakIt() {
		step = 2;
		stopIt();
		endTimeMinutes = 15;
		endTimeSeconds = 0;
		timer = setInterval(function () { workTimer() }, 1000);
	}
	
	function pauseTime() {
		if ((endTimeSeconds >= 1) || (endTimeMinutes >= 1)) {
			if (isRunning == true) {
				stopIt();
				isRunning = false;
				$('#stop').text('Reprendre');
			} else {
				timer = setInterval(function () { workTimer() }, 1000);
				$('#stop').text('Mettre en pause');
			}
		}
	}
	
	function reset() {		
		stopIt();
		endTimeMinutes = 0;
		endTimeSeconds = 0;
		step = 0;
		steps = 0;
		isRunning = false;
		$('#stop').text('Mettre en pause');
		$('#timer').empty();
		endTime = endTimeMinutes + ' m 0' + endTimeSeconds + ' s';
 		$('#timer').append(endTime);
	}
	
	$('#stop').click(pauseTime);
	$('#work').click(workIt);
	$('#shortbreak').click(shortBreakIt);	
	$('#longbreak').click(longBreakIt); 	
	$('#reset').click(reset);
	
 });
