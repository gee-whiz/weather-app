const form=document.getElementById("search");
const cityInput=document.getElementById("city");
const result=document.getElementById("result");
const locationEl=result.querySelector(".location");
const tempEl=result.querySelector(".temp");
const detailsEl=result.querySelector(".details");
const errorEl=document.getElementById("error");
const apiKey="6bb2f235039eb8862b7255f5fe9faff6";

const formatTemp=v=>`${Math.round(v)}°C`;
const buildUrl=city=>`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

const renderWeather=data=>{
  locationEl.textContent=`${data.name}, ${data.sys.country}`;
  tempEl.textContent=formatTemp(data.main.temp);
  detailsEl.textContent=`${data.weather[0].description} | Feels like ${formatTemp(data.main.feels_like)} | ${data.main.humidity}% humidity`;
  result.classList.remove("hidden");
};

const showError=message=>{
  errorEl.textContent=message;
  errorEl.classList.remove("hidden");
};

const fetchWeather=city=>{
  const xhr=new XMLHttpRequest();
  xhr.open("GET",buildUrl(city));
  xhr.onreadystatechange=()=>{
    if(xhr.readyState!==4)return;
    if(xhr.status===200){
      renderWeather(JSON.parse(xhr.responseText));
    }else{
      showError("Could not find that city. Try again.");
    }
  };
  xhr.send();
};

form.addEventListener("submit",e=>{
  e.preventDefault();
  const city=cityInput.value.trim();
  if(!city)return;
  errorEl.classList.add("hidden");
  result.classList.add("hidden");
  fetchWeather(city);
});
