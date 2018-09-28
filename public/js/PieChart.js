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

class PieChart { 
    constructor() {
        this.margin = {top: 20, right: 20, bottom: 30, left: 80};
        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 540 - this.margin.top - this.margin.bottom;
    }

    drawChart (data, jsdom, divID) {
        const el = jsdom.window.document.querySelector("#" + divID);
        el.innerHTML = "";

        const svg = d3.select(el)
                    .append("svg")
                    .attr('width', this.width)
                    .attr('height', this.height),
            radius = Math.min(this.width, this.height) / 2,
            g = svg.append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
        
        const color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        const pie = d3.pie()
            .sort(null)
            .value((d)  => { return d.value; });

        const path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        data.forEach((d) => {
                d.value = +d.value;
        });

        const arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", (d) => { return color(d.data.key); });

        arc.append("text")
            .attr("transform", (d) => { return "translate(" + label.centroid(d) + ")"; })
            .attr("dy", "0.35em")
            .text(function(d) { return d.data.key; });

        return jsdom

    }
}

module.exports = PieChart;
