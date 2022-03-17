// query selectors

const body = document.querySelector("body");
const switchButton = document.querySelector(".app__style");
const cityName = document.querySelector(".city-name");
const cityInput = document.querySelector(".city-input");
const citySubmit = document.querySelector(".city-submit");
const cityError = document.querySelector(".city-error");
const img = document.querySelector(".img");
const weather = document.querySelector(".weather");
const time = document.querySelector(".time");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

// setting theme with local storage

let theme = localStorage.getItem("theme")
	? localStorage.getItem("theme")
	: "day";

const setTheme = () => {
	if (theme === "dark") {
		body.classList.remove("dark");
		theme = "day";
	} else {
		body.classList.add("dark");
		theme = "dark";
	}

	localStorage.setItem("theme", theme);
};

if (theme === "dark") {
	body.classList.add("dark");
}

// getting weather conditions with async & await

const getWeather = async () => {
	try {
		const input = cityInput.value || "Warsaw";
		const APIKEY = "403c8aa8d17a4828940183330221203";
		const APICONDITIONS = "https://api.weatherapi.com/v1";
		const query = `/current.json?key=${APIKEY}&q=${input}`;
		const res = await fetch(APICONDITIONS + query);
		const data = await res.json();
		const weatherIcon = data.current.condition.icon;
		cityName.textContent = data.location.name;
		weather.textContent = data.current.condition.text;
		img.setAttribute("src", `${weatherIcon}`);
		time.textContent = data.location.localtime;
		temperature.textContent = Math.floor(data.current.temp_c) + "°C";
		humidity.textContent = data.current.humidity + "%";
		wind.textContent = data.current.wind_kph + "kph";
		cityInput.value = "";
		cityError.textContent = "";
	} catch {
		cityInput.value = "";
		cityError.textContent = "Type a valid city!";
	}
};

// checking if city-input is empty

const emptyInput = () => {
	if (cityInput.value === "") {
		cityError.textContent = "You must type the name of the city!";
	} else {
		getWeather();
	}
};

// approving by "enter" key

const enterKey = (e) => {
	if (e.key === "Enter") {
		getWeather();
	}
};

// switching "dark" and "day" modes

const switchMode = () => {
	body.classList.toggle("dark");
	setTheme();
};

// event listeners

window.addEventListener("load", getWeather);
citySubmit.addEventListener("click", emptyInput);
cityInput.addEventListener("keyup", enterKey);
switchButton.addEventListener("click", switchMode);
