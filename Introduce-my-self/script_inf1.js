//Body Info1//
const Name = document.getElementById('Name')
var open_nameInfo = false // i guess this one isn't necessary?

let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if(isMobile){
	document.getElementById('link_btn2').href = 'https://anhtu-mid.github.io/my-Projects/Project-TicTacToe/game_mobile.html'
}

Name.addEventListener('mouseover', function(){
	if(!open_nameInfo){
		open_nameInfo = true
		const name_div1 = document.getElementById('name_div1')
		const name_div2 = document.getElementById('name_div2')

		name_div1.style.opacity = '1.0'
		name_div1.style.textDecoration = 'underline'

		// Screen resolution method
		if (!isMobile) {
			name_div2.style.width = '420px'
			name_div1.style.left = '150px'
		}

		// Touch events method
		if (isMobile) {
			name_div2.style.width = '300px'
			name_div1.style.left = '60px'
		}

		name_div2.style.borderRadius = '0px 200px 200px 0px'
	}
})

if(isMobile){
	open_nameInfo = true
	const name_div1 = document.getElementById('name_div1')
	const name_div2 = document.getElementById('name_div2')
	name_div1.style.fontSize = '1rem'
	name_div1.style.opacity = '1.0'
	name_div1.style.textDecoration = 'underline'
	name_div2.style.width = '300px'
	name_div1.style.left = '60px'
	name_div2.style.borderRadius = '0px 200px 200px 0px'
}

//Body Info1-Skills//
var isOpen_info = false
const Show_skills = document.querySelector('#Show_skills')
const esc_btn = document.getElementById('esc_btn')

Show_skills.addEventListener('click', function(){
	const esc_nof = document.getElementById('esc_nof')
	const nofBoard_container = document.querySelector('.nofBoard_container')
	const nofBoard_f = document.querySelector('#nofBoard_frame')

	esc_nof.style.display = 'block'

	nofBoard_f.style.height = '125px'
	esc_nof.style.display = 'block'
	nofBoard_container.style.height = '150px'
	esc_nof.style.opacity = '1.0'

	isOpen_info = true
})
esc_btn.addEventListener('click', function(){
	const esc_nof = document.getElementById('esc_nof')
	const nofBoard_container = document.querySelector('.nofBoard_container')
	const nofBoard_f = document.querySelector('#nofBoard_frame')

	nofBoard_f.style.height = '0px'
	nofBoard_container.style.height = '0px'
	esc_nof.style.opacity = '0.0'

	setTimeout(()=>{
		esc_nof.style.display = 'none'
	}, 500)

	isOpen_info = false
})

//Skills shown//
var css_ds = 'block' // 1st
var html_ds = 'none' // 2nd
var js_ds = 'none' // 3rd
var rs_ds = 'none' // 3rd
var change_count = 1

const css_img = document.getElementById('css_img')
const html_img = document.getElementById('html_img')
const rs_img = document.getElementById('rs_img')
const js_img = document.getElementById('js_img')
const next_button = document.getElementById('nx_btn')

html_img.style.width = '75%'
html_img.style.height = '75%'

js_img.style.width = '75%'
js_img.style.height = '75%'

rs_img.style.width = '75%'
rs_img.style.height = '75%'

html_img.style.display = 'none'
js_img.style.display = 'none'
rs_img.style.display = 'none'

html_img.style.opacity = '0.0'
css_img.style.opacity = '1.0'
js_img.style.opacity = '0.0'
rs_img.style.opacity = '0.0'

var order_info_title = ['Name', 'Exp', 'Pcn']
var order_info_details = [
	{Name:'Roblox Studio', Exp: '12', Pcn: '80%'},
	{Name:'Css', Exp: '2.5', Pcn: '60%'},
	{Name:'Html', Exp: '2.5', Pcn: '60%'},
	{Name:'Js', Exp: '1.5', Pcn: '50%'},
]

function set_info(){
	document.getElementById(`Name_objDetailsInfo`).textContent = `${order_info_details[change_count].Name}`
	document.getElementById(`Exp_objDetailsInfo`).textContent = `${order_info_details[change_count].Exp}`
	document.getElementById(`Pcn_objDetailsInfo`).textContent = `${order_info_details[change_count].Pcn}`
}

