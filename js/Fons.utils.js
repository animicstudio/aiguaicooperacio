FonsUtils = {};
FonsUtils.parseFloat = function( number ) {
    if( parseFloat( number.replace( ".", "" ).replace( ",", "." ) ) ){
        number = parseFloat( number.replace( ".", "" ).replace( ",", "." ) );
    }
    else{
        number = 0;
    }
    return number;
};

/**
 * Sets the format to the numbers
 * @param str
 * @param nDecimals
 * @returns {string}
 */
FonsUtils.formatNumber = function(str,nDecimals) {
    if( nDecimals != undefined ){
        str = parseFloat( str ).toFixed( nDecimals )
    }
    str += '';
    var x = str.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
};



Fons.loadCookiePolicy = function(){
    Fons.sentGA = false;
    $.cookieBar({
        fixed: true,
        bottom: true,
        message: "Utilitzem galletes per mijorar la experencie dels nostres usuaris. Si continua navegant, considerem que accepta el seu us.",
        acceptText: "Accepto",
        policyButton: true,
        policyText: 'Llegir més',
        policyURL: '/politica-privacitat.html',
        acceptOnScroll: true,
        acceptAnyClick: true
    });
    if(jQuery.cookieBar('cookies')){
        Fons.activaGA();
    }
};

Fons.activaGA = function(){
    if( !Fons.sentGA ){
        Fons.sentGA = true;
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-71458512-1', 'auto');
        ga('send', 'pageview');
    }
};