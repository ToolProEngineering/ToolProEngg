function addUser() {

    window.location.href = '/customers/add';
}
function cancelAdd() {

    window.location.href = '/customers';
}
function addEmployers() {
    window.location.href = "/employers/add"
}
function cancelEmployers() {

    window.location.href = '/employers';
}


$(document).ready(function() {

    $('#collapseOne').prev().find('a')[0].click();
    
    function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }
 
    $('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
 
        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
            close_accordion_section();
 
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
 
        e.preventDefault();
    });

});

$(function () {

        $("#accordion").show().accordion({
        active: false,
        collapsible: true
    });

    var $myGroup = $('#accordion');
       $('#accordion h4').click(function() {
           console.log('here');
    $myGroup.find('.collapse.in').collapse('hide');
});

    
    //to load all the images from the folder

    //var productFolders = ["SS_FASTENERS"];

    if ($('#collapseOne').length == 1) {

        $('#collapseOne .row').html('');
        $('#collapseTwo .row').html('');
        $('#collapseThree .row').html('');
        //prepare the default insert for the thumbnail div
        var parentFolder = "/../images/products/";

        var fileExtension = /\.(jpe?g|png|gif)$/;

        var productFolders = ["RUBBER_MOULDED_PARTS", "SS_FASTENERS", "SS_PIPE_FITTINGS"];

        productFolders.forEach(function (productFolder) {
            var currentFolder = parentFolder + productFolder;
            

            $.get(currentFolder).then(function (data) {

                $(data).find("a").attr("href", function (i, val) {
                    
                    if (val.match(fileExtension)) {
                        var thumbnailBody = "<div class='col-md-3'> " +
                            "<div class='thumbnail'>" +
                            "<div class='products-image'>" +
                            "<img id ='" + productFolder + '-' + i + "' class='products-image' src='" + val + "'>" +
                            "</div> " +
                           /* "<div class='text-center'>" +
                            "<a id='sendInquiry' class='btn btn-primary' data-toggle='modal' data-target='.modal'>Send Inquiry</a>" +
                            "</div>" + */
                            "</div>" +
                            "</div>";

                        if (productFolder == "SS_FASTENERS") {
                            $('#collapseOne .row').append(thumbnailBody);
                        } else if (productFolder == "SS_PIPE_FITTINGS") {
                            $('#collapseTwo .row').append(thumbnailBody);
                        } else if (productFolder == "RUBBER_MOULDED_PARTS") {
                            $('#collapseThree .row').append(thumbnailBody);
                        }

                        //$("body").append("<img src='" + val + "'>"); //we need just href from data
                    }
                });
            });
        });
    }

});

