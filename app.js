function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        // Use d3 to serevt the panel #sample-metadata from html
        var PANEL = d3.select("#sample-metadata")
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}:${value}`);
        });
    });
}

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [{
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: barData,
            orientation: "h",
        }]
        var barLayout = {
            title: "Top bacteria present",
            margin: { t: 30, l: 150 }
        }
        Plotly.newPlot("bar", barData);
    });
}


function init() {
    var selector = d3.select("#selDataset")
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample)
        });
        var firstSample = sampleNames[0]
        buildCharts(firstSample);
        buildMetadata(firstSample);
    })
}
init();