
function Ball(position, velocity, mass, bounds ) {
    bounce.Thing.call( this, position, velocity, mass, false, bounds );

    this.draw = function() {
        fill(255);
        ellipse(this.position.x, this.position.y, 2*this.bounds.radius);
    }
}


var physeng;
var balls = new Array();

function setup() {
    createCanvas(640, 480);
    background(0);
    physeng = new bounce.Engine();
    physeng.dt = 1.0;
    physeng.gravity = new bounce.Vector2d(0,0.1);

    for( var i = 0; i < 20; i++ ) {
        var pos = new bounce.Vector2d(random(width), random(height));
        var vel = new bounce.Vector2d(random(5), random(5));
        var ball = new Ball(pos, vel, 1, new bounce.CircleBound(10));
        balls.push(ball);
        balls[i].draw();
        physeng.registerThing(balls[i]);
        console.log(ball);
    }
}

function draw() {
    frameRate(30);
    background(0);
    physeng.tick();

    for( var i = 0; i < balls.length; i++ ) {
        balls[i].draw();
    }
}