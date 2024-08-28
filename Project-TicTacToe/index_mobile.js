var buttons = ['number1','number2','number3','number4','number5','number6','number7','number8','number9']

var player1_turn = true
var player2_turn = false

var player1_package = []
var player2_package = []

var gameOver = false

const gameOver_sfx = new Audio('gameover.mp3')
const matched_sfx = new Audio('matched.mp3')

var player1_score = 0
var player2_score = 0

function check_win(){
	// Check rows
	for (let i = 0; i < 7; i += 3) {
		if (player1_package.includes(buttons[i]) && player1_package.includes(buttons[i + 1]) && player1_package.includes(buttons[i + 2])) {
			return [buttons[i], buttons[i + 1], buttons[i + 2]]
		} else if (player2_package.includes(buttons[i]) && player2_package.includes(buttons[i + 1]) && player2_package.includes(buttons[i + 2])) {
			return [buttons[i], buttons[i + 1], buttons[i + 2]]
		}
	}

	// Check columns
	for (let i = 0; i < 3; i++) {
		if (player1_package.includes(buttons[i]) && player1_package.includes(buttons[i + 3]) && player1_package.includes(buttons[i + 6])) {
			return [buttons[i], buttons[i + 3], buttons[i + 6]]
		} else if (player2_package.includes(buttons[i]) && player2_package.includes(buttons[i + 3]) && player2_package.includes(buttons[i + 6])) {
			return [buttons[i], buttons[i + 3], buttons[i + 6]]
		}
	}

	// Check diagonals
	if (player1_package.includes(buttons[0]) && player1_package.includes(buttons[4]) && player1_package.includes(buttons[8])) {
		return [buttons[0], buttons[4], buttons[8]]
	} else if (player2_package.includes(buttons[0]) && player2_package.includes(buttons[4]) && player2_package.includes(buttons[8])) {
		return [buttons[0], buttons[4], buttons[8]]
	} else if (player1_package.includes(buttons[2]) && player1_package.includes(buttons[4]) && player1_package.includes(buttons[6])) {
		return [buttons[2], buttons[4], buttons[6]]
	} else if (player2_package.includes(buttons[2]) && player2_package.includes(buttons[4]) && player2_package.includes(buttons[6])) {
		return [buttons[2], buttons[4], buttons[6]]
	}

	// If no one has won, check for a tie
	if (player1_package.length + player2_package.length === buttons.length) {
		return "Tie"
	}

	// If no one has won, return null
	return null;
}

function adjust_scoreTo(value){
	if(value == 1){
		player1_score += 1
		document.getElementById('score'+value).textContent = `P1:${player1_score}`
	}else if(value == 2){
		player2_score += 1
		document.getElementById('score'+value).textContent = `P2:${player2_score}`
	}else if(value == 'Tie'){
		console.log('TIE')
	}
}

function resetGame(){
	for(let i = 0; i<buttons.length; i++){
		var key = document.getElementById(buttons[i])
		key.style.pointerEvents = 'auto'
		document.getElementById(`${buttons[i]}_text`).textContent = ''
	}

	player2_package.length = 0
	player1_package.length = 0
	returnPlayer_turn(1)
	player1_turn = true
	player2_turn = false
	gameOver = false
}

function returnPlayer_turn(player){
	if(player == 1){
		document.getElementById(`score1`).style.textShadow = '0px 0px 10px #c8acd6'
		document.getElementById(`score2`).style.textShadow = '0px 0px 0px #c8acd6'
	}else if(player == 2){
		document.getElementById(`score1`).style.textShadow = '0px 0px 0px #c8acd6'
		document.getElementById(`score2`).style.textShadow = '0px 0px 10px #c8acd6'
	}else if(player == 'reset'){
		document.getElementById(`score1`).style.textShadow = '0px 0px 0px #c8acd6'
		document.getElementById(`score2`).style.textShadow = '0px 0px 0px #c8acd6'
	}
}

