Fons = {
    projectes: [],
    selectedProjects: [],
    municipis: {},
    tipusProjectes: [ {
        nom: "TOTS",
        projectes: [],
        anys: {}
    }, {
        nom: "ENFORTIMENT_INSTITUCIONAL",
        projectes: [],
        anys: {}
    }, {
        nom: "EMPODERAMENT",
        projectes: [],
        anys: {}
    }, {
        nom: "INFRAESTRUCTURES",
        projectes: [],
        anys: {}
    }, {
        nom: "DRET_HUMA",
        projectes: [],
        anys: {}
    }
    ],
    markers: []
};

Fons.init = function() {
    Fons.loadProjectes();
    Fons.video();
};

Fons.afterLoad = function() {
    google.maps.event.addDomListener(window, 'load', Fons.initializeMap());
    Fons.loadChartProjectsVSMoneyGeneral();
    Fons.printChartProjectsByYearGeneral();
    Fons.loadMunicipisSpreadsheet();
    Fons.loadContactMap();
    Fons.loadCookiePolicy();
};