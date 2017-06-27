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

$( document ).ready(function() {
    console.log( "ready!" );
});

$(function () {
    //to load all the images from the folder

    var parentFolder = "/../images/products/";

    var fileExtension = /\.(jpe?g|png|gif)$/;

    //var productFolders = ["RUBBER_MOULDED_PARTS", "SS_FASTENERS", "SS_PIPE_FITTINGS"];
    var productFolders = ["SS_FASTENERS"];

    if ($('#product_carousel').length == 1) {

        console.log('index page');
        var k = 0;

        productFolders.forEach(function (productFolder) {
            var currentFolder = parentFolder + productFolder;

            var count = 0;
            var thumbnailbody;
            var thumbnailHeader = "<div class='item'>" +
                "<div class='row'>";

            var thumbnailFooter = "</div>" +
                "</div>";

            $.get(currentFolder).then(function (data) {


                $(data).find("a").attr("href", function (i, val) {
                    //console.log(i);


                    if (val.match(fileExtension)) {
                        thumbnailbody += "<div class='col-md-3'><a href='#' class='thumbnail'><img src='" + val + "' alt='Image'></a></div>";

                        //if (count < 4) {
                        //    count++;
                        //} else {
                            $('#product_carousel > .carousel-inner').delay( 10000 ).append("<div class='item'><div class='row'> "+thumbnailbody+" </div></div>");
                        //    console.log('here');
                        //    thumbnailbody = null;
                        //    k++;
                        //    count = 0;
                        //}
                    }

                });

            });


        });

    }

    if ($('#collapseOne').length == 1) {


        //prepare the default insert for the thumbnail div

        productFolders.forEach(function (productFolder) {
            var currentFolder = parentFolder + productFolder;

            $.get(currentFolder).then(function (data) {

                $(data).find("a").attr("href", function (i, val) {
                    if (val.match(fileExtension)) {
                        var thumbnailBody = "<div class='col-md-4'> " +
                            "<div class='thumbnail'>" +
                            "<div class='products-image'>" +
                            "<img id ='" + productFolder + '-' + i + "' class='products-image' src='" + val + "'>" +
                            "</div> " +
                            "<div class='text-center'>" +
                            "<a id='sendInquiry' class='btn btn-primary' data-toggle='modal' data-target='.modal'>Send Inquiry</a>" +
                            "</div>" +
                            "</div>" +
                            "</div>";

                        if (productFolder == "SS_FASTENERS") {
                            $('#collapseOne .row').append(thumbnailBody);
                        } else if (productFolder == "SS_PIPE_FITTINGS") {
                            $('#collapseThree .row').append(thumbnailBody);
                        } else if (productFolder == "RUBBER_MOULDED_PARTS") {
                            $('#collapseFour .row').append(thumbnailBody);
                        }

                        //$("body").append("<img src='" + val + "'>"); //we need just href from data
                    }
                });
            });
        });
    }



    /* $.ajax({
         url: "/../images/",
         success: function (data) {
             $(data).find("a:contains(.png)").each(function () {
                 // will loop through 
                 var images = $(this).attr("href");
 
                 $('<p></p>').html(images).appendTo('#collapseOne');
 
             });
         }
     }); */

    /*  
  
  
  
  
          $.ajax({
              url: currentFolder,
              success: function (data) {
                  $.each(data, function (i, val) {
                      var htmlContent = "<div class='thumbnail'><div class='products-image'> <a href='#'> <img class='products-image' src='"+ currentFolder + val +"' alt='61'>" +
                                          + "</div>  <div class='caption'> <p class'text-center'> Product 1 Description </p> </div> </a> </div> </div>"
  
                      console.log(i);
                      if (val.match(/\.(jpe?g|png|gif)$/)) {
                          $("#collapseOne .row").append("");
  
                      } 
                  });
              }
          });
  
      }); */

});

