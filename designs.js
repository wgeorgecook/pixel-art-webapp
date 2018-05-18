// On submitting a grid size will 
// 0. remove any old grid
// 1. draw the grid
// 2. set the color of a grid cell based on behavior

$(function () {
    // sets the grid
    const sizePicker = document.getElementById('sizePicker');
    sizePicker.addEventListener("submit", function (event) {
        whileRemoveGrid(); // start fresh with a while loop
        makeGrid(); // draw new grid based on user input
        setColor(); // sets the color of grid cell based on behavior 
        event.preventDefault();
        document.getElementById("save").style.visibility = "visible";
        document.getElementById("share").style.visibility = "visible";
    });

    const save = document.getElementById("save");
    save.addEventListener("click", function() {
        savePixelArt();
    });

    const share = document.getElementById("share");
    share.addEventListener("click", function() {
        openGraphShare();
    });

});

function makeGrid() {

    // variables set the values equal to the user input
    
    const table = document.querySelector("table");
    const width = document.getElementById("inputWeight").value;
    const height = document.getElementById("inputHeight").value;


    //debugging
    console.log("Height: "+ height + " Width: "+ width);

    // set rows
    for (c = 0; c < height; c++) {
        table.insertAdjacentHTML('afterbegin', "<tr></tr>");
        //set columns
        for (r = 0; r < width; r++) {
            const tr = document.querySelector("tr");
            tr.insertAdjacentHTML('afterbegin', "<td></td>");
        
        };
    };
};

function removeGrid() {
    // removes the grid for when size changes
    var grid;
    grid = $("table");
    grid.empty();   
};

function whileRemoveGrid() {
    // Critera asks for a while loop
    // so here it is
    var grid, t;
    grid = $("table");
    t = grid.children().length;
    while (t > 0) {
        grid.children().first().remove();
        t --;
    };
};


function getColor() {
    //variables
    var selectColor, currentColor, gridCell;
    selectColor = $("#colorPicker");
    currentColor = selectColor.val();
    return currentColor;
};

function getBgColorHex(elem){
    /*
    Will convert the rgba value from .css('background-color) into hex to 
    compare against $("#colorPicker").val()
    Courtesey shaik from 
    https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
    */
    var color = $(elem).css('background-color')
    var hex;
    if(color.indexOf('#')>-1){
        //for IE
        hex = color;
    } else {
        var rgb = color.match(/\d+/g);
        hex = '#'+ ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2);
    };
    return hex;
};
   


function setColor() {

    var mouseDown;
    mouseDown = false;

    // picks the highlighted cell and sets the color
    // removes the color if already set
    $("td").on("click", function() {
        if ( getColor() != getBgColorHex(this) ) {
            $(this).css("background-color", getColor());   
        } else {
            $(this).css("background-color", "");  
        };  
    });


    // determine if dragging
    $("td").on("mousedown", function() {
        mouseDown = true;
    });  

    $("td").on("mouseup", function() {
        mouseDown = false;
    });   

    // drag color along grid
    $("td").on("mousemove", function() {
        if (mouseDown === true) {
            $(this).css("background-color", getColor() );
        };
    }); 
}; 

function createCanvas() {
    html2canvas(document.getElementById('pixelCanvas'), {
        onrendered: function(canvas) {
            document.body.appendChild(canvas).setAttribute("id", "canvas"),
            document.getElementById("canvas").style.visibility = "hidden";
        }
    });
};

function savePixelArt() {
    createCanvas();
    setTimeout(function () { 
        var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
        // draw to canvas...
        canvas.toBlob(function(blob) {
            saveAs(blob, "pixelArt.jpg");
        });
        // remove rendered canvas to prevent duplicates
        $("canvas").remove();
    }, 1000);
};

function updateOGImgTag() {
   createCanvas();
   setTimeout( function() {
    var canvas = document.getElementById("canvas");
    var photo = canvas.toDataURL('image/jpeg');                
     $.ajax({
        method: 'POST',
        url: 'photo_upload.php',
        data: {
            photo: photo
        }
     });
   }, 1500);
}

function shareToFacebook() {
    createCanvas();
    setTimeout(function() {
        updateOGImgTag();
        FB.ui({
            method: 'share',
            href: 'https://wgeorgecook.github.io/pixel-art-webapp/',
          }, function(response){});
        // remove rendered canvas to prevent duplicates
        $("canvas").remove();
    }, 1000);
}

function openGraphShare() {
    // this looks like I may be able to use dynamic images. Just need to make that response image.
    createCanvas();
    setTimeout(function() {
        var canvas, photo;
        canvas = document.getElementById('canvas');
        photo = canvas.toDataURL('image/jpeg');   
        FB.ui({
            method: 'share_open_graph',
            action_type: 'share',
            action_properties: JSON.stringify({
              'object': 'https://wgeorgecook.github.io/pixel-art-webapp/',
              'website': {
                 'og:type': 'object',
                 'og:url': 'https://wgeorgecook.github.io/pixel-art-webapp/',
                 'og:title': 'Pixel Art Maker',
                 'og:description': 'A place for art makers!',
                 'og:image': photo,
              }
            })
          }, function(response){});
    }, 1000)
};
