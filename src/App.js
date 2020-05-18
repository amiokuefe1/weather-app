import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from './app_components/form.component'
import Weather from './app_components/weather.component'
const API_KEY ='249156659f17ab843083542af75acde0'


// api.openweathermap.org/data/2.5/weather?q=London,uk

class App extends React.Component {
  constructor(){
      super()
      this.state = {
        city: undefined,
        country: undefined,
        icon:undefined,
        main:undefined,
        celsius:undefined,
        temp_min:undefined,
        temp_max:undefined,
        description:"",
        error:false

      };
      // this.getWeather();

      this.weatherIcon={
        Thunderstorm: "wi-thunderstorm",
        Drizzle:"wi-sleet",
        Rain:"wi-storm-showers",
        Snow:"wi-snow",
        Atmosphere:"wi-fog",
        Clear:"wi-day-sunny",
        Clouds:"wi-day-fog"
      }
  }

  calCelsius(temp){
    let cell = Math.floor(temp-273.15)
    return cell;
  }
  // the above converts api temp in kelvin to celsius

get_weatherIcon(icon, rangeId){
   switch(true) {
    case rangeId >= 200 && rangeId<=232:
     this.setState({icon: this.weatherIcon.Thunderstorm});
     break;
     // the above helps us to compare & contrast API response data value(in a particular range) with a our own local response(an image, message e.t.c) & render our own response to the UI. this is an example of React Reducer
     case rangeId >= 300 && rangeId<=321:
     this.setState({icon: this.weatherIcon.Drizzle});
     break;
     case rangeId >= 500 && rangeId<=531:
     this.setState({icon: this.weatherIcon.Rain});
     break;
     case rangeId >= 600 && rangeId<=622:
     this.setState({icon: this.weatherIcon.Snow});
     break;
     case rangeId >= 701 && rangeId<=781:
     this.setState({icon: this.weatherIcon.Atmosphere});
     break;
     case rangeId === 800:
     this.setState({icon: this.weatherIcon.Clear});
     break;
     case rangeId >= 801 && rangeId<=804:
     this.setState({icon: this.weatherIcon.Clouds});
     default:
      this.setState({icons:this.weatherIcon.Clouds}); 
   }
 }

  getWeather = async(e) =>{
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country =e.target.elements.country.value;
    // the above retrieves the user data input from the form

    if(city&&country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    // the above fetch link will fetch london,uk by default if there's no api request

      const response = await api_call.json();

      console.log(response)

      this.setState({
        city:`${response.name} ${response.sys.country}`,
        // country:response.sys.country, no need because of the above
        temp_celsius:this.calCelsius(response.main.temp), 
        // the function will converty the temp response from kelvin to celsius don't forget to add 'this' keyword
        temp_min:this.calCelsius(response.main.temp_min),
        temp_max:this.calCelsius(response.main.temp_max),
        description:response.weather[0].description,
        // the temp_description is accessed inside of an array that has an object inside of it
      })

      this.get_weatherIcon(this.weatherIcon, response.weather[0].id)  
    }
    // the above will run when there's a city & country provided by the user query else an error should display

    else{
      this.setState({error:true})
    }
    
  };
  // Id use axios for this fetch functionality instead of this native react
  // fetch method.  althougth this method does the api fetch request

  render(){
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Form loadweather={this.getWeather} error={this.state.error}/>
        {/**the above calls the getWeather methods to begin the api request/fetch based on the location we put in the form feed **/}

          <Weather city={this.state.city} country={this.state.country} temp_celsius={this.state.temp_celsius}
            temp_min={this.state.temp_min}
            temp_max={this.state.temp_max}
            description = {this.state.description}
            weatherIcon = {this.state.icon}
             />
            
                      
        </header>
      </div>
    );
  
  }
}

export default App;
