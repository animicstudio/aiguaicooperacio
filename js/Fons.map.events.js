Fons._addMapEvents = function(){
    jQuery(document).on('touchstart click', '.mapFilter',function() {
        Fons.updateSelectedProjectesByType( this.dataset.mapFilter );
        $('.mapFilter').removeClass('active');
        $(this).addClass('active');
        $('.typeahead').val('');
    });
};