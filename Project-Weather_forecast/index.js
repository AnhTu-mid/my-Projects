const time_ 			   = document.getElementById('time')
const date_ 			   = document.getElementById('date')
const currentWeatherItems_ = document.getElementById('current-weather-items')
const timeZone_ 		   = document.getElementById('time-zone')
const country_ 			   = document.getElementById('country')

var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
var days 	   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months     = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec']

var opened = false

setInterval(()=>{
	const time 				= new Date()
	var month 				= time.getMonth()
	var date 				= time.getDate()
	var day 				= time.getDay()
	var hours 				= time.getHours()
	var minutes 			= time.getMinutes()
	var hourIn12HoursFormat = hours >= 13? hours%12 : hours
	var AM_PM 				= hours >= 12? 'PM' : 'AM'
	var realMinutes 		= minutes <= 9? '0' + minutes: minutes

	time_.innerHTML	= `${hourIn12HoursFormat}:${realMinutes}` + `<span id="am-pm">${AM_PM}</span>`

	date_.innerHTML	= `${days[day]}, ${date} ${months[month]}`
}, 2500)

class FutureWeatherData{
	constructor(){
		this.API 			= 'e8f5612b9c218d9ac7074db98ed280e9'
		this.dailyForecast  = {}
		this.lon 			= 'none'
		this.lat 			= 'none'
		this.nowDataWeather = 'none'
		this.cityName 		= 'none'
		this.fullyDone 		= false
	}

	GetData(city){
		this.cityName = city
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${this.API}`
		
		setInterval(()=>{
			try{
				fetch(url)
				.then(res=>res.json())
				.then(data=>{
					this.lon 			= data.coord.lon
					this.lat 			= data.coord.lat
					this.nowDataWeather = data
					this.dailyForecast  = {}
					this.FetchURL()
				})
			}catch(error){
				console.warn('fail to fetch url, trying again')
			}
		}, 500)
	}

	FetchURL() {
		fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.API}`)
		.then(res => res.json())
		.then(data => {
			const forecastList = data.list
			// Sort the forecast list by the dt property (Unix timestamp)
			forecastList.sort((a, b) => a.dt - b.dt)

			const Mon_ar = []
			const Tue_ar = []
			const Wed_ar = []
			const Thu_ar = []
			const Fri_ar = []
			const Sat_ar = []
			const Sun_ar = []

			for(let i = 0; i<forecastList.length; i++){
				const date = forecastList[i].dt_txt.split(' ')[0]
				const time = forecastList[i].dt_txt.split(' ')[1]
				const hours = Number(time.split(':')[0])
				var lastCheckNumber_hourFormat = hours <= 9? '0'+hours:hours
				const dayOfWeek = getDayOfWeek(date)

				if(dayOfWeek == 'Mon'){
					Mon_ar.push({'Mon': forecastList[i]})
				}else if(dayOfWeek == 'Tue'){
					Tue_ar.push({'Tue': forecastList[i]})
				}else if(dayOfWeek == 'Wed'){
					Wed_ar.push({'Wed': forecastList[i]})
				}else if(dayOfWeek == 'Thu'){
					Thu_ar.push({'Thu': forecastList[i]})
				}else if(dayOfWeek == 'Fri'){
					Fri_ar.push({'Fri': forecastList[i]})
				}else if(dayOfWeek == 'Sat'){
					Sat_ar.push({'Sat': forecastList[i]})
				}else if(dayOfWeek == 'Sun'){
					Sun_ar.push({'Sun': forecastList[i]})
				}
			}

			if(Mon_ar.length == 0){
				Mon_ar.push({'Mon': 'None'})
			}else if(Tue_ar.length == 0){
				Tue_ar.push({'Tue': 'None'})
			}else if(Wed_ar.length == 0){
				Wed_ar.push({'Wed': 'None'})
			}else if(Thu_ar.length == 0){
				Thu_ar.push({'Thu': 'None'})
			}else if(Fri_ar.length == 0){
				Fri_ar.push({'Fri': 'None'})
			}else if(Sat_ar.length == 0){
				Sat_ar.push({'Sat': 'None'})
			}else if(Sun_ar.length == 0){
				Sun_ar.push({'Sun': 'None'})
			}

			this.dailyForecast = {
				'Mon': Mon_ar,
				'Tue': Tue_ar,
				'Wed': Wed_ar,
				'Thu': Thu_ar,
				'Fri': Fri_ar,
				'Sat': Sat_ar,
				'Sun': Sun_ar,
			}
		})
	}
}

