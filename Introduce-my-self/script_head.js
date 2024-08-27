//Head Script//

var objectives = ['Ab-me', 'My-prj']

const info1_ab_me = document.querySelector('.info1')
const info2_my_prj = document.querySelector('.info2')

for(let i =0; i<objectives.length; i++){
	const obj = document.getElementById(objectives[i])

	obj.addEventListener('click', function(){
		if(i == 0 && objectives[i] == 'Ab-me'){
			info1_ab_me.scrollIntoView({ behavior: 'smooth' })
		}else if(i == 1 && objectives[i] == 'My-prj'){
			info2_my_prj.scrollIntoView({ behavior: 'smooth' })
		}
	})
		
}