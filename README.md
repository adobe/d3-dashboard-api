# d3-dashboard-api
JavaScript library that bundles Adobe analytics APIs and D3 visualizations. You can use this module to create custom visualizations with Adobe Analytics data on third-party websites in a matter of minutes. 

## Goals
Make it easier for developers to create their own visualization using D3 and Adobe Analytics APIs. This library should allow developers to easily create their own D3 charts with Adobe Analytics data with just an API call.

## Index
1) [Steps to run](#Steps)
2) [Code Sample](#SampleCode)
3) [Charts Available](#ChartsAvailable)
4) [Contributing](#Contributing)
   - [Steps to add a D3 chart](#AddChart)
   - [Steps to add an Adobe Anlytics API](#AddAPI)
   - [Build it](#Build)
5) [License](#License)

## <a name="Steps"> Steps to run: </a>
  1) On [Adobe I/O Console](https://console.adobe.io) [create an Integration](https://github.com/adobe/d3-dashboard-api/wiki/Create-Integration-on-Adobe-I-O-Console)
  2) Use `Cleint ID` and `Cleint Secret` to generate an access token. [Postman (OAuth2.0)](https://www.getpostman.com/docs/v6/postman/sending_api_requests/authorization) or [Adobe I/O Playground](https://runtime.adobe.io/api/v1/web/io-solutions/adobe-oauth-playground/oauth.html) can be used.      
  Anlytics Scopes: **openid,AdobeID,read_organizations,additional_info.projectedProductContext,additional_info.job_function**  
  3) Load d3-dashboard-api.min.js from this repo in your html file.       
  4) Create three variables - query, file, company, accessToken:         
      - query : dictionary of dictionaries with chart details(html div id and type of chart) and api configuration(filters, dimensions etc.)   
      - company : org's name for e.g. adobe-io-solutions-demo    
      - accessToken : Token from step 1      
     [Refer sample code](#SampleCode)
<<<<<<< HEAD
  4) In the HTML file add D3 CDN and create the divs with IDs mentioned in query.chart.id
  5) Call `dashboard(query, company, accessToken);` -  this will fetch data and create a svg div with visualization, just add it to the div you want.
=======
  5) In the HTML file create the divs with IDs mentioned in query.chart.id
  6) Call `dashboard(query, company, accessToken);` -  this will fetch data and create a svg div with visualization, just add it to the div you want.
>>>>>>> 548bbfda16fd5e6b6e89f0533f26da33c6142c17

## <a name="ChartsAvailable"> Charts Available: </a>
  1) Bubble Chart - type : 'bubble' (name to be mentioned in query.chart.type)
  2) Bar Chart - type : 'bar'
  3) Pie Chart - type : 'pie'


## <a name="SampleCode"> Code Sample </a>
  ### sample.js
   ```
    const accessToken = '< ACCESS_TOKEN >'; //token from step 1
    const company = '< company_name >'
    
    const query = {
        'chart' : {
            'type' : 'bubble',              // Type of D3 chart
            'id' : 'bubblechart-container'  //HTML div to which chart needs to be rendered
        },
        'api' : {                                   // https://github.com/AdobeDocs/analytics-2.0-apis
                                                    
                'rsid' : ' report-suite-ID',
                'end-point' : '/reports/ranked',
                'dimension' : 'variables/browser',
                'globalFilters' : [
                    {
                    'dateRange' : '2009-06-01T00:00/2018-08-21T00:00',
                    'type' : 'dateRange'
                    }
                ],
                'metrics' : [
                    {
                    'columnId' : 'visits',
                    'id' : 'metrics/visits'
                    }
                ]       
        }
    };

    const html = dashboard(query, company, accessToken);
    html.then((res) => {
        $('#' + query.chart.id).append(res);
    });
  ```

  ### sample.html
  ```
  <html>
    <head>
      <meta charset="utf-8"/>
      <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
      <script src="https://d3js.org/d3.v4.min.js"></script>
      <script src="./d3-dashboard-api.min.js"></script>
      <script src="./sample.js"></script>
    </head>
    <body>
      <p>Welcome to new Dashbaord</p>
      <div id="bubblechart-container"></div>
      <div id="barchart-container"></div>
      <div id="piechart-container"></div>
    </body>
   </html>
   ```

## <a name="Contributing"> Contributing: </a>
If you would like to contribute to this project in the form of filing issues, fixing bugs and creating pull requests. Please follow [this](https://github.com/adobe/d3-dashboard-api/blob/master/CONTRIBUTING.md) document. Please also check our [code of conduct](https://github.com/adobe/d3-dashboard-api/blob/master/CODE_OF_CONDUCT.md)   
### <a name="AddChart"> Steps to add a chart: </a>
  
  1) Clone this repository
  2) Run `npm install`
  3) Add a chart class(in a js file) to [/public/js/](https://github.com/adobe/d3-dashboard-api/tree/master/public/js). 
  4) Associate your chart class name with it's repective file name inside chartMapping dictionary [/configs/mapping.js](https://github.com/adobe/d3-dashboard-api/blob/master/configs/mapping.js)
  5) [Build it](#Build)
  
### <a name="AddAPI"> Steps to add an Adobe Anlytics API: </a>

  1) Clone this repository
  2) Run `npm install`
  3) Add an API class(in a js file) to [/utils/](https://github.com/adobe/d3-dashboard-api/tree/master/utils). 
  4) Associate your API class name with it's repective file name inside apiMapping dictionary [/configs/mapping.js](https://github.com/adobe/d3-dashboard-api/blob/master/configs/mapping.js)
  5) [Build it](#Build)
  
### <a name="Build"> Build It: </a>
  1) Run command `npm run build`


## <a name="License"> License: </a>

Licensed under [Apache-2](https://github.com/adobe/d3-dashboard-api/blob/master/LICENSE)

