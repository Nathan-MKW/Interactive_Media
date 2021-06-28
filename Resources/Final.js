var lightBlue = "#86D5FF";
var navy = "#1C2D74";
var mediumBlue = "#2A4ACE";

var colorPalette = [lightBlue,navy,mediumBlue];

var randomColor = Math.floor(Math.random() * colorPalette.length);

//Background

$("body").css("background-color", colorPalette[randomColor]);

