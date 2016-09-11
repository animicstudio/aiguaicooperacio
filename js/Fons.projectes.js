Fons.loadProjectes = function() {
    var query = new google.visualization.Query( "https://docs.google.com/spreadsheets/d/1OjJJh5Q8oSbhCykohPo84mbFOd40FXh2Dc9qy-pdaSU/gviz/tq?gid=0" );
    query.setQuery( 'select *' );
    query.send( Fons.saveProjectes );
};

Fons.saveProjectes = function( response ) {
    var results = response.getDataTable();
    var nProjectes = results.getNumberOfRows();

    //First row is the headers
    for( var nFila = 1; nFila < nProjectes; nFila++ ) {
        var projecte = {};
        projecte.id = Fons.projectes.length;
        projecte.nom = results.getFormattedValue( nFila, 1 );
        projecte.pais = results.getFormattedValue( nFila, 2 );
        projecte.regio = results.getFormattedValue( nFila, 3 );
        projecte.latitud = FonsUtils.parseFloat( results.getFormattedValue( nFila, 4 ) );
        projecte.longitud = FonsUtils.parseFloat( results.getFormattedValue( nFila, 5 ) );
        projecte.aportacio = FonsUtils.parseFloat( results.getFormattedValue( nFila, 6 ) );
        projecte.entitatExecutora = results.getFormattedValue( nFila, 7 );
        projecte.contrapart = results.getFormattedValue( nFila, 8 );
        projecte.sinopsis = results.getFormattedValue( nFila, 9 );
        projecte.foto = results.getFormattedValue( nFila, 10 );
        projecte.anyExecucio = results.getFormattedValue( nFila, 11 );

        Fons._saveProjectPresupostPerAny( projecte, results, nFila );
        Fons._saveTipusProjecte( projecte, results, nFila );

        projecte.municipis = results.getFormattedValue( nFila, 32 ).trim().split( ";" ).filter( Boolean );

        projecte.aportacionsDirectes = results.getFormattedValue( nFila, 33 ) == "x";
        projecte.aportacioDelFons = FonsUtils.parseFloat( results.getFormattedValue( nFila, 34 ), 2 );
        projecte.anyAplicableAportacioFons = parseInt( results.getFormattedValue( nFila, 35 ) );
        Fons.projectes.push( projecte );
        Fons.selectedProjects.push( projecte.id );
    }

    Fons.saveMunicipis();

    Fons.afterLoad();
};

Fons._saveTipusProjecte = function( projecte, results, nFila ) {
    projecte.tipus = [];
    var anys = Object.keys(projecte.anys);

    Fons.tipusProjectes[ 0 ].projectes.push( Fons.projectes.length );
    for( var nAny = 0; nAny < anys.length; nAny++ ){
        if( !Fons.tipusProjectes[ 0 ].anys[anys[nAny]] ){
            Fons.tipusProjectes[ 0 ].anys[anys[nAny]] = 0
        }
        Fons.tipusProjectes[ 0 ].anys[anys[nAny]] += 1;
    }

    if( results.getFormattedValue( nFila, 12 ) == "x" ) {
        projecte.tipus.push( Fons.tipusProjectes[ 1 ].nom );
        Fons.tipusProjectes[ 1 ].projectes.push( Fons.projectes.length );
        for( var nAny = 0; nAny < anys.length; nAny++ ){
            if( !Fons.tipusProjectes[ 1 ].anys[anys[nAny]] ){
                Fons.tipusProjectes[ 1 ].anys[anys[nAny]] = 0
            }
            Fons.tipusProjectes[ 1 ].anys[anys[nAny]] += 1;
        }
    }
    if( results.getFormattedValue( nFila, 13 ) == "x" ) {
        projecte.tipus.push( Fons.tipusProjectes[ 2 ].nom );
        Fons.tipusProjectes[ 2 ].projectes.push( Fons.projectes.length );
        for( var nAny = 0; nAny < anys.length; nAny++ ){
            if( !Fons.tipusProjectes[ 2 ].anys[anys[nAny]] ){
                Fons.tipusProjectes[ 2 ].anys[anys[nAny]] = 0
            }
            Fons.tipusProjectes[ 2 ].anys[anys[nAny]] += 1;
        }
    }
    if( results.getFormattedValue( nFila, 14 ) == "x" ) {
        projecte.tipus.push( Fons.tipusProjectes[ 3 ].nom );
        Fons.tipusProjectes[ 3 ].projectes.push( Fons.projectes.length );
        for( var nAny = 0; nAny < anys.length; nAny++ ){
            if( !Fons.tipusProjectes[ 3 ].anys[anys[nAny]] ){
                Fons.tipusProjectes[ 3 ].anys[anys[nAny]] = 0
            }
            Fons.tipusProjectes[ 3 ].anys[anys[nAny]] += 1;
        }
    }
    if( results.getFormattedValue( nFila, 15 ) == "x" ) {
        projecte.tipus.push( Fons.tipusProjectes[ 4 ].nom );
        Fons.tipusProjectes[ 4 ].projectes.push( Fons.projectes.length );
        for( var nAny = 0; nAny < anys.length; nAny++ ){
            if( !Fons.tipusProjectes[ 4 ].anys[anys[nAny]] ){
                Fons.tipusProjectes[ 4 ].anys[anys[nAny]] = 0
            }
            Fons.tipusProjectes[ 4 ].anys[anys[nAny]] += 1;
        }
    }
};

