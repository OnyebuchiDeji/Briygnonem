//  Object Coordinatelabel
function CoordinateLabel()
{
  this.labels = new Array();
  
  this.initialize = function(city, data, longLabelClass, latLabelClass)
  {
    this.coordData = data;
    this.longLabel = longLabelClass;
    this.latLabel = latLabelClass;
    for (i=0; i<this.longLabel.length; i++)
    {
      this.longLabel[i].innerHTML = "LONGITUDE " + city.toUpperCase() + ": " + this.coordData.coord.lon;
      this.latLabel[i].innerHTML = "LATITUDE " + city.toUpperCase() + ": " + this.coordData.coord.lat;
    }
  
  }

  this.setColor = function(color)
  {
    for (i=0; i < this.longLabel.length; i++)
    {
      this.longLabel[i].style.color = color;
      this.latLabel[i].style.color = color;
    }
  }

  this.setBackgroundColor = function(color)
  {
    for (i=0; i < this.latLabel.length; i++)
    {
      this.longLabel[i].style.backgroundColor = color;
      this.latLabel[i].style.backgroundColor = color;
    }
  }
}

function DataList()  {

  this.initialize = function(data)
  {
    this.forecastData = data;

    this.DateList = this.forecastData.list.map(list => {
      return list.dt_txt;
    });

    this.TemperatureList = this.forecastData.list.map(list => {
      return list.main.temp;
    });
    this.WindList = this.forecastData.list.map(list => {
      return list.wind.speed;
    });
    this.HumidityList = this.forecastData.list.map(list => {
      return list.main.humidity;
    });
  }

}
  

//TODO: Task 1:
var coordStoke = new CoordinateLabel();
coordStoke.initialize("Stoke", JSON.parse(dailydata_stoke), document.getElementsByClassName("lon_stoke"), document.getElementsByClassName("lat_stoke"));
var coordLondon = new CoordinateLabel();
coordLondon.initialize("London", JSON.parse(dailydata_london), document.getElementsByClassName("lon_london"), document.getElementsByClassName("lat_london"));


coordStoke.setColor("lightblue");
coordStoke.setBackgroundColor("darkgray");
coordLondon.setColor("green");
coordLondon.setBackgroundColor("darkgray");


var StokeDataList = new DataList();
StokeDataList.initialize(JSON.parse(forecast_stoke));
var LondonDataList = new DataList();
LondonDataList.initialize(JSON.parse(forecast_london));


var chartWidth = "720px"; var chartHeight = "405px"; var chartBorderWidth = "15px";


function ChartHandler()
{
  this.initialize = function(ctx, chartLabel, dateList, dataList, graphBgCol, graphBorderCol)
  {
    this.chartCtx = ctx;
    this.chartCtx.getContext('2d');
    this.chartCtx.style.width = chartWidth;
    this.chartCtx.style.height = chartHeight;
    this.chartCtx.style.backgroundColor = 'gainsboro';
    this.chartCtx.style.borderStyle = "solid";
    this.chartCtx.style.borderWidth = "10px";
    this.chartCtx.style.borderColor = "black";

    this.chart = new Chart(this.chartCtx,
      {
        type:"line",
        data:{
          labels: dateList,
          datasets: [
            {
              label: chartLabel,
              backgroundColor: graphBgCol,
              borderColor: graphBorderCol,
              fill: false,
              data: dataList,
            },
          ]
        }
      });
  }
}



var temperatureChartStoke = new ChartHandler();
temperatureChartStoke.initialize(document.getElementById('TemperatureChartStoke'), "Temperature",
                StokeDataList.DateList, StokeDataList.TemperatureList, "lightblue", "blue");


var windChartStoke = new ChartHandler();
windChartStoke.initialize(document.getElementById('WindChartStoke'), "Wind",
                StokeDataList.DateList, StokeDataList.WindList, "pink", "red");

var humidityChartStoke = new ChartHandler();
humidityChartStoke.initialize(document.getElementById('HumidityChartStoke'), "Humidity",
                StokeDataList.DateList, StokeDataList.HumidityList, "skyblue", "cyan");


function changeToBar(callingElement)
{
  // Calling element is the button, and the id is that of the button
  var element = document.getElementById(callingElement.id);
  var elementIdAsString = element.id.toLowerCase();

  switch(elementIdAsString)
  {
    case "temperaturechartstoke":
        if (temperatureChartStoke.chart.config.type == "line")
        {
          temperatureChartStoke.chart.config.type = "bar";
        }
        else
        {
          temperatureChartStoke.chart.config.type = "line";
        }
        temperatureChartStoke.chart.update();
        break;

      case "windchartstoke":
        if (windChartStoke.chart.config.type == "line")
        {
          windChartStoke.chart.config.type = "bar";
        }
        else
        {
          windChartStoke.chart.config.type = "line";
        }
        windChartStoke.chart.update();
        break;

        case "humiditychartstoke":
          if (humidityChartStoke.chart.config.type == "line")
        {
          humidityChartStoke.chart.config.type = "bar";
        }
        else
        {
          humidityChartStoke.chart.config.type = "line";
        }
        humidityChartStoke.chart.update();
        break;
    }
}


function changeColor(callingElement, color)
{
  var element = document.getElementById(callingElement.id);
  var elementIdAsString = element.id.toLowerCase();

  switch(elementIdAsString)
  {
    case "temperaturechartstoke":
      if (color == temperatureChartStoke.chart.data.datasets[0].backgroundColor)
      {
        temperatureChartStoke.chart.data.datasets[0].backgroundColor = "lightblue";
        // temperatureChartStoke.chart.data.datasets[0].borderColor = "blue";
      }
      else
      {
        temperatureChartStoke.chart.data.datasets[0].backgroundColor = color;
      }
      temperatureChartStoke.chart.update();
      break;
    
    case "windchartstoke":
      if (color == windChartStoke.chart.data.datasets[0].backgroundColor)
      {
        windChartStoke.chart.data.datasets[0].backgroundColor = "pink";
        // windChartStoke.chart.data.datasets[0].borderColor = "red";
      }
      else
      {
        windChartStoke.chart.data.datasets[0].backgroundColor = color;
      }
      windChartStoke.chart.update();
      break;

      case "humiditychartstoke":
        if (color == humidityChartStoke.chart.data.datasets[0].backgroundColor)
        {
          humidityChartStoke.chart.data.datasets[0].backgroundColor = "skyblue";
          // humidityChartStoke.chart.data.datasets[0].borderColor = "cyan";
        }
        else
        {
          humidityChartStoke.chart.data.datasets[0].backgroundColor = color;
        }
        humidityChartStoke.chart.update();
        break;
  }
}
