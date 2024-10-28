const express = require("express")
const weatherHandler = require("./../handlers/weatherHandlers")

const weatherRouter = express.Router();

weatherRouter.route("/")
.get(weatherHandler.getAllData)
.post(weatherHandler.addNewCityData);

weatherRouter.route("/rain")
.get(weatherHandler.getRainDetails);

weatherRouter.route("/:city")
.get(weatherHandler.detailsOdSpecificCity)
.delete(weatherHandler.removeACity)

weatherRouter.route("/noRain/:city")
.get(weatherHandler.changeRainDetails);

module.exports = weatherRouter