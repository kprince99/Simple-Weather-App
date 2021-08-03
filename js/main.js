var date = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    currDay = weekday[date.getDay()],

    todayDate = String(date.getDate()).padStart(2, '0');
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    curMonth = months[date.getMonth()],
    curYear = date.getFullYear();    
        
    document.getElementById('day').textContent = currDay;
    document.getElementById('dates').innerHTML = todayDate + " " + curMonth + " " + curYear;

   async function RunProgram(event)
   {
    event.preventDefault();
     const cityName = document.querySelector('.city_name'),
           degree = document.getElementById('degree'),
           weather = document.getElementById('weather'),
           icon = document.querySelector('#icon'),
           inpValue = document.getElementById('city').value,
           inpQuery = inpValue.trim();

     try {
          const results = await handleApi(inpQuery)
          console.log(results);
          if(inpValue != " ")
          {
          degree.innerHTML = results.current.temp_c + "<sup>o</sup>C";
          weather.textContent = results.current.condition.text;
          icon.style.visibility = "visible";
          cityName.innerHTML = results.location.name + ", " + results.location.country;
          icon.src ="https:"+results.current.condition.icon;
          }    
}
    catch (err) {
        alert('Please Enter City Name');
      }

}
  async function handleApi(query)
  {
   const endpoint = `http://api.weatherapi.com/v1/current.json?key=bd871b59319a439db7e120446212007&q=${query}&aqi=yes`;

     const response = await fetch(endpoint)
        if (!response.ok) {
       throw Error(response.statusText)
        }

         const json = await response.json();
        return json;

  }

  const display = document.querySelector("#form-control");
  display.addEventListener('submit', RunProgram);