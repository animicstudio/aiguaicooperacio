Fons.saveMunicipis = function() {
    for( var nProjecte = 0; nProjecte < Fons.projectes.length; nProjecte++ ) {
        var projecte = Fons.projectes[ nProjecte ];
        for( var nMunicipi = 0; nMunicipi < projecte.municipis.length; nMunicipi++ ) {
            var nombreMunicipi = projecte.municipis[ nMunicipi ];
            if( !Fons.municipis[ nombreMunicipi ] ) {
                Fons.municipis[ nombreMunicipi ] = [];
            }
            Fons.municipis[ nombreMunicipi ].push( nProjecte );
        }
    }
};