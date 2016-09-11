Fons.loadChartProjectsVSMoneyGeneral = function() {
    Fons.showProjectsVSMoneyGeneral();
};

Fons.showProjectsVSMoneyGeneral = function() {
    var projectsVSMoney = { anys: [], pressuposts: [], projectes: [] };
    var aportacionsFonsMap = {};
    var nProjectesFonsMap = {};

    for( var nProjecte in Fons.projectes ){
        var projecte = Fons.projectes[nProjecte];
        aportacionsFonsMap[projecte.anyAplicableAportacioFons] = ( aportacionsFonsMap[projecte.anyAplicableAportacioFons] !== undefined ) ? aportacionsFonsMap[projecte.anyAplicableAportacioFons]+projecte.aportacioDelFons : projecte.aportacioDelFons
        nProjectesFonsMap[projecte.anyAplicableAportacioFons] = ( nProjectesFonsMap[projecte.anyAplicableAportacioFons] !== undefined ) ? nProjectesFonsMap[projecte.anyAplicableAportacioFons]+1 : 1
    }

    for( var any = 2010; any <= 2014; any++){
        projectsVSMoney.anys.push( any );
        projectsVSMoney.pressuposts.push( parseFloat( aportacionsFonsMap[any].toFixed(2) ) );
        projectsVSMoney.projectes.push( nProjectesFonsMap[any] );
    }

    Fons.printChartProjectsVSMoneyGeneral( projectsVSMoney );
};

Fons.printChartProjectsVSMoneyGeneral = function( projectsVSMoney ) {
    $( '.graphic-1' ).highcharts( {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        xAxis: [ {
            categories: projectsVSMoney.anys
        } ],
        yAxis: [ { // Primary yAxis
            labels: {
                format: '{value:,.0f} €',
                style: {
                    color: Highcharts.getOptions().colors[ 1 ]
                }
            },
            title: {
                text: 'Pressupost',
                style: {
                    color: Highcharts.getOptions().colors[ 1 ]
                }
            },
            min: 0,
            opposite: true

        }, { // Secondary yAxis
            title: {
                text: 'Projectes',
                style: {
                    color: Highcharts.getOptions().colors[ 1 ]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[ 0 ]
                }
            },
            min: 0
        } ],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 2000
                }
            }
        },
        series: [ {
            name: 'Pressupost',
            type: 'spline',
            yAxis: 0,
            data: projectsVSMoney.pressuposts,
            tooltip: {
                format: '{value:,.2f}',
                valueSuffix: ' €'
            },
            color: '#20325a'

        }, {
            name: 'Projectes',
            type: 'spline',
            yAxis: 1,
            data: projectsVSMoney.projectes,
            color: '#4C76D5'
        } ],
        credits: false
    } );
};

Fons.printChartProjectsByYearGeneral = function() {
    var anys = [];
    var tipusList = [[],[],[],[]];

    for( var any = 2010; any <= 2014; any++){
        anys.push( any );
        tipusList[0].push( Fons.tipusProjectes[1].anys[any] ? Fons.tipusProjectes[1].anys[any] : 0 );
        tipusList[1].push( Fons.tipusProjectes[2].anys[any] ? Fons.tipusProjectes[2].anys[any] : 0 );
        tipusList[2].push( Fons.tipusProjectes[3].anys[any] ? Fons.tipusProjectes[3].anys[any] : 0 );
        tipusList[3].push( Fons.tipusProjectes[4].anys[any] ? Fons.tipusProjectes[4].anys[any] : 0 );
    }

    $( '.graphic-2' ).highcharts( {
        chart: {
            zoomType: 'xy',
            backgroundColor: '#20325a'
        },
        style: {
            color:'#ffffff'
        },
        title: {
            text: ''
        },
        xAxis: [ {
            categories: anys,
            labels: {
                format: '{value:,.0f}',
                style: {
                    color: '#ffffff'
                }
            },
            gridLineColor: '#314c89'
        } ],
        yAxis: [ { // Primary yAxis
            labels: {
                format: '{value:,.0f}',
                style: {
                    color: '#ffffff'
                }
            },
            title: {
                text: 'Projectes',
                style: {
                    color: '#ffffff'
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#314c89'
            }],
            min: 0,
            gridLineColor: '#314c89'

        } ],
        tooltip: {
            shared: true
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 2000
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: '#ffffff'
            },
            itemHoverStyle: {
                color: '#314c89'
            },
            itemHiddenStyle: {
                color: '#314c89'
            }
        },
        series: [ {
            name: 'Enfortiment Institucional',
            type: 'spline',
            yAxis: 0,
            data: tipusList[0],
            color: '#0091F2'
        },{
            name: 'Empoderament',
            type: 'spline',
            yAxis: 0,
            data: tipusList[1],
            color: '#DED23B'
        },{
            name: 'Infraestructures',
            type: 'spline',
            yAxis: 0,
            data: tipusList[2],
            color: '#C75244'
        },{
            name: 'Dret Humà',
            type: 'spline',
            yAxis: 0,
            data: tipusList[3],
            color:'#7DA633'
        } ],
        credits: false
    } );
};