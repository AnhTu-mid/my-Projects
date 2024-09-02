const API = 'e8f5612b9c218d9ac7074db98ed280e9'

const changeData_visual = document.getElementById('visual_changeData')
const name_data = ['name', 'icon', 'humidity', 'windSpeed', 'temp']
const data = {
	name: '',
	icon: '',
	humidity: '',
	windSpeed: '',
	temp: '',
	errorCode: '400',
}
const icons = {
	'01d':'assets/clear.png',
	'01n':'assets/clear.png',
	'02d':'assets/cloud.png',
	'02n':'assets/cloud.png',
	'03d':'assets/cloud.png',
	'03n':'assets/cloud.png',
	'04d':'assets/cloud.png',
	'04n':'assets/cloud.png',
	'09d':'assets/rain.png',
	'09n':'assets/rain.png',
	'10d':'assets/rain.png',
	'10n':'assets/rain.png',
	'13n':'assets/snow.png',
	'13n':'assets/snow.png',
}

function ReturnData(city){
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`
	fetch(url)
	.then(res => res.json())
	.then(Returndata=>{
		console.log(Returndata)
		if(Returndata.cod !== '404'){
			data.name = Returndata.name
			data.icon = icons[Returndata.weather[0].icon]
			data.humidity = Returndata.main.humidity
			data.windSpeed = Returndata.wind.speed
			data.temp = Math.floor(Returndata.main.temp)
			data.errorCode = '200'

			changeData_visual.style.height = '100vh'
			setTimeout(Update, 1050)
			setTimeout(()=>{
				changeData_visual.style.height = '0vh'
			}, 1950)
		}else{
			data.name = 'NaN'
			data.icon = icons['01d']
			data.humidity = '0'
			data.windSpeed = '0'
			data.temp = '0'
			data.errorCode = '400'

			changeData_visual.style.height = '100vh'
			setTimeout(Update, 1050)
			setTimeout(()=>{
				changeData_visual.style.height = '0vh'
			}, 1950)
		}
	})
}

function Update(){
	if(data.errorCode === ''){
		setTimeout(()=>{
			Update()
			console.log('Updating...')
		}, 500)
	}else{
		for(let i = 0; i<name_data.length; i++){
			var dataLabel = document.getElementById(name_data[i])

			if(name_data[i] == 'temp'){
				dataLabel.textContent = `${data.temp}°C`
			}else if(name_data[i] == 'name'){
				dataLabel.textContent = `${data.name}`
			}else if(name_data[i] == 'icon'){
				dataLabel.src = data.icon
			}else if(name_data[i] == 'humidity'){
				dataLabel.textContent = `${data.humidity}%`
			}else if(name_data[i] == 'windSpeed'){
				dataLabel.textContent = `${data.windSpeed} Km/h`
			}
		}
	}
}

ReturnData('Ho chi minh')

const submit_btn = document.getElementById('submit')
const input_ = document.getElementById('input_')

submit_btn.addEventListener('click', function(){
	var city  = input_.value
	if(city !== ''){
		ReturnData(city)
	}

	submit_btn.style.outline = '2px solid transparent'
	submit_btn.style.outlineOffset = '25px'

	setTimeout(()=>{
		submit_btn.style.transition = 'none'
		submit_btn.style.outline = '0px solid white'
		submit_btn.style.outlineOffset = '0px'
		setTimeout(()=>{
			submit_btn.style.transition = 'all 0.5s'
		}, 500)
	}, 650)
})
