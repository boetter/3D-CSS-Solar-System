var base;
var secondsbase;
var minutesbase;
var hoursbase;
var clockDiameter;
var cx, cy;
var sliderH, sliderM, sliders;
var hourTbase, minTbase;
var btnH, btnM, btnLearn;
var minIsOn = false;
var hourIsOn = true;
var realTime = true;
var showMeTime = false;
var mouseOnRectTime = false;
var digit;
var mSliderValue = 0;
var hSliderValue = 0;
var timeM;

function setup() {
  // create canvas
  var c = createCanvas(475, 600);
  c.parent("#myCanvas");
  // background(100);

  stroke(0);
  strokeCap(ROUND);

  // base = min(width, height) / 2;
  base = 475 / 2;
  secondsbase = base * 0.72;
  minutesbase = base * 0.55;
  hoursbase = base * 0.40;
  hourTbase = base * 0.86;
  minTbase = base * 0.62;
  clockDiameter = base * 2;

  cx = width / 2;
  cy = (height / 2) - clockDiameter / 8;

  sliderH = select('#hourSlider');
  sliderM = select('#minSlider');
  sliders = select('#slidersWrapper');

  btnLearn = document.getElementById("learnBtn");
  btnLearn.addEventListener("click", learnOn);
  btnH = document.getElementById("hourBtn");
  btnH.addEventListener("click", hourOn);
  btnM = document.getElementById("minBtn");
  btnM.addEventListener("click", minOn);


  //p5 functions disabled issue >> https://github.com/processing/p5.js/issues/1815
  // btnTime = select('#timeBtn');
  // btnTime.mousePressed(showTime);
  // btnH = select('#hourBtn');
  // btnH.mousePressed(hourOn);
  // btnM = select('#minBtn');
  // btnM.mousePressed(minOn);
  // btnLearn = select('#learnBtn');
  // btnLearn.mousePressed(learnOn);
}

function draw() {
  // Draw the clock background
  fill(255);
  // strokeWeight(5);
  noStroke();

  ellipse(cx, cy, clockDiameter, clockDiameter);

  if (realTime) {
    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
    var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  } else {
    //I temporary keep  the "old" code for backup
    var m = map(sliderM.value(), 0, 60, 0, TWO_PI) - HALF_PI;
    // var m = map(sliderM.value(), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(sliderH.value(), 0, 24, 0, TWO_PI * 2) - HALF_PI;
    // var h = map(sliderM.value(), 0, 60, 0, TWO_PI)/12 - HALF_PI;
  }


  // Draw the hands of the clock
  stroke('#F52F4A');
  strokeWeight(10);
  line(cx, cy, cx + cos(m) * minutesbase, cy + sin(m) * minutesbase);
  stroke('#2963F7');
  strokeWeight(10);
  line(cx, cy, cx + cos(h) * hoursbase, cy + sin(h) * hoursbase);

  // Draw the minutes ticks
  strokeWeight(8);
  stroke(200);
  beginShape(POINTS);
  for (var a = 0; a < 360; a += 6) {
    var angle = radians(a);
    var x = cx + cos(angle) * secondsbase;
    var y = cy + sin(angle) * secondsbase;
    vertex(x, y);
  }
  endShape();

  // Draw the hour ticks
  strokeWeight(20);
  stroke('#2963F7');
  beginShape(POINTS);
  for (var a = 0; a < 360; a += 30) {
    var angle = radians(a);
    var x = cx + cos(angle) * secondsbase;
    var y = cy + sin(angle) * secondsbase;
    vertex(x, y);
  }
  endShape();


  // Display the hour numbers
  if (hourIsOn) {
    textSize(35);
    textStyle(BOLD);
    textAlign(CENTER, CENTER)
    noStroke();
    fill(0);
    for (var b = 1; b <= 12; b++) {
      var angleHN = radians(30 * b) - HALF_PI;
      var tx = cx + cos(angleHN) * hourTbase;
      var ty = cy + sin(angleHN) * hourTbase;
      text(b, tx, ty);
    }
  }

  // Display the min numbers
  if (minIsOn) {
    textSize(15);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER)
    noStroke();
    fill(0);
    for (var b = 0; b < 60; b += 5) {
      var angleHN = radians(6 * b) - HALF_PI;
      var tx = cx + cos(angleHN) * minTbase;
      var ty = cy + sin(angleHN) * minTbase;
      text(b, tx, ty);
    }
  }

  //centre dot
  noStroke();
  fill(0);
  ellipse(cx, cy, 15, 15);




}

function showTime() {
  if (showMeTime) {
    showMeTime = false;
    // btnTime.html('Show Time');
    btnTime.innerHTML = 'Vis digital ur';
  } else {
    showMeTime = true;
    // btnTime.html('Hide Time');
    btnTime.innerHTML = 'Skjul digital ur';
  }

}

function learnOn() {
  if (realTime) {
    realTime = false;
    // btnLearn.html('Show Real Time'); disabled for p5 issue 1815
    btnLearn.innerHTML = 'Vis klokken';
    if ($('#slidersWrapper').hasClass('display-none')) {
      sliders.removeClass('display-none');
    }
  } else {
    realTime = true;
    // btnLearn.html('Play with Time'); //disabled for p5 issue 1815
    btnLearn.innerHTML = 'Leg med klokken';

    if (!$('#slidersWrapper').hasClass('display-none')) {
      sliders.addClass('display-none');
    }
  }
}


function hourOn() {
  if (hourIsOn) {
    hourIsOn = false;
    // btnH.html('Show Hours'); disabled for p5 issue 1815
    btnH.innerHTML = 'Vis timer';
  } else {
    hourIsOn = true;
    // btnH.html('Hide Hours'); disabled for p5 issue 1815
    btnH.innerHTML = 'Skjul timer';
  }
}

function minOn() {
  if (minIsOn) {
    minIsOn = false;
    // btnM.html('Show Minutes'); disabled for p5 issue 1815
    btnM.innerHTML = 'Vis minutter';
  } else {
    minIsOn = true;
    // btnM.html('Hide Minutes'); disabled for p5 issue 1815
    btnM.innerHTML = 'Skjul minutter';

  }
}
