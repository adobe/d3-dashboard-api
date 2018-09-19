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

const superagent = require('superagent');
const bulk = require('bulk-require');

// browserify does not not load dynamic requires - so loading all js files during compilation
const requires = bulk(__dirname, ['../public/js/*.js'])['..'];

class ReportsRanked {
    constructor() {
        this.data = [];
    }

    //post request to fetch data
    apiRequest(accessToken, chartDetails) {
        var rows_dict = {};

        // json body that is to be sent with API request
        const json_body = {
            "rsid": chartDetails.api.rsid,
            "dimension": chartDetails.api.dimension,
            "globalFilters":chartDetails.api.globalFilters,
            "metricContainer": {
              "metrics": chartDetails.api.metrics
            },
        };

        return new Promise(resolve => {
            superagent.post(chartDetails.url + chartDetails.api["end-point"])
                .send(json_body) //sends JSON POST body
                .set({
                    "Authorization": 'Bearer ' + accessToken, //headers
                    "x-proxy-company": chartDetails.company,
                    "Content-Type": chartDetails.contentType
                })
                .then((res) => {
                    const re = /^([a-z]+)[\s,;:]+([a-z]+)/i;
                    res["body"]["rows"].forEach(row => {
                        //striping key version numbers from the name string
                        var extracted_string = re.exec(row["value"]);
                        var key = extracted_string != null ? extracted_string[1] + " " + extracted_string[2] : row["value"];
                        key = key.replace(/\d+/g, '').replace(new RegExp("\\.", "g"), "");

                        if (rows_dict.hasOwnProperty(key)) {
                            rows_dict[key] += parseInt(row["data"][0]);
                        } else if (key != "None") {
                            rows_dict[key] = parseInt(row["data"][0]);
                        }
                    });

                    //converting to required format for D3 charts
                    for (let k in rows_dict) {
                        this.data.push({key : k, value : rows_dict[k]});
                    }
                    resolve(this.data.slice(0,5));
                })
                .catch((err) => {
                    throw err;
                });
        });
    }

    //async function that fetches the data and sends to chart file
    async getData(jsdom, accessToken, chartDetails) {
        const result = await this.apiRequest(accessToken, chartDetails);
        //const chartAPI = require('../public/js/' + chartDetails.class);
        const chartAPI = requires.public.js[chartDetails.class]
        const chartAPIObject = new chartAPI();
        const new_jsdom = chartAPIObject.drawChart(result, jsdom, chartDetails.id); 
        return new_jsdom;
    }
}

module.exports = ReportsRanked;
