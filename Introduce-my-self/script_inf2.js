//Open play image//

var buttons = ['1', '2', '3', '4']

for(let i = 0; i<buttons.length; i++){
	const button = document.getElementById(`link_btn${buttons[i]}`)
	const img = document.getElementById(`project_img${buttons[i]}`)
	const cY = button.style.top

	let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

	button.addEventListener('mouseover', function(){
		if(!isMobile){
			img.style.opacity = '1.0'

			img.style.height = '80px'
			img.style.rotate = '360deg'
			img.style.borderRadius = '0px'
		}	
	})

	button.addEventListener('mouseout', function(){
		if(!isMobile){
			img.style.opacity = '0.0'

			img.style.height = '0px'
			img.style.rotate = '0deg'
			img.style.borderRadius = '50px'
		}
	})

	if(isMobile){
		img.style.opacity = '1.0'

		img.style.height = '120px'
		img.style.width = '120px'
		img.style.rotate = '360deg'
		img.style.marginTop = '10%'
		img.style.borderRadius = '0px'
	}
}