function doVisual(typeofvalue){
	if(typeofvalue == 1 || typeofvalue == 2){
		// Score //
		var vs = document.getElementById(`vs_score${typeofvalue}`)
		vs.style.width = '100px'

		returnPlayer_turn('reset')

		setTimeout(()=>{
			adjust_scoreTo(typeofvalue)
		}, 500)
		setTimeout(()=>{
			vs.style.width = '0px'
		}, 900)
	}else if(typeofvalue == 'reset'){
		var gos_box = document.getElementById('gameover_container')

		var vs1 = document.getElementById('Visual1_GOS')
		var vs2 = document.getElementById('Visual2_GOS')
		var vs3 = document.getElementById('Visual3_GOS')
		var vs4 = document.getElementById('Visual4_GOS')
		var vs5 = document.getElementById('Visual5_GOS')
		vs1.style.display = 'flex'

		setTimeout(()=>{
			gos_box.style.width = '300px'
			gos_box.style.rotate = '0deg'

			vs1.style.borderRadius = '0px'
			vs1.style.zIndex = '2'
			vs1.style.rotate = '-360deg'
			vs1.style.opacity = '1.0'

			vs2.style.width = '200px'
			vs2.style.height = '200px'
			vs2.style.rotate = '135deg'
			vs2.style.opacity = '1.0'

			vs3.style.width = '100px'
			vs3.style.zIndex = '1'
			vs3.style.rotate = '-360deg'
			vs3.style.borderRadius = '100em'

			vs4.style.width = '100px'
			vs4.style.height = '100px'
			vs4.style.rotate = '360deg'
			vs4.style.opacity = '1.0'
			vs4.style.zIndex = '1'

			vs5.style.width = '50px'
			vs5.style.height = '50px'
			vs5.style.rotate = '-135deg'
			vs5.style.opacity = '1.0'
			vs5.style.zIndex = '1'
		}, 100)

		setTimeout(()=>{
			resetGame()
		}, 1500)

		setTimeout(()=>{
			gos_box.style.width = '0px'
			gos_box.style.rotate = '-180deg'

			vs1.style.borderRadius = '100em'
			vs1.style.rotate = '0deg'
			vs1.style.opacity = '0.0'

			vs2.style.width = '0px'
			vs2.style.height = '0px'
			vs2.style.rotate = '0deg'
			vs2.style.opacity = '0.0'

			vs3.style.width = '0px'
			vs3.style.borderRadius = '0px'

			vs4.style.width = '0px'
			vs4.style.height = '0px'
			vs4.style.opacity = '0.0'

			vs5.style.width = '0px'
			vs5.style.height = '0px'
			vs5.style.rotate = '-45deg'
			vs5.style.opacity = '0.0'

			setTimeout(()=>{
				vs1.style.display = 'none'
			}, 3000)
		}, 3450)
	}else if(typeof typeofvalue == 'string'){
		if(typeofvalue != 'reset'){
			var vs = document.getElementById(`vs_${typeofvalue}`)
			vs.style.height = '100%'
			setTimeout(()=>{
				vs.style.height = '0%'
				setTimeout(()=>{
				}, 750)
			}, 750)
		}
	}
}

function ticked_key(key_number, key, key_label){
	if(player1_turn){
		player1_turn = false
		player2_turn = true

		doVisual(key_number)
		setTimeout(()=>{
			key_label.textContent = 'O'
		},  450)
		key.style.pointerEvents = 'none'
		player1_package.push(key_number)
	}else if(player2_turn){
		player2_turn = false
		player1_turn = true

		doVisual(key_number)
		setTimeout(()=>{
			key_label.textContent = 'X'
		},  450)
		key.style.pointerEvents = 'none'
		player2_package.push(key_number)
	}

	var result = check_win()

	if(result !== null){
		for(let i = 0; i<buttons.length; i++){
			var key = document.getElementById(buttons[i])
			key.style.pointerEvents = 'none'
		}

		setTimeout(()=>{
			doVisual(Number(result[0].slice(-1)))
			doVisual('reset')
			gameOver = true

		}, 1500)

		setTimeout(()=>{
			// Change the color of the winning buttons to red
			result.forEach(button => {
				var btn = document.getElementById(button)
				btn.style.color = 'red'
				gameOver_sfx.play()
				setTimeout(()=>{
					btn.style.color = '#c8acd6'
				}, 1750)
			})
		}, 750)

		console.log('A player just won!')
	}

	if(!gameOver){
		if(player1_turn){
			returnPlayer_turn(1)
		}else if(player2_turn){
			returnPlayer_turn(2)
		}
	}
}

returnPlayer_turn(1)	

for(let i = 0; i<buttons.length; i++){
	const key = document.getElementById(buttons[i])

	key.addEventListener('click', function(){
		matched_sfx.play()
		ticked_key(buttons[i], key, document.getElementById(`${buttons[i]}_text`))
	})
}
