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

class BubbleChart {
    constructor() {
        this.diameter = 700;
    }

    drawChart(data, jsdom, divID) {
        const el = jsdom.window.document.querySelector("#" + divID);
        el.innerHTML = "";

        const dataset = {"children":data};

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        
        const bubble = d3.pack(dataset)
            .size([this.diameter, this.diameter])
            .padding(1.5);
        
        const svg = d3.select(el)
            .append("svg")
            .attr("width", this.diameter)
            .attr("height", this.diameter)
            .attr("class", "bubble");

        const nodes = d3.hierarchy(dataset)
            .sum((d) =>  { return d.value; });

        const node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        
        node.append("title")
            .text(function(d) {
                return d.key + ": " + d.value;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            });
        
        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.key.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        return jsdom;
    }
}

module.exports = BubbleChart;