function changeImgVisual(){
	const visual = document.getElementById('img_visual')

	visual.style.height = '90px'
	visual.style.rotate = '360deg'
	visual.style.opacity = '1.0'

	setTimeout(()=>{
		visual.style.height = '0px'
		visual.style.rotate = '0deg'
	}, 980)

	for(let i = 0; i<order_info_title.length; i++){
		let detail_info = document.getElementById(`${order_info_title[i]}_objInfo_visual`)
		detail_info.style.boxShadow = '0px 0px 10px #0D7C66'
	}

	let detail_info = document.getElementById(`Name_objInfo_visual`)
	if(change_count >= 4 || change_count == 1){
		detail_info.style.width = '185px'
	}else{
		detail_info.style.width = '135px'
	}

	setTimeout(()=>{
		detail_info.style.width = '0px'
	}, 980)

	setTimeout(()=>{
		let detail_info2 = document.getElementById(`Exp_objInfo_visual`)
		detail_info2.style.width = '135px'

		setTimeout(()=>{
			detail_info2.style.width = '0px'
		}, 980)

		setTimeout(()=>{
			let detail_info3 = document.getElementById(`Pcn_objInfo_visual`)
			detail_info3.style.width = '135px'

			setTimeout(()=>{
				detail_info3.style.width = '0px'
			}, 980)
		}, 250)
	}, 250)
}

function changeImg(){
	change_count += 1
	console.log(change_count)

	changeImgVisual()

	if(change_count == 1 && css_img.style.display == css_ds){
		css_ds = 'block'
		html_ds = 'none'
		js_ds = 'none'
		rs_ds = 'none'

		html_img.style.opacity = '0.0'
		css_img.style.opacity = '1.0'
		js_img.style.opacity = '0.0'
		rs_img.style.opacity = '0.0'
	}else if(change_count == 2 && html_img.style.display == html_ds){
		css_ds = 'none'
		html_ds = 'block'
		js_ds = 'none'
		rs_ds = 'none'

		html_img.style.opacity = '1.0'
		css_img.style.opacity = '0.0'
		js_img.style.opacity = '0.0'
		rs_img.style.opacity = '0.0'
	}else if(change_count == 3 && js_img.style.display == js_ds){
		css_ds = 'none'
		html_ds = 'none'
		js_ds = 'block'
		rs_ds = 'none'

		html_img.style.opacity = '0.0'
		css_img.style.opacity = '0.0'
		js_img.style.opacity = '1.0'
		rs_img.style.opacity = '0.0'
	}else if(change_count >= 4 && rs_img.style.display == rs_ds){
		css_ds = 'none'
		html_ds = 'none'
		js_ds = 'none'
		rs_ds = 'block'

		document.getElementById('Name_objDetailsInfo').style.fontSize = '1rem'

		html_img.style.opacity = '0.0'
		css_img.style.opacity = '0.0'
		js_img.style.opacity = '0.0'
		rs_img.style.opacity = '1.0'

		change_count = 0
	}
}

next_button.addEventListener('click', function(){
	changeImg()
	next_button.style.pointerEvents = 'none'

	setTimeout(()=>{
		set_info()
		css_img.style.display = css_ds
		html_img.style.display = html_ds
		js_img.style.display = js_ds
		rs_img.style.display = rs_ds
		next_button.style.pointerEvents = 'auto'
	}, 980)
})

set_info()

var debounce_keyright = false
window.addEventListener('keydown', function(event){
	if(isOpen_info && !debounce_keyright){
		if(event.key == 'ArrowRight'){
			debounce_keyright = true
			changeImg()
			next_button.style.pointerEvents = 'none'

			setTimeout(()=>{
				set_info()
				css_img.style.display = css_ds
				html_img.style.display = html_ds
				js_img.style.display = js_ds
				rs_img.style.display = rs_ds
				next_button.style.pointerEvents = 'auto'
				debounce_keyright = false
			}, 980)
		}
	}
})
