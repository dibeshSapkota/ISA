const apiKey = "ab9942e22966c2f3fecd5096b16c72f6";

async function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Update the HTML content with data
    document.getElementById("cityName").textContent = data.name || "N/A";
    setInterval(() => {
      document.getElementById("dayDate").textContent =
        new Date().toLocaleString();
    }, 1000);

    document.getElementById("mainWeather").textContent =
      data.weather[0].main || "N/A";
    document.getElementById("weatherCondition").textContent =
      data.weather[0].description || "N/A";
    document.getElementById(
      "weatherIcon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("temperature").textContent = data.main.temp || "-";
    document.getElementById("pressure").textContent =
      data.main.pressure || "N/A";
    document.getElementById("humidity").textContent =
      data.main.humidity || "N/A";
    document.getElementById("windSpeed").textContent = data.wind.speed || "N/A";
    document.getElementById("windDirection").textContent =
      data.wind.deg || "N/A";
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("data").textContent =
      "Failed to load data. Please try again.";
  }
}

// Event listener for search button click
document.getElementById("searchh").addEventListener("click", () => {
  const searchForm = document.getElementById("searchInput");
  const city = searchForm.value.trim();

  if (city) {
    fetchWeather(city);
    searchForm.value = ""; // Clear input field after search
  } else {
    document.getElementById("data").textContent = "Please enter a city name.";
  }
});
fetchWeather("Bharatpur");
// Set Bharatpur as the default city on page load
// document.addEventListener("DOMContentLoaded", () => {
//   fetchWeather("Bharatpur");
// });