function getDayOfWeek(date) {
	const dayOfWeek = daysOfWeek[new Date(date).getDay()]
	// console.log(dayOfWeek)
	return dayOfWeek
}

const data = new FutureWeatherData('Ho chi minh')

function Update(){
	// Update hourly forecast
	if(data.lon !== 'none'){
		for(let i = 0; i<daysOfWeek.length; i++){
			const day_value = daysOfWeek[i]
			if(day_value !== ''){
				const weatherData 	 = data.dailyForecast[day_value]

				const date_fc 		 = document.getElementById(`weather-forecast-date-item-${day_value}`)
				const time_fc 		 = document.getElementById(`forecastTime-${day_value}`)
				const weatherIcon_fc = document.getElementById(`weather-icon-${day_value}`)
				const temp_fc 		 = document.getElementById(`temp-${day_value}`)


				try{
					if(weatherData[0][day_value] == 'None'){
						//Unavailable Forecast ==> Yesterday / Can't restore old data
						date_fc.parentNode.style.display = 'none'
					}else{
						const theLatestUpdateForecast = weatherData.slice(-1)[0][day_value]

						var date_ 				 	  = theLatestUpdateForecast.dt_txt.split(' ')[0].split('-')
						var yyyy					  = date_[0]
						var dd 						  = date_[2]
						var mm 						  = date_[1]
						var time_   				  = theLatestUpdateForecast.dt_txt.split(' ')[1]
						var weatherIcon_ 			  = theLatestUpdateForecast.weather[0].icon
						var temp_ 					  = Math.floor(theLatestUpdateForecast.main.temp)

						temp_fc.innerHTML			  = `${temp_}&#176;C`
						date_fc.innerHTML			  = `${dd}/${mm}/${yyyy}`
						time_fc.innerHTML			  = time_
						weatherIcon_fc.src 			  = `http://openweathermap.org/img/wn/${weatherIcon_}@2x.png`

						data.fullyDone = true
					}
				}catch(error){

				}
			}
		}
	}

	// Update now-today weather status
	try{
		if(data.nowDataWeather.main.temp){
			const Dtemp_now         = document.getElementById('Day-temp')
			const Ntemp_now         = document.getElementById('Night-temp')
			const weather_now       = document.getElementById('Weather')
			const windSpeed_now     = document.getElementById('WindSpeed')
			const pressure_now      = document.getElementById('Pressure')
			const weatherIcon_now   = document.getElementById('weather-icon')
			const humidity_now      = document.getElementById('Humidity')

			Dtemp_now.innerHTML     = `${Math.floor(data.nowDataWeather.main.temp)}&#176;C`
			Ntemp_now.innerHTML     = `${Math.floor(data.nowDataWeather.main.temp_min)}&#176;C`

			weather_now.innerHTML   = data.nowDataWeather.weather[0].description.slice(0, 1).toUpperCase() + data.nowDataWeather.weather[0].description.slice(1)

			windSpeed_now.innerHTML = `${data.nowDataWeather.wind.speed} Km/h`
			pressure_now.innerHTML  = data.nowDataWeather.main.pressure
			humidity_now.innerHTML  = `${data.nowDataWeather.main.humidity}%`

			weatherIcon_now.src     = `http://openweathermap.org/img/wn/${data.nowDataWeather.weather[0].icon}@2x.png`
		}else{

		}
	}catch(error){

	}
}

function Loading(){
	setTimeout(()=>{
		if(data.fullyDone){
			const loadingScreen = document.getElementById('loading')
			loadingScreen.style.minHeight = '0px'

			setTimeout(()=>{
				document.getElementById('loader').style.opacity = '0'
				document.getElementById('loader_txt').style.opacity = '0'
				setTimeout(()=>{
					loadingScreen.parentNode.style.display = 'none'
				}, 500)
			}, 500)

			console.log('Loading finished')
		}else{
			Loading()
		}
	}, 1000)
}

//Forecast build//

Loading()

setInterval(()=>{
	data.GetData('Ho Chi Minh')
	Update(data)
}, 2000)