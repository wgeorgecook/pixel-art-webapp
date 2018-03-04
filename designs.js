// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

$(function () {
    $("#sizePicker").on("submit", function (event) {
        removeGrid(); // start fresh
        makeGrid(); // draw new grid based on user input
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
    
}

function funColors() {
    //variables
    
}