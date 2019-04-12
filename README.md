# Weather App

## Description
- A basic weather app providing the user information about a specific cities current weather. Also integrates google maps for advanced city searching

## Entity definition
- The selected cities weather
- Weather
- 3 mandatory attributes:
    - Coordinates: number
    - LocalTime: Date
    - Temperature celsius: number
- 5 custom attributes:
    - City Name: string
    - Condition: {text: string, icon: string, code: number}
    - Wind: {speed: number, direction: string}
    - Pressure: number
    - FeelsLike celsius: number

## API definition
The websystem is going to store data locally, so it won't have the standart CRUD functionality using an external database.
- The websystem is going to use https://www.apixu.com API
- The websystem is going to expose methods to:
    - Get current weather by city coordinates
    - Get cities weather forecast for 1-10 days
    - Get cities weather history
- API methods
    - GET current weather by city coordinates http://api.apixu.com/v1/current.json?&q=long,lat
    - GET weather forecast by city coordinates http://api.apixu.com/v1/forecast.json?&q=long,lat
    - GET weather history by city coordinates http://api.apixu.com/v1/history.json?&q=long,lat
    - POST city string to return list of found city coordinates (search) https://api.opencagedata.com/geocode/v1/json?q=city

## UI definition
- The websystem is going to use Material Design guidelines
- The starting view, when there are no cities selected https://wireframe.cc/wuShHQ
    - Clicking on the plus sign prompts the user to add a city to display that cities information in the card
