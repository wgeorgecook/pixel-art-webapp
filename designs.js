// On submitting a grid size will 
// 0. remove any old grid
// 1. draw the grid
// 2. set the color of a grid cell based on behavior

$(function () {
    // sets the grid
    $("#sizePicker").on("submit", function (event) {
        // removeGrid(); // start fresh
        whileRemoveGrid(); // start fresh with a while loop
        makeGrid(); // draw new grid based on user input
        setColor(); // sets the color of grid cell based on behavior
        event.preventDefault();
    });
});

function makeGrid() {

    // variables set the values equal to the user input
    var width, height, canvas;
    canvas = $("table");
    width = $("#sizePicker input#inputWeight").val();
    height = $("#sizePicker input#inputHeight").val();


    //debugging
    console.log("Height: "+ height + " Width: "+ width);

    // set rows
    for (c = 0; c < height; c++) {
        canvas.append("<tr/>");
        //set columns
    }; for (r = 0; r < width; r++) {
        $("tr").append("<td/>");
        
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