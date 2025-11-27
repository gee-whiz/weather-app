const form=document.getElementById("search");
const cityInput=document.getElementById("city");
const result=document.getElementById("result");
const locationEl=result.querySelector(".location");
const tempEl=result.querySelector(".temp");
const detailsEl=result.querySelector(".details");
const errorEl=document.getElementById("error");
const apiConfig=window.__APP_CONFIG__||{};
const apiKey=apiConfig.apiKey||"";
const keyLooksPlaceholder=/\\$\\{[^}]+\\}/.test(apiKey);

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
  if(!apiKey){
    showError("API key not configured. Set OPENWEATHER_API_KEY on the server.");
    return;
  }
  if(keyLooksPlaceholder){
    showError("API key looks like an unreplaced placeholder. Check your build/secret setup.");
    return;
  }
  const xhr=new XMLHttpRequest();
  const url=buildUrl(city);
  xhr.open("GET",url);
  xhr.onreadystatechange=()=>{
    if(xhr.readyState!==4)return;
    if(xhr.status===200){
      renderWeather(JSON.parse(xhr.responseText));
    }else{
      let message="Could not find that city. Try again.";
      if(xhr.status===401) message="Unauthorized: check your API key configuration.";
      showError(message);
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