Fons._saveProjectPresupostPerAny = function( projecte, results, fila ) {
    projecte.anys = {};
    for( var j = 16; j <= 31; j++ ) {
        var any = (2000 + (j - 16));
        var pressupost = FonsUtils.parseFloat( results.getFormattedValue( fila, j ) );
        if( pressupost > 0 ){
            projecte.anys[ any ] = pressupost
        }
    }
};

Fons.updateSelectedProjectesByType = function( type ){
    var pos = 0;
    switch ( type ){
        case "ENFORTIMENT_INSTITUCIONAL":
            pos = 1;
            break;
        case "EMPODERAMENT":
            pos = 2;
            break;
        case "INFRAESTRUCTURES":
            pos = 3;
            break;
        case "DRET_HUMA":
            pos = 4;
            break;
    }

    Fons.selectedProjects = Fons.tipusProjectes[pos].projectes;
    Fons.updateMapSelectedProjects();
};

Fons.updateSelectedProjectesByMunicipality = function( municipality ){
    if( Fons.municipis[municipality] != undefined && Fons.municipis[municipality].length > 0 ){
        Fons.selectedProjects = Fons.municipis[municipality];
    }
    else{
        var modal = $('#errorModal');
        modal.find('.modal-title').text( "Ho sentim. Aquest municipi no te cap projecte en actiu" );
        var template = $('#modalError').html();
        var render = Mustache.to_html(template, { "infoMessage": "En aquesta web es mostra informació dels projectes amb data d'inici entre 2010 i 2014. A continuació es mostraran tots el projectes de la base de dades." });
        modal.find('.modal-body').html( render );
        modal.modal('show');
        Fons.selectedProjects = Fons.tipusProjectes[0].projectes;
    }
    Fons.updateMapSelectedProjects();
};

Fons.loadMunicipisSpreadsheet = function(){
    var query = new google.visualization.Query( "https://docs.google.com/spreadsheets/d/1OjJJh5Q8oSbhCykohPo84mbFOd40FXh2Dc9qy-pdaSU/gviz/tq?gid=1804607748" );
    query.setQuery( 'select *' );
    query.send( Fons.saveAllMunicipis );
};

Fons.saveAllMunicipis = function(response ){
    var results = response.getDataTable();
    var nResults = results.getNumberOfRows();
    for( var i = 1; i < nResults; i++ ) {
        var municipi = results.getFormattedValue( i, 0 );
        if( Fons.municipis[ municipi ] === undefined ){
            Fons.municipis[ municipi ] = [];
        }
    }
    Fons.addAutocomplete();
};