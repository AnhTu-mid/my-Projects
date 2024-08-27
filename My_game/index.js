// game //
class BOMB{
	constructor(size, y, x){
		this.size = size
		this.y = y - size
		this.movable = true
		this.x = Math.floor(Math.random() * game_w/size) * size
		this.speed = Math.random() < 0.5 ? 25 : 50; // 50% chance of fast speed, 50% chance of normal speed

		this.coordinate = [{x:this.x,y:this.y}]
	}

	move(){
		this.y += this.speed
		var newRect = {x:this.x,y:this.y}
		this.coordinate.push(newRect)
		this.coordinate.shift()
	}
	checkTouched(REAL_game_h){
		for(let i = 0; i<this.coordinate.length; i++){
			if(this.coordinate[i].y >= REAL_game_h){
				return true
			}
		}
		return false
	}
}
class PLAYER{
	constructor(head_c, colors, size, x, y, face){
		let randomcolor = Math.floor(Math.random() * colors.length)
		this.color_body = colors[randomcolor].color
		this.color_head = head_c
		this.size = size
		this.x = x
		this.y = y
		this.y_head = y - size

		this.coordinate = [{x:x, y:y}]
		this.coordinate_head = [{x:x, y:this.y_head}]

		this.player_body = createDiv(this.coordinate[0].x, this.coordinate[0].y - size, size, size, this.color_body, {zindex: 1.5, time:0.25})
		this.player_head = createDiv(this.coordinate_head[0].x, this.coordinate_head[0].y - size, size, size, this.color_head, {zindex: 1.5, time:0.25, face:face})
	}

	checkLeft(){
		for(let i = 0; i<this.coordinate.length; i++){
			if(this.coordinate[i].x <= 25 - 25){
				return true
			}
		}

		return false
	}

	checkRight(){
		for(let i = 0; i<this.coordinate.length; i++){
			if(this.coordinate[i].x >= game_w - 25){
				return true
			}
		}

		return false
	}

