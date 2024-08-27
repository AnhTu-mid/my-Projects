// Snake game //

const canvas = document.getElementById('game_board')

const Visual1 = document.getElementById('Visual1')
const Visual2 = document.getElementById('Visual2')
const Visual3 = document.getElementById('Visual3')

const Visual1_bg = document.getElementById('Visual1_bg')
const Visual2_bg = document.getElementById('Visual2_bg')
const Visual3_bg = document.getElementById('Visual3_bg')
const Score_Adjust = document.getElementById('Score_Adjust')

const score_board = document.getElementById('score')
const game_w = canvas.width;
const game_h = canvas.height;
var space_size = 20
var speed = 7
var Color_Snake = "#00FF00"
var score = 0
var Spin_Bg = false
const Version_apple = [{Buff:true, Size:20, Color:"transparent"}, {Buff:false, Size:20, Color:"transparent"}]

const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
moveSound.volume = 0.5

class Snake{
	constructor(x, y, size){
		this.x = x
		this.y = y
		this.size = size
		this.tail = [{x:this.x, y:this.y}, {x:this.x + this.size, y:this.y + this.size}]
		this.rotateX = 0
		this.rotateY = 1
		this.color = Color_Snake
	}

	move(){
		var newRect
		if(this.rotateX == 1){ //Right?
			newRect = {
				x:this.tail[this.tail.length - 1].x + this.size,
				y:this.tail[this.tail.length - 1].y
			}

		}else if(this.rotateX == -1){ //Left?
			newRect = {
				x:this.tail[this.tail.length - 1].x - this.size,
				y:this.tail[this.tail.length - 1].y
			}
		}else if(this.rotateY == 1){ //Up?
			newRect = {
				x:this.tail[this.tail.length - 1].x,
				y:this.tail[this.tail.length - 1].y + this.size
			}

		}else if(this.rotateY == -1){ //Down?
			newRect = {
				x:this.tail[this.tail.length - 1].x,
				y:this.tail[this.tail.length - 1].y - this.size
			}
		}

		this.tail.shift()
		this.tail.push(newRect)
	}
}

class Apple{
	constructor(){
		var isTouching
		while(true){
			isTouching = false
			this.x = Math.floor(Math.random() * game_w/snake.size) * snake.size
			this.y = Math.floor(Math.random() * game_h/snake.size) * snake.size
			
			for(var i = 0; i<snake.tail.length; i++){
				if(this.x== snake.tail[i].x && this.y == snake.tail[i].y){
					isTouching = true
				}
			}
			if (!isTouching) {
				break
			}
		}

		const random = Math.random() < 0.5? 1 : 0
		this.color = Version_apple[random].Color
		this.size = Version_apple[random].Size
		this.Buff = Version_apple[random].Buff
		console.log(Version_apple[random])
	}

	doSpawnVisual(){
		var visual = document.createElement('div')
		visual.style.position = 'absolute'
		visual.style.width = `0px`
		visual.style.height = `0px`
		visual.style.backgroundColor = '#004cff'
		visual.style.left = `${this.div.style.left}px`
		visual.style.top = `${this.div.style.top}px`
		visual.style.rotate = '360deg'
		visual.style.transition = 'all 1.5s'

		setTimeout(()=>{
			visual.style.rotate = '0deg'
			visual.style.width = `${this.size + 10}px`
			visual.style.height = `${this.size + 10}px`
		}, 20)

		setTimeout(()=>{
			visual.style.width = `${this.size - 10}px`
			visual.style.height = `${this.size - 10}px`
			visual.style.rotate = '-360deg'
			visual.style.outline = '3px solid #04D9FF'
			visual.style.backgroundColor = "#00D7FF"
			visual.style.outlineOffset = '10px'
			visual.style.opacity = '0.25'
		}, 1000+20)

		setTimeout(()=>{
			visual.style.opacity = '0.0'
			visual.style.rotate = `${-360 -360}deg`
		}, 1500 + (1000 - 20))

		setTimeout(()=>{
			visual.remove()
		}, (1500 + (1000+20)) * 2)

		this.div.appendChild(visual)
	}

	createDiv(){
		this.div = document.createElement('div')
		this.div.style.position = 'absolute'
		this.div.style.width = `${this.size}px`
		this.div.style.height = `${this.size}px`
		this.div.style.opacity = '0.0'
		this.div.style.backgroundColor = this.color
		this.div.style.transition = 'all 0.5s'
		this.div.style.display = 'flex'
		this.div.style.justifyContent = 'center'
		this.div.style.alignItems = 'center'

		this.div.style.left = `${this.x}px`
		this.div.style.top = `${this.y}px`

		if(this.Buff){
			this.div.textContent = '🍎'
		}else{
			this.div.textContent = '🍏'
		}

		setTimeout(()=>{
			this.div.style.opacity = '1.0'
			this.doSpawnVisual()
		}, 15)

		document.getElementById('game_main').appendChild(this.div)
	}

	removeDiv(){
		this.div.style.opacity = '0.0'
		this.div.style.transform = 'scale(2 2)'
		setTimeout(()=>{
			this.div.remove()
		},750)
	}
}

var snake = new Snake(20, 20, space_size)
var apple = new Apple()
var apple2 = new Apple()
apple.createDiv()
apple2.createDiv()
var ctx = canvas.getContext('2d')
var game_over = false

var GAME_START = false

const playbtn = document.getElementById('playbutton')
playbtn.addEventListener('click', function(){
	const mainmenu_con = document.getElementById('MainMenu_container')
	const tutor = document.getElementById('tutorial')

	setTimeout(()=>{
		tutor.style.display = 'none'
		mainmenu_con.style.opacity = '0.0'

		GAME_START = true
	}, 1000)

	mainmenu_con.style.width = '0px'
	mainmenu_con.style.rotate = '90deg'
})

window.onload = ()=>{
	setInterval(show, 1000/speed)
}
function show(){
	if(GAME_START){
		update()
		draw()
	}
}
function update(){
	ctx.clearRect(0,0, game_w, game_h)
	// console.log('Updated')
	if (!game_over) {
		snake.move()
		eatApple()
		checkHitWall()
	}
}
function checkHitWall(){
	var head = snake.tail[snake.tail.length - 1]
	if(head.x == -snake.size){
		game_over = true
		GOS()
		gameOverSound.play()
	}else if(head.x == game_w){
		game_over = true
		GOS()
		gameOverSound.play()
	}else if(head.y == -snake.size){
		game_over = true
		GOS()
		gameOverSound.play()
	}else if(head.y == game_h){
		game_over = true
		GOS()
		gameOverSound.play()
	}
}
function GOS(){
	//mf this is so time-consuming

	const replay = document.getElementById('replay')
	const goback = document.getElementById('return')
	const GOS_Con = document.getElementById('Game_Over_Container')
	const GOS_V1 = document.getElementById('Visual1_GOS')
	const GOS_V2 = document.getElementById('Visual2_GOS')
	const GOS_V3 = document.getElementById('Visual3_GOS')
	const GOS_Text = document.getElementById('Text_GOS')
	const GOS_V1T = document.getElementById('Visual1_GOS_Text')
	const GOS_V2T = document.getElementById('Visual2_GOS_Text')

	replay.style.opacity = '0.5'
	replay.style.pointerEvents = 'auto'
	replay.cursor = 'pointer'
	replay.style.top = '350px'
	replay.style.zIndex = '15'

	goback.style.pointerEvents = 'auto'
	goback.cursor = 'pointer'
	goback.style.right = '-129px'
	goback.style.width = 'auto'
	setTimeout(()=>{
		goback.style.opacity = '1.0'
	}, 1500)

	GOS_Con.style.opacity = "1.0"
	GOS_Con.style.width = "500px"
	GOS_Con.style.height = "500px"

	GOS_V1.style.width = "100%"
	GOS_V1.style.height = "15%"
	GOS_V1.style.opacity = "0.5"

	GOS_V2.style.outline = "5px solid #FF204E"
	GOS_V2.style.outlineOffset = "25px"
	GOS_V2.style.width = "200px"
	GOS_V2.style.height = "200px"
	GOS_V2.style.rotate = "45deg"

	GOS_V3.style.width = "400px"
	GOS_V3.style.height = "400px"
	GOS_V3.style.outline = "5px solid #A0153E"
	GOS_V3.style.outlineOffset = "15px"
	GOS_V3.style.rotate = "0deg"

	GOS_Text.style.opacity = "1.0"
	GOS_Text.style.letterSpacing = "10px"
	GOS_Text.style.fontSize = "3rem"

	GOS_V1T.style.width = "80%"
	GOS_V1T.style.height = "10%"

	GOS_V2T.style.width = "150px"
	GOS_V2T.style.height = "150px"

	GOS_V2T.style.outline = "5px solid #FF204E"
	GOS_V2T.style.outlineOffset = "110px"

	Score_Adjust.textContent = score

	setTimeout(()=>{
		Visual1.style.zIndex = "6"
		Visual2.style.zIndex = "6"
		Visual3.style.zIndex = "6"
		Visual3.style.transition = "all 1s"
		Visual1.style.width = "100%"
		Visual2.style.width = "75px"
		Visual2.style.height = "75px"
		Visual2.style.transform = "rotate(-135deg)"
		Visual3.style.outline = "5px solid darkgreen"
		Visual3.style.outlineOffset = "35px"
		Visual3.style.transform = "rotate(0deg)"
		Visual3.style.opacity = "1.0"
	}, 1)
}
function Adjust_score(){
	if(apple.Buff || apple2.Buff){
		score += 2
		Score_Adjust.textContent = "+2"
	}else{
		score += 1
		Score_Adjust.textContent = "+1"
	}
}
function eatApple(){
	if (snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y) {
		Adjust_score()
		apple.removeDiv()
		snake.tail[snake.tail.length] = {x:apple.x, y:apple.y}

		apple = new Apple()
		apple.createDiv()
		speed += 5

		foodSound.play()

		DoVisual()
		DoVisual_Bg()
	}else if (snake.tail[snake.tail.length - 1].x == apple2.x && snake.tail[snake.tail.length - 1].y == apple2.y) {
		Adjust_score()
		apple2.removeDiv()
		snake.tail[snake.tail.length] = {x:apple2.x, y:apple2.y}

		apple2 = new Apple()
		apple2.createDiv()
		speed += 5

		foodSound.play()

		DoVisual()
		DoVisual_Bg()
	}

	console.log('Current speed: ' + speed)
}
function DoVisual_Bg(){
	if (!Spin_Bg) {
		Spin_Bg = true
		Visual1_bg.style.rotate = "-135deg"
		Visual2_bg.style.rotate = "90deg"
		Visual3_bg.style.rotate = "-225deg"
	}else{
		Spin_Bg = false
		Visual1_bg.style.rotate = "45deg"
		Visual2_bg.style.rotate = "-135deg"
		Visual3_bg.style.rotate = "0deg"
	}
}
function DoVisual(){
	
	Visual1.style.width = "100%"
	Visual2.style.width = "75px"
	Visual2.style.height = "75px"
	Visual2.style.transform = "rotate(-135deg)"
	Visual3.style.outline = "5px solid darkgreen"
	Visual3.style.outlineOffset = "35px"
	Visual3.style.transform = "rotate(0deg)"
	Visual3.style.opacity = "1.0"

	
	setTimeout(()=>{
		if(!game_over){
			score_board.textContent = score
			Visual1.style.width = "0%"
			Visual2.style.transform = "rotate(360deg)"
			Visual2.style.width = "0px"
			Visual2.style.height = "0px"
			Visual3.style.outline = "0px solid darkgreen"
			Visual3.style.outlineOffset = "0px"
			Visual3.style.transform = "rotate(-360deg)"
			Visual3.style.opacity = "0.0"
		}
	},1200)
}
function draw(){
	//Create snake?
	for(var i=0; i<snake.tail.length; i++){
		createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, snake.color)
	}
}
function createRect(x, y, width, height, color, stroke, Buff){
	ctx.beginPath()

	if(Buff){
		ctx.fillStyle = color
		ctx.fillRect(x - 2.5, y - 2.5, width, height)
	}else{
		ctx.fillStyle = color
		ctx.fillRect(x, y, width, height)
	}

	if(stroke){
		ctx.strokeStyle = stroke
		ctx.lineWidth = 1.5
		if(Buff){
			ctx.strokeRect(x - 2.5,y - 2.5,width,height)
		}else{
			ctx.strokeRect(x,y,width,height)
		}
	}
}
window.addEventListener('keydown', (event) => {
	//console.log(event.keyCode) 
  	setTimeout(() => {
	    if ((event.keyCode == 65 || event.keyCode == 37) && snake.rotateX != 1) {
	    	//console.log(event.keyCode + "RotateX to -1 | Left")
	    	snake.rotateX = -1
	      	snake.rotateY = 0
	      	moveSound.play()
	    } else if ((event.keyCode == 87 || event.keyCode == 38) && snake.rotateY != 1) {
	    	//console.log(event.keyCode + "RotateY to -1 | Up")
	      	snake.rotateX = 0
	      	snake.rotateY = -1
	      	moveSound.play()
	    } else if ((event.keyCode == 68 || event.keyCode == 39) && snake.rotateX != -1) {
	    	//console.log(event.keyCode + "RotateX to 1 | Right")
	      	snake.rotateX = 1
	      	snake.rotateY = 0
	      	moveSound.play()
	    } else if ((event.keyCode == 83 || event.keyCode == 40) && snake.rotateY != -1) {
	    	//console.log(event.keyCode + "RotateY to 1 | Down")
	      	snake.rotateX = 0
	      	snake.rotateY = 1
	      	moveSound.play()
	    }
  	}, 1)
})
