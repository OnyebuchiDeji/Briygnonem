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
    this.previousBgCol = graphBgCol;

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

var chartsArray = new Array();

chartsArray.push(new ChartHandler());
chartsArray[0].initialize(document.getElementById('TemperatureChartStoke'), "Temperature",
                StokeDataList.DateList, StokeDataList.TemperatureList, "lightblue", "blue");


chartsArray.push(new ChartHandler());
chartsArray[1].initialize(document.getElementById('WindChartStoke'), "Wind",
                StokeDataList.DateList, StokeDataList.WindList, "pink", "red");

chartsArray.push(new ChartHandler());
chartsArray[2].initialize(document.getElementById('HumidityChartStoke'), "Humidity",
                StokeDataList.DateList, StokeDataList.HumidityList, "skyblue", "cyan");


function changeToBar(callingElement)
{
  // Calling element is the button, and the id is that of the button
  var element = document.getElementById(callingElement.id);
  var elementIdAsString = element.id.toLowerCase();

  for (i=0; i < chartsArray.length; i++)
  {
      chartId = (chartsArray[i].chartCtx.id).toLowerCase();
      /*  If the calling element's id(the button's id) match the 
          chart id, then change the type.
          This prevents it from changing the types of all the chart items...
          by making sure a button item has called it. That is why the button's id is matched to its
      */
      if (chartId === elementIdAsString)
      {
          if (chartsArray[i].chart.config.type == "line")
          {
              chartsArray[i].chart.config.type = "bar";
          }
          else
          {
              chartsArray[i].chart.config.type = "line";
          }
          chartsArray[i].chart.update();
      }
  }
}


function changeColor(callingElement, color)
{
  var element = document.getElementById(callingElement.id);
  var elementIdAsString = element.id.toLowerCase();

  for (i=0; i<chartsArray.length; i++)
  {
      chartId = (chartsArray[i].chartCtx.id).toLowerCase();
      if (chartId === elementIdAsString)
      {
          /*This if statement enables me to switch back the background colors after they are changed*/
          if (color == chartsArray[i].chart.data.datasets[0].backgroundColor)
          {
            chartsArray[i].chart.data.datasets[0].backgroundColor = chartsArray[i].previousBgCol;
          //   The borderColour does not change and so does not need to be set, and the barchart only uses background color
          //   temperatureChartStoke.data.datasets[0].borderColor = "blue";
          }
          else
          {
              chartsArray[i].chart.data.datasets[0].backgroundColor = color;
          }
          
          chartsArray[i].chart.update();
      }
  }
}


