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

class BarChart {
    constructor() {
        this.margin = {top: 20, right: 20, bottom: 30, left: 80};
        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    } 

    drawChart (data, jsdom, divID) {
        const el = jsdom.window.document.querySelector("#" + divID);
        el.innerHTML = "";

        const x = d3.scaleBand()
          .rangeRound([0, this.width])
          .padding(0.1);
        const y = d3.scaleLinear()
          .rangeRound([this.height, 0]);

        const svg = d3.select(el)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
                .attr("transform", 
                    "translate(" + this.margin.left + "," + this.margin.top + ")");

        data.forEach((d) => {
            d.value = +d.value;
        });

        // Scale the range of the data in the domains
        x.domain(data.map((d) => { return d.key; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);

          // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => { return x(d.key); })
            .attr("width", x.bandwidth())
            .attr("y", (d) => { return y(d.value); })
            .attr("height", (d) => { return this.height - y(d.value); })
            .style("fill", "steelblue");

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        return jsdom
    }
}

module.exports = BarChart;
