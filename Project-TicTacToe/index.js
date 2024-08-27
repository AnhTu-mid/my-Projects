// GAME ACTIVE //

const b1 = document.getElementById('Choosen1')
const b2 = document.getElementById('Choosen2')
const b3 = document.getElementById('Choosen3')
const b4 = document.getElementById('Choosen4')
const b5 = document.getElementById('Choosen5')
const b6 = document.getElementById('Choosen6')
const b7 = document.getElementById('Choosen7')
const b8 = document.getElementById('Choosen8')
const b9 = document.getElementById('Choosen9')

const score_1 = document.getElementById('SCORE_P1')
const turn_1 = document.getElementById('TURN_P1')

const score_2 = document.getElementById('SCORE_P2')
const turn_2 = document.getElementById('TURN_P2')

const b1_s = document.getElementById('Choosen_lab1')
const b2_s = document.getElementById('Choosen_lab2')
const b3_s = document.getElementById('Choosen_lab3')
const b4_s = document.getElementById('Choosen_lab4')
const b5_s = document.getElementById('Choosen_lab5')
const b6_s = document.getElementById('Choosen_lab6')
const b7_s = document.getElementById('Choosen_lab7')
const b8_s = document.getElementById('Choosen_lab8')
const b9_s = document.getElementById('Choosen_lab9')

var ticked_1 = false
var ticked_2 = false
var ticked_3 = false
var ticked_4 = false
var ticked_5 = false
var ticked_6 = false
var ticked_7 = false
var ticked_8 = false
var ticked_9 = false

var matched_sound = new Audio("matched.mp3")
var game_over_sound = new Audio("gameover.mp3")

var player_turn1 = false // O
var player_turn2 = true // x
var gameOver = false
var p1_pack = []
var p2_pack = []
var p1_score = 0
var p2_score = 0

nextTurn_visual(1, 2)

function check(obj, player1, player2) {
    if (player_turn1) {
        p1_pack.push(obj + "_o")
        nextTurn_visual(2, 1)
    } else if(player_turn2){
        p2_pack.push(obj + "_x")
        nextTurn_visual(1, 2)
    }

    doVisual_checked(obj, player1, player2)

    const winningCombinations = [
        ['1_o', '2_o', '3_o'], ['4_o', '5_o', '6_o'], ['7_o', '8_o', '9_o'],
        ['1_o', '4_o', '7_o'], ['2_o', '5_o', '8_o'], ['3_o', '6_o', '9_o'],
        ['1_o', '5_o', '9_o'], ['3_o', '5_o', '7_o']
    ];

    let isWinner = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        if (p1_pack.includes(winningCombinations[i][0]) && p1_pack.includes(winningCombinations[i][1]) && p1_pack.includes(winningCombinations[i][2])) {
            gameOver = true
            console.log('Player 1 wins!')
            p1_score += 1
            score_visual(score_1, 1, p1_score)
            game_over_sound.play()
            setTimeout(()=>{
            	resetGame()
            }, 1000)
            isWinner = true;
            break
        } else if (p2_pack.includes(winningCombinations[i][0].replace('_o', '_x')) && p2_pack.includes(winningCombinations[i][1].replace('_o', '_x')) && p2_pack.includes(winningCombinations[i][2].replace('_o', '_x'))) {
            gameOver = true
            console.log('Player 2 wins!')
            p2_score += 1
            score_visual(score_2, 2, p2_score)
            game_over_sound.play()
            setTimeout(()=>{
            	resetGame()
            }, 1000)
            isWinner = true;
            break
        }
    }

    if (!isWinner && (p1_pack.length + p2_pack.length) === 9) {
        game_over_sound.play()
        setTimeout(()=>{
			resetGame()
		}, 1000)
    }
}

function nextTurn_visual(player_first, player_last){
	const turn_f = document.getElementById('Turn' + player_first)

	turn_f.style.backgroundColor = "#433D8B"
	turn_f.style.borderBottomLeftRadius = "50%"

	const turn_l = document.getElementById('Turn' + player_last)

	turn_l.style.backgroundColor = "transparent"
	turn_l.style.borderBottomLeftRadius = "0px"

}

function score_visual(label, player, score){
	setTimeout(()=>{
		var visual = document.getElementById('Score_Visual' + player)
		var visual2 = document.getElementById('Score_Visual' + player + "_OL")

		visual.style.opacity = "1.0"
		visual.style.rotate = "45deg"

		visual2.style.opacity = "1.0"
		visual2.style.rotate = "0deg"

		setTimeout(()=>{
			label.textContent = score
		}, 1000)

		setTimeout(()=>{
			visual.style.opacity = "0.0"
			visual.style.rotate = "360deg"
			visual2.style.opacity = "0.0"
			visual2.style.rotate = "-360deg"
		}, 1500)
	}, 500)
}

