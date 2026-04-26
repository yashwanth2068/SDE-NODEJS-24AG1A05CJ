function getWeather() {

    let cityName = document.getElementById("city").value;

    if (cityName === "") {
        alert("Please enter a city name!");
        return;
    }

    let apiKey = "YOUR_API_KEY"; // Replace with your API key

    let url = "https://api.openweathermap.org/data/2.5/weather?q="
        + cityName +
        "&appid=" + apiKey +
        "&units=metric";

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            let temperature = data.main.temp;
            let description = data.weather[0].description;

            document.getElementById("result").innerHTML =
                "<h2>City: " + cityName + "</h2>" +
                "<p>Temperature: " + temperature + " °C</p>" +
                "<p>Condition: " + description + "</p>";
        })
        .catch(error => {
            document.getElementById("result").innerHTML =
                "<p style='color:red;'>City not found!</p>";
        });
}