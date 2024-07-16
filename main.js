const resultElement = document.getElementById('result')
const loading = document.getElementById('loading')
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
const API_KET = 'UH8GCBZLPZEU5ZT9HAUC87S5F'
const searchImage = document.querySelector('.search img')
const inputElement = document.querySelector('.search input')
const errorElement = document.getElementById('error')


const startLoading = () =>{
  loading.classList.remove('hide')
}

const stopLoading = () =>{
loading.classList.add('hide')
}

const fetchData = async (city='baghdad',temp) =>{
  if (!city){
    city ='baghdad'
  }
  const response = await fetch(`${BASE_URL}/${city}?key=${API_KET}&&unitGroup=${temp}`)
  try{
  const responseJSON = await response.json();
  console.log(responseJSON)
  return responseJSON
  }catch(err){
    if (!response) console.log('netowrk error')
    else if (!response.ok) console.log('no such city')
    return
  }
}

const setImgSrc = (img,condition) =>{
  img.src = `${condition}.svg`
}

const clearInput = () =>{
  inputElement.value = '';
}

const getUnit = () =>{
  return document.querySelector('.unit label input:checked').value
}

const getDayData = (data , i) =>{
  return data['days'][i];
}

const getLocation = (data) =>{
  return `${data['address']}(${data['resolvedAddress']})`
}

const setResults = (data , i) => {
  if (data){
  const locatoine = document.getElementById('location').innerText = getLocation(data)
  for (i =1; i<=4 ; i++){
    const dayData = getDayData(data,i)
    document.querySelector(`#card${i} img`).src = `./icons/${dayData['icon']}.svg`
    document.querySelector(`#card${i} .weather-condition`).innerText = dayData['icon']
    document.getElementById(`temp${i}`).innerText = `${dayData['tempmin']} - ${dayData['tempmax']}(${dayData['temp']})`
    document.getElementById(`feels-like${i}`).innerText = `${dayData['feelslikemin']} - ${dayData['tempmax']}(${dayData['temp']})`
  }
  }
}

const showResult = (data) =>{
  if(!data){
    resultElement.classList.add('hide')
    errorElement.classList.remove('hide')
  }else{
  for (let i = 0; i < 4; i++) {
    setResults(data , i)
  }
  errorElement.classList.add('hide')
  resultElement.classList.remove('hide')
}
}


window.addEventListener('DOMContentLoaded',()=>{
  inputElement.focus()
})

searchImage.addEventListener('click',async () => {
  const city = inputElement.value;
  const unit = getUnit()
  clearInput()
  startLoading()
  data = await fetchData(city,unit)
  stopLoading()
  inputElement.focus()
  showResult(data)
})

inputElement.addEventListener('keydown' , async (e) => {
  if (e.key === 'Enter'){
    const city = inputElement.value;
    const unit = getUnit()
    clearInput()
    startLoading()
    data = await fetchData(city,unit)
    stopLoading()
    inputElement.focus()
    showResult(data)
  }
})