function doVisual_checked(obj, player1, player2){
	const visual = document.getElementById('Visual_ch' + obj)

	visual.style.height = "160px"
	setTimeout(()=>{
		visual.style.height = "0px"
	}, 500)

	matched_sound.play()
	document.getElementById('Choosen' + obj).style.pointerEvents = "none"

	setTimeout(()=>{
		if(player1 && !player2){
			document.getElementById('Choosen_lab' + obj).textContent = "O"
		}else{
			document.getElementById('Choosen_lab' + obj).textContent = "X"
		}
	}, 250)
}

function ticked(bool, obj){
	if(!gameOver){
		if (bool == ticked_1 && obj == "1"){ // 1
			if(!ticked_1 && !bool){
				ticked_1 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}else if (bool == ticked_2 && obj == "2"){ // 2
			if(!ticked_2 && !bool){
				ticked_2 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}else if (bool == ticked_3 && obj == "3"){ // 3
			if(!ticked_3 && !bool){
				ticked_3 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}else if (bool == ticked_4 && obj == "4"){ // 4
			if(!ticked_4 && !bool){
				ticked_4 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}else if (bool == ticked_5 && obj == "5"){ // 5
			if(!ticked_5 && !bool){
				ticked_5 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}else if (bool == ticked_6 && obj == "6"){ // 6
			if(!ticked_6 && !bool){
				ticked_6 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}else if (bool == ticked_7 && obj == "7"){ // 7
			if(!ticked_7 && !bool){
				ticked_7 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}else if (bool == ticked_8 && obj == "8"){ // 8
			if(!ticked_8 && !bool){
				ticked_8 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}else if (bool == ticked_9 && obj == "9"){ // 9
			if(!ticked_9 && !bool){
				ticked_9 = true
				if(player_turn1 || !player_turn2){
					player_turn1 = false
					player_turn2 = true
				}else if(player_turn2 || !player_turn1){
					player_turn2 = false
					player_turn1 = true
				}
			}
		}
		check(obj, player_turn1, player_turn2)
	}
}

function resetGame() {
	nextTurn_visual(1, 2)
	document.getElementById('GameOverContainer').style.zIndex = "5"
	document.getElementById('GAMEOVER').style.left = "0%"
    setTimeout(()=>{
    	player_turn1 = false
    	player_turn2 = true
    	gameOver = false

    	p1_pack = []
    	p2_pack = []

    	b1.style.pointerEvents = "auto"

		b2.style.pointerEvents = "auto"

		b3.style.pointerEvents = "auto"

		b4.style.pointerEvents = "auto"
		
		b5.style.pointerEvents = "auto"

		b6.style.pointerEvents = "auto"
		
		b7.style.pointerEvents = "auto"

		b8.style.pointerEvents = "auto"

		b9.style.pointerEvents = "auto"

    	b1_s.textContent = ""
    	b2_s.textContent = ""
    	b3_s.textContent = ""
    	b4_s.textContent = ""
    	b5_s.textContent = ""
    	b6_s.textContent = ""
    	b7_s.textContent = ""
    	b8_s.textContent = ""
    	b9_s.textContent = ""

    	ticked_1 = false
		ticked_2 = false
		ticked_3 = false
		ticked_4 = false
		ticked_5 = false
		ticked_6 = false
		ticked_7 = false
		ticked_8 = false
		ticked_9 = false

    	document.getElementById('GameOverContainer').style.zIndex = "5"
		document.getElementById('GAMEOVER').style.left = "-100%"
		setTimeout(()=>{
			document.getElementById('GameOverContainer').style.transition = "none"
			document.getElementById('GameOverContainer').style.zIndex = "-1"
			document.getElementById('GAMEOVER').style.left = "100%"
		}, 1000)
	}, 2000);
}

b1.addEventListener("click", () => { ticked(ticked_1, "1") })
b2.addEventListener("click", () => { ticked(ticked_2, "2") })
b3.addEventListener("click", () => { ticked(ticked_3, "3") })
b4.addEventListener("click", () => { ticked(ticked_4, "4") })
b5.addEventListener("click", () => { ticked(ticked_5, "5") })
b6.addEventListener("click", () => { ticked(ticked_6, "6") })
b7.addEventListener("click", () => { ticked(ticked_7, "7") })
b8.addEventListener("click", () => { ticked(ticked_8, "8") })
b9.addEventListener("click", () => { ticked(ticked_9, "9") })
