import React from "react";
import Weather from "./Weather";
import Input from "./Input";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

class App extends React.Component {
  state = {
    location: "Lisbon",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  fetchWeather = async () => {
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`,
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = (e) => {
    this.setState({ location: e.target.value });
  };

  render() {
    return (
      <div className={"App"}>
        <h1>Classy Weather</h1>
        <div>
          {/*<input*/}
          {/*  type={"text"}*/}
          {/*  placeholder={"Search from location..."}*/}
          {/*  value={this.state.location}*/}
          {/*  onChange={(e) => this.setState({ location: e.target.value })}*/}
          {/*/>*/}
          <Input location={this.state.location} onChangeLocation={this.setLocation}></Input>
          <button onClick={this.fetchWeather}>Get weather</button>
        </div>

        {this.state.isLoading && <p className={"loader"}>Loading...</p>}

        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
