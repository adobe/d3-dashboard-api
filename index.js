/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const JSDOM = require("jsdom").JSDOM;
const bulk = require('bulk-require');

const AdobeAPIConfig = require('./configs/adobe_configs').ADOBE_API_CONFIG;
const mapping = require('./configs/mapping');

// browserify does not not load dynamic requires - so loading all js files during compilation
const requires = bulk(__dirname, ['./utils/*.js']);

async function dashboard(query, company, accessToken) {
    try {
        // login routing - returns access token after authentication
        //let accessToken = await require('./routes/auth/index')(app);
        //let htmlStub = await fs.readFile(file);
        var jsdom = new JSDOM('<div id=' + query.chart.id + '></div>' );
        
        let chartDetails = {
            'id' : query.chart.id,
            'class' : mapping.chartMapping[query.chart.type],
            'api' : query.api,
            'url': AdobeAPIConfig.url,
            'company': company,
            'contentType': AdobeAPIConfig.contentType,
        };

        let api = mapping.apiMapping[query.api["end-point"]];
        //let apiRequestFile = require('./utils/ReportsRanked');
        //let apiRequestFile = require('./utils/' + api);
        let apiRequestFile = requires.utils[api];
        let apiRequestService = new apiRequestFile();
        jsdom = await apiRequestService.getData(jsdom, accessToken, chartDetails);
        
        //await fs.writeFile(file, jsdom.serialize());

        // return the div with svg inserted
        // TODO: Better way of extracting the div from JSDOM
        const div = jsdom.window.document.querySelector("#" + query.chart.id).innerHTML
        return div;

    } catch (err) {
        console.error(err);
    }
}

module.exports = dashboard;