	move(direction){
		if(direction == 'left' && !this.checkLeft()){
			this.x -= this.size
			var newRect = {x:this.x, y:this.y}
			this.coordinate.push(newRect)
			this.coordinate_head.push({x:this.x, y:this.y_head})
			this.coordinate.shift()
			this.coordinate_head.shift()

			for(let i = 0; i<this.coordinate.length; i++){
				this.player_body.style.left = `${this.coordinate[i].x}px`
				this.player_body.style.top = `${this.coordinate[i].y}px`
			}
			for(let i = 0; i<this.coordinate_head.length; i++){
				this.player_head.style.left = `${this.coordinate_head[i].x}px`
				this.player_head.style.top = `${this.coordinate_head[i].y}px`
			}
		}else if(direction == 'right' && !this.checkRight()){
			this.x += this.size
			var newRect = {x:this.x, y:this.y}
			this.coordinate.push(newRect)
			this.coordinate_head.push({x:this.x, y:this.y_head})
			this.coordinate.shift()
			this.coordinate_head.shift()

			for(let i = 0; i<this.coordinate.length; i++){
				this.player_body.style.left = `${this.coordinate[i].x}px`
				this.player_body.style.top = `${this.coordinate[i].y}px`
			}
			for(let i = 0; i<this.coordinate_head.length; i++){
				this.player_head.style.left = `${this.coordinate_head[i].x}px`
				this.player_head.style.top = `${this.coordinate_head[i].y}px`
			}
		}
	}
}
class EXPLOSION{
	constructor(div_ex_size, x, y, time, c, eAng, transparent, cir, outline, shadow){
		this.div_ex = document.createElement('div')
		this.time = time
		this.coordinate = [{x:x + 0.5, y:y + 0.5}]

	  	this.div_ex.style.backgroundColor = c
	  	this.div_ex.style.width = div_ex_size + 'px'
	  	this.div_ex.style.height = div_ex_size + 'px'
	  	this.div_ex.style.position = 'absolute'
	  	this.div_ex.style.top = (y - div_ex_size/2) + 'px'
	  	this.div_ex.style.left = (x - div_ex_size/2) + 'px'
	  	this.div_ex.style.transition = 'all ' + time + 's'
	  	this.div_ex.style.opacity = transparent

	  	this.div_ex.style.zIndex = '3'

	  	if(cir){
	  		this.div_ex.style.borderRadius = cir + 'px'
	  	}
	  	if(outline){
	  		this.div_ex.style.outline = outline.width + 'px solid ' + outline.color
	  		this.div_ex.style.outlineOffset = outline.offset + 'px'
	  	}
	  	if(shadow){
	  		this.div_ex.style.boxShadow = `0px 0px 0px 0px white`
	  	}

	  	setTimeout(()=>{
	  		this.div_ex.style.rotate = eAng + 'deg'
	  		this.div_ex.style.opacity = '0.5'
	  		this.div_ex.style.width = div_ex_size + 20 + 'px'
	  		this.div_ex.style.height = div_ex_size + 20 + 'px'

	  		if(outline){
	  			this.div_ex.style.outlineOffset = outline.maxoffset + 'px'
	  			this.div_ex.style.outline = outline.maxwidth + 'px solid' + outline.color
	  		}
	  		if(shadow){
	  			this.div_ex.style.boxShadow = `0px 0px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
	  		}

	  		this.div_ex.style.top = (y - (div_ex_size + 10)/2) + 'px'
	  		this.div_ex.style.left = (x - (div_ex_size + 10)/2) + 'px'
	  	}, 50)

	  	setTimeout(()=>{
	  		this.div_ex.style.opacity = '0.0'
	  	}, (this.div_ex.style.transitionDuration.substr(0, 1) * 1000)/2)

	  	setTimeout(()=>{
	  		this.div_ex.remove()
	  	}, (this.div_ex.style.transitionDuration.substr(0, 1) * 1000))

	  	document.getElementById('VisualContainer').appendChild(this.div_ex)
	}
}

const canvas = document.getElementById('canvas')
const score_board = document.getElementById('score')
const reload_game = document.getElementById('reload_restart')
const ctx = canvas.getContext('2d')

var score = 0
var size = 25
var game_w = canvas.width
var game_h= canvas.height
var REAL_game_h = canvas.height - 50
var sq_aX = game_w/size
var sq_aY = game_h/size
var speed = 5
var bomb_drop_speed = 5
var gameOver = false
var div_moving = false
var START_GAME = false

var direction = 'none'

var player_colors = [
	{color:"#D02E2E"}, /*RED*/
	{color:"#3469CB"}, /*BLUE*/
	{color:"#DBD133"}, /*YELLOW*/
	{color:"#9437CF"}, /*PURPLE*/
	{color:"#2FC02F"}, /*GREEN*/
	{color:"#DB3AD9"}  /*PINK*/ ]
var player_faces = [
	'o_o',
	'^^',
	'>_<',
	'^o^',
	'x_x',
	'o.o',
	';_;',
	'*_*',
	'-o-',
	'-.-',
	'$_$',]
var HeadColor = "#E5AF8B"
var bombColor = "#393333"
var groundColor = "#158000"
var face = player_faces[Math.floor(Math.random() * player_faces.length)]

var move_sfx = new Audio('move.mp3')
var gameOver_sfx = new Audio('gameover.mp3')

var bombs = [new BOMB(size, 25, 25), new BOMB(size, 25, 25)]
var player = new PLAYER(HeadColor, player_colors, size, 25, REAL_game_h - 25, face)

let explosionTimer = 0;

function drawExplosion(x, y) {
	var ex2 = new EXPLOSION(40, x, y, 1, 'orange', 225, 0.5, false, {width: 0, color: "#ff0000", offset: 0, maxoffset: 10, maxwidth:2})
  	var ex1 = new EXPLOSION(35, x, y, 1, 'red', 180, 1.0, false, false, {blur: 50, spread: 5, color: "red"})
  	var ex3 = new EXPLOSION(20, x, y, 1, '#fc9803', 225, 0.5, 50, {width: 2, color: "#ff683b", offset: 5, maxoffset: 20, maxwidth:5}, {blur: 25,  spread: 15, color: "red"})

  	// Create a circle with a radius that increases over time
  	ctx.beginPath();
  	ctx.arc(x, y, 10, 0, 2 * Math.PI);
  	ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
  	ctx.fill();

  	for (let i = 1; i < 5; i++) {
	    ctx.beginPath();
	    ctx.arc(x, y, 10 + i * 5, 0, 2 * Math.PI);
	    ctx.fillStyle = `rgba(255, 226, 5, ${0.5 - i * 0.1})`;
	    ctx.fill();
	}
}

function updateExplosion() {
  	explosionTimer++;
  	if (explosionTimer < 10) {
    	drawExplosion(player.coordinate_head[0].x + size/2 , player.coordinate_head[0].y - size/2);
  	} else {
    	explosionTimer = 0;
  	}
}

var play_btn = document.getElementById('play_btn')
play_btn.addEventListener('click', function(){
	var main_mn_con = document.getElementById('mainMenu_container')

	main_mn_con.style.width = '0px'

	setTimeout(()=>{
		main_mn_con.style.opacity = '0.0'
		START_GAME = true
	}, 500)
	setTimeout(()=>{
		main_mn_con.style.display = 'none'
	}, 1000)
})

window.onload = ()=>{
  	setInterval(show, 1000/speed)
  	setInterval(update_bomb, 15000)
}

function update_bomb(){
	if(!gameOver && START_GAME){
		console.log(bombs.length + " bombs")
		bombs.push(new BOMB(size, 25, 25))
		var vs_score = document.getElementById('score_vs')
	  	vs_score.style.width = '100px'
	  	vs_score.style.opacity = '1.0'
	  	score += 1
	  	setTimeout(()=>{
	  		score_board.textContent = score
	  	}, 1000)
	  	setTimeout(()=>{
	  		console.log(vs_score.style.width)
	  		vs_score.style.width = '0px'
	  		vs_score.style.opacity = '0.0'
	  	},2000)
	}
}

function show(){
  	if(START_GAME){
  		update()
	  	draw()
  	}
}

function update(){
  	ctx.clearRect(0,0, game_w, game_h)
  	if(!gameOver){
    	for(let i = 0; i<bombs.length; i++){
      		var bomb = bombs[i]
      		if(bomb.checkTouched(REAL_game_h)){
		    	drawExplosion(bomb.coordinate[0].x + size/2 , bomb.coordinate[0].y - size/2);
        		bombs[i] = new BOMB(size, 25, 25)
        		gameOver_sfx.play()
      		}else{
        		bomb.move()
      		}
    	}
    	checkGameOver()
  	}
}

function draw(){
  	drawBG()
  	drawBomb()
}
function checkGameOver(){
  	for(let k = 0; k<bombs.length; k++){
    	var bomb = bombs[k]
    	for(let i = 0; i<player.coordinate.length; i++){
      	for(let j = 0; j<bomb.coordinate.length; j++){
        		if(player.coordinate[i].x == bomb.coordinate[j].x && player.coordinate[i].y == (bomb.coordinate[j].y + (size))){
          		updateExplosion()
          		gameOver_sfx.play()
          		console.log('game over')
        			gameOver = true
       			GOS()
      		}
     		}
    	}
  	}
}
function GOS(){
	var GameOverVisual = document.getElementById('GameOverVisual')
	var Visual1_GOS = document.getElementById('Visual1_GOS')
	var Visual2_GOS = document.getElementById('Visual2_GOS')
	var Visual3_GOS = document.getElementById('Visual3_GOS')
	var Visual4_GOS = document.getElementById('Visual4_GOS')
	var Visual5_GOS = document.getElementById('Visual5_GOS')
	var Text_GOS = document.getElementById('Text_GOS')


	GameOverVisual.style.opacity = '1.0'
	GameOverVisual.style.width = '800px'

	Visual1_GOS.style.width = '400px'
	Visual1_GOS.style.height = '400px'
	Visual1_GOS.style.rotate = `${45 * 7}deg`
	setTimeout(()=>{
		Visual1_GOS.style.outline = '5px solid #FF204E'
		Visual1_GOS.style.outlineOffset = '50px'
	}, 1500)

	Visual2_GOS.style.rotate = '360deg'
	Visual2_GOS.style.outline = '20px solid #FF6969'
	setTimeout(()=>{
		Visual2_GOS.style.width = '350px'
		Visual2_GOS.style.height = '350px'
	}, 150)

	Visual3_GOS.style.width = '200px'
	Visual3_GOS.style.height = '200px'
	Visual3_GOS.style.outline = '20px solid #FF204E'
	Visual3_GOS.style.borderRadius = '100%'

	Visual4_GOS.style.width = '804px'

	Visual5_GOS.style.height = '604px'

	Text_GOS.style.letterSpacing = '10px'

	reload_restart.style.transition = 'top 0.5s cubicBezier(0.46, 0.03, 0.28, 1.19)'
	setTimeout(()=>{		
		reload_restart.style.transition = 'top 3s cubicBezier(0.46, 0.03, 0.28, 1.19)'
	},1000);
	reload_restart.style.top = '535px'
	reload_restart.style.width = 'auto'
}

function drawBG(){
  createRect(0, game_h - 50, game_w, 50, groundColor)
}
function drawBomb(){
  	for(let j = 0; j<bombs.length; j++){
    	var bomb = bombs[j]
    	for(let i = 0; i<bomb.coordinate.length; i++){
      	createRect(bomb.coordinate[i].x, bomb.coordinate[i].y - size, size, size, bombColor)
    	}
  	}
}

function createRect(x, y, w, h, c){
  	ctx.fillStyle = c
  	ctx.fillRect(x, y, w, h)
}
function createDiv(x, y, w, h, c, custom){
	var div = document.createElement('div')
	div.style.width = `${w}px`
	div.style.height = `${h}px`
	div.style.position = 'absolute'
	div.style.left = `${x}px`
	div.style.top = `${y}px`

	div.style.backgroundColor = c

	div.style.display = 'flex'
	div.style.justifyContent = 'center'
	div.style.alignItems = 'center'

	if(custom.face){
		var p = document.createElement('p')
		p.textContent = custom.face
		p.style.fontFamily = 'Edu VIC WA NT Beginner, cursive'
  		p.style.fontStyle = 'normal'
  		p.position = 'absolute'

  		div.appendChild(p)
	}

	//Requirable custome

	div.id = 'Player'
	div.style.transition = `all ${custom.time}s`

	document.getElementById('MainGameContainer').appendChild(div)

	return div
}

window.addEventListener('keydown', (event) => {
  	if(!gameOver && START_GAME){
	  	if ((event.keyCode == 65 || event.keyCode == 37)) {
	    	direction = 'left'
	    	player.move(direction)
	    	move_sfx.play()
	  	} else if ((event.keyCode == 68 || event.keyCode == 39)) {
	    	direction = 'right'
	    	player.move(direction)
	    	move_sfx.play()
	  	}
	}
})
reload_restart.addEventListener('click', ()=>{
	location.reload()
})