var endTimeMinutes = 0;
var endTimeSeconds = 0;
var timer;

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
 			stopIt();
 		} 		
 	};
 	
 	function stopIt() {
		clearInterval(timer);
	}
	
	function workIt() {
		stopIt();
		endTimeMinutes = 25;
		endTimeSeconds = 0;
		timer = setInterval(function () { workTimer() }, 1000);
	}
	
	function shortBreakIt() {
		stopIt();
		endTimeMinutes = 5;
		endTimeSeconds = 0;
		timer = setInterval(function () { workTimer() }, 1000);	
	}
	
	function longBreakIt() {
		stopIt();
		endTimeMinutes = 10;
		endTimeSeconds = 0;
		timer = setInterval(function () { workTimer() }, 1000);	
	}
	
	$('#stop').click(stopIt);
	$('#work').click(workIt);
	$('#shortbreak').click(shortBreakIt);	
	$('#longbreak').click(longBreakIt); 	
 });