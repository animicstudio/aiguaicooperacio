Fons._substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        matches = matches.slice(0,5).reverse();

        cb(matches);
    };
};

Fons.addAutocomplete = function(){
    municipis = [];
    for( var municipi in Fons.municipis ){
        municipis.push( municipi );
    }

    municipis = municipis.sort(function(a, b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    });

    $('.typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'Municipis',
            source: Fons._substringMatcher(municipis)
    });

    $('.typeahead').bind('typeahead:select', Fons.selectedAutocomplete );
};

Fons.selectedAutocomplete = function( ev, municipality ){
    $('.mapFilter').removeClass('active');
    $(".mapFilter[data-map-filter='ALL']").addClass('active');
    Fons.updateSelectedProjectesByMunicipality( municipality );
};

