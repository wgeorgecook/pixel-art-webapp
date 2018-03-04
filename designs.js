// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()


// all the fun stuff
// sets event listeners
// draws the grid
// redraws the grid fresh if the user gives us new dimensions

$(function () {
    // sets the grid
    $("#sizePicker").on("submit", function (event) {
        removeGrid(); // start fresh
        makeGrid(); // draw new grid based on user input
        event.preventDefault();
            // picks the highlighted cell and sets the color
        $("td").on("click", function() {
            console.log("I've been clicked!");
            $(this).css("background-color", getColor());
        });

        // removes on double click
        $("td").on("dblclick", function() {
            console.log("I've been double-clicked!");
            $(this).css("background-color", "");
        });
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

function getColor() {
    //variables
    var selectColor, currentColor, gridCell;
    selectColor = $("#colorPicker");
    currentColor = selectColor.val();
    return currentColor;
};