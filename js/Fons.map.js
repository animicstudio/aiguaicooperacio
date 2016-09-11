Fons.initializeMap = function(){

    var mapProp = {
        center:{ lat: 25, lng: 2 },
        zoom:3,
        mapTypeId:google.maps.MapTypeId.SATELLITE,
        mapTypeControl: false,
        streetViewControl: false,
        scrollwheel: false
    };
    Fons.map=new google.maps.Map(document.getElementById("map"),mapProp);
    var heightToRest = $('.container-projectes').height() + $('.input-municipalities').height() + 50;
    var windowHeight = window.innerHeight;
    $('.map-container').height(windowHeight - heightToRest);
    Fons.loadMapMarkers();
    Fons._addMapEvents();
};

Fons.loadMapMarkers = function(){
    var infowindow = new google.maps.InfoWindow();

    for( var pos = 0; pos < Fons.selectedProjects.length; pos++ ) {
        var projecte = Fons.projectes[ Fons.selectedProjects[pos] ];
        Fons._createMarker( projecte, infowindow );
    }
};

Fons._createMarker = function( projecte, infowindow ) {

    var marker = new google.maps.Marker( {
        position: { lat: projecte.latitud, lng: projecte.longitud },
        map: Fons.map,
        title: projecte.nom,
        animation: google.maps.Animation.DROP
    } );

    marker.setIcon('./img/marker.svg');
    Fons.markers.push( marker );

    marker.addListener('click', function() {
        infowindow.setContent( Fons._createInfoWindowContent( projecte ) );
        infowindow.open(Fons.map, marker);
    });
    
};

Fons._clearMarkers = function(){
    for( var pos = 0; pos < Fons.markers.length; pos++ ) {
        Fons.markers[pos].setMap( null );
    }
};

Fons._createInfoWindowContent = function( projecte ){
    var template = $('#modalInfoWindow').html();
    var content = Mustache.to_html(template, Fons.projecteToTemplateObject(projecte));
    return content;
};

$('#mapaModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var idProjecte = button.data('id'); // Extract info from data-* attributes
    var projecte = Fons.projectes[idProjecte];
    var modal = $(this);
    modal.find('.modal-title').text( projecte.nom );
    var template = $('#modalBodyTemplate').html();
    var render = Mustache.to_html(template, Fons.projecteToTemplateObject(projecte));
    modal.find('.modal-body').html( render );
});

Fons.projecteToTemplateObject = function( projecte ){
    var vars = {};
    vars.id = projecte.id;
    vars.urlPhoto = '<img src="img/projectes/' + projecte.id + '.jpg" width="100" >';
    vars.pais = projecte.pais;
    vars.zona = projecte.regio;
    vars.nom = projecte.nom;

    var anysAportacio = [];
    for( var any in projecte.anys ){
        anysAportacio.push( any + " - " + FonsUtils.formatNumber( projecte.anys[any], 2 ) + " €" );
    }
    vars.anysAportacio = anysAportacio;

    vars.municipis = projecte.municipis.join( ", " );
    vars.entitat = projecte.entitatExecutora;
    vars.contrapart = projecte.contrapart;
    vars.execucio = projecte.anyExecucio;
    vars.sinopsis = projecte.sinopsis;

    return vars;
};

Fons.updateMapSelectedProjects = function(){
    Fons._clearMarkers();
    Fons.loadMapMarkers();
};

Fons.loadContactMap = function(){
    var myLatLng = {lat: 41.377422, lng: 2.176518};

    var contactMap = new google.maps.Map(document.getElementById('contact-map'), {
        zoom: 16,
        scrollwheel: false,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: contactMap,
        title: 'Fons Català de Cooperació al Desenvolupament - Rambla de Santa Mónica, 10'
    });

    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent( "<b>Fons Català de Cooperació al Desenvolupament</b><br>Rambla de Santa Mónica, 10, Barcelona" );
    infowindow.open(Fons.map, marker);
};