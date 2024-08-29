// Snake game //

const canvas = document.getElementById('canvas')

const game_w = canvas.width;
const game_h = canvas.height;
var space_size = 10
var speed = 7
var Color_Snake = "#00FF00"
var score = 0
const Version_apple = [{Buff:true, Size:space_size, Color:"transparent"}, {Buff:false, Size:space_size, Color:"transparent"}]

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
		this.x = Math.floor(Math.random() * game_w/space_size) * space_size
		this.y = Math.floor(Math.random() * game_h/space_size) * space_size
		while(true){
			isTouching = false
				
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
		console.log(this.x)
	}

	createDiv(){
		this.div = document.createElement('div')
		this.div.style.backgroundColor = 'grey'
		this.div.style.position = 'absolute'
		this.div.style.width = `${this.size}px`
		this.div.style.height = `${this.size}px`
		this.div.style.opacity = '0.0'
		this.div.style.backgroundColor = this.color
		this.div.style.transition = 'all 1s'
		this.div.style.rotate = `${360*2}deg`
		this.div.style.borderRadius = '50px'

		this.div.style.left = `${this.x}px`
		this.div.style.top = `${this.y}px`

		if(this.Buff){
			this.div.style.backgroundColor = 'red'
		}else{
			this.div.style.backgroundColor = 'lawngreen'
		}

		setTimeout(()=>{
			this.div.style.opacity = '1.0'
			this.div.style.transform = 'scale(2)'
		}, 15)

		setTimeout(()=>{
			this.div.style.transform = 'scale(1)'
			this.div.style.rotate = '0deg'
			this.div.style.borderRadius = '0px'
		}, 500)

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

var snake = new Snake(0, 0, space_size)
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
	if(GAME_START && !game_over){
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
		gameOverSound.play()
		GOS()
	}else if(head.x == game_w){
		game_over = true
		gameOverSound.play()
		GOS()
	}else if(head.y == -snake.size){
		game_over = true
		gameOverSound.play()
		GOS()
	}else if(head.y == game_h){
		game_over = true
		gameOverSound.play()
		GOS()
	}
}
function GOS(){
	var gos_box = document.getElementById('gameover_container')

	var vs1 = document.getElementById('Visual1_GOS')
	var vs2 = document.getElementById('Visual2_GOS')
	var vs3 = document.getElementById('Visual3_GOS')
	var vs4 = document.getElementById('Visual4_GOS')
	var vs5 = document.getElementById('Visual5_GOS')
	var vs6 = document.getElementById('Visual6_GOS')
	var replay_btn = document.getElementById('replay')

	setTimeout(()=>{
		gos_box.style.width = '300px'
		gos_box.style.rotate = '0deg'

		vs1.style.borderRadius = '0px'
		vs1.style.zIndex = '5'
		vs1.style.rotate = '-360deg'
		vs1.style.opacity = '1.0'

		vs2.style.width = '200px'
		vs2.style.height = '200px'
		vs2.style.rotate = '135deg'
		vs2.style.opacity = '0.5'

		vs3.style.width = '500px'
		vs3.style.height = '50px'
		vs3.style.rotate = '-360deg'
		vs3.style.borderRadius = '100em'
		vs3.style.opacity = '1.0'

		vs6.style.width = '50px'
		vs6.style.height = '500px'
		vs6.style.rotate = '-360deg'
		vs6.style.borderRadius = '100em'
		vs6.style.opacity = '1.0'

		vs4.style.width = '75px'
		vs4.style.height = '75px'
		vs4.style.rotate = '360deg'
		vs4.style.borderRadius = '50px'
		vs4.style.opacity = '1.0'

		vs5.style.width = '50px'
		vs5.style.height = '50px'
		vs5.style.rotate = '-135deg'
		vs5.style.opacity = '1.0'

		replay_btn.style.top = '250px'
		replay_btn.style.opacity = '1.0'
		replay_btn.style.pointerEvents = 'auto'
	}, 100)
}
function eatApple(){
	if (snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y) {
		adjust_score(apple.Buff)
		apple.removeDiv()
		snake.tail[snake.tail.length] = {x:apple.x, y:apple.y}

		apple = new Apple()
		apple.createDiv()
		speed += 5

		foodSound.play()
	}else if (snake.tail[snake.tail.length - 1].x == apple2.x && snake.tail[snake.tail.length - 1].y == apple2.y) {
		adjust_score(apple2.Buff)
		apple2.removeDiv()
		snake.tail[snake.tail.length] = {x:apple2.x, y:apple2.y}

		apple2 = new Apple()
		apple2.createDiv()
		speed += 5

		foodSound.play()
	}
}
function adjust_score(buff){
	var score_board = document.getElementById('score')
	var score_vs = document.getElementById('score_vs')
	var score_adjust = document.getElementById('adjust_value')

	if(buff){
		score_adjust.textContent = '+2'
		score+=2
	}else{
		score_adjust.textContent = '+1'
		score+=1
	}

	score_vs.style.width = '50px'
	score_vs.style.borderRadius = '50px'
	score_vs.style.rotate = '360deg'

	setTimeout(()=>{
		score_board.textContent = score
	},500)

	setTimeout(()=>{
		score_vs.style.width = '0px'
		score_vs.style.borderRadius = '0px'
		score_vs.style.rotate = '0deg'
	},1100)
}
function draw(){
	for(var i=0; i<snake.tail.length; i++){
		console.log('create snakes')
		createRect(snake.tail[i].x + 0.5, snake.tail[i].y + 0.5, snake.size - 1, snake.size - 1, snake.color)
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

var arrows = ['up', 'down', 'left', 'right']

for(let b = 0; b<arrows.length; b++){
	const btn = document.getElementById(`arrow_${arrows[b]}`)

	btn.addEventListener('click', function(){
		setTimeout(()=>{
			if(!game_over){
				if(arrows[b] == 'up' && snake.rotateY != 1){
					snake.rotateX = 0
					snake.rotateY = -1
					moveSound.play()
				}else if(arrows[b] == 'down' && snake.rotateY != -1){
					snake.rotateX = 0
					snake.rotateY = 1
					moveSound.play()
				}else if(arrows[b] == 'left' && snake.rotateX != 1){
					snake.rotateX = -1
					snake.rotateY = 0
					moveSound.play()
				}else if(arrows[b] == 'right' && snake.rotateX != -1){
					snake.rotateX = 1
					snake.rotateY = 0
					moveSound.play()
				}
			}	
		}, 1)
	})
}

window.addEventListener('keydown', (event) => {
	//console.log(event.keyCode) 
  	setTimeout(() => {
  		if(!game_over){
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
  		}
		    
  	}, 1)
})

document.getElementById('replay').addEventListener('click', function(){
	location.reload()
	console.log('reload')
})