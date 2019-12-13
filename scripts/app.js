const cityForm = document.querySelector('form');

const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUi = (data) => {
    
    //destructure data

    const {cityDets, weather} = data;
    console.log(data)
    
    //update the details template here
    details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${cityDets.EnglishName} || ${cityDets.Country.LocalizedName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
</div>
    `;

    // updating the weather Icon

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //updating the icons and images 

    let timeSrc = weather.IsDayTime ?  'img/day.svg': 'img/night.svg';
    

    time.setAttribute('src', timeSrc);
    //remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    
}
    //error display

    const showErr = (err) => {
        let errMessage = err.message.includes("undefined") ? `I don't know that city` : err.message;
        card.classList.remove('d-none');
        details.innerHTML = `<p class = 'display-2 text-center'>${errMessage}</p>`;
        
       
    }



const updatecity = async( city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather}
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get  value entered for the city
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the city 

    updatecity(city)
    .then(data => updateUi(data))
    .catch(err => showErr(err));
}) 

