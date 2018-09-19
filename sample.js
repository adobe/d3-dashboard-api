const accessToken = '< ACCESS_TOKEN >'; //token from step 1
const company = 'adobe-io-solutions-demo';

const query = {
    'chart' : {
        'type' : 'bubble',
        'id' : 'bubblechart-container'
    },
    'api' : {
            'rsid' : 'bgeo1xxpnwcidadobeisoldemo',
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
