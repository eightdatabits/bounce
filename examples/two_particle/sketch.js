
function Ball(position, velocity, mass, bounds ) {
    bounce.Thing.call( this, position, velocity, mass, false, bounds );

    this.draw = function() {
        fill(255);
        ellipse(this.position.x, this.position.y, 2*this.bounds.radius);
    }
}


var physeng;
var ball1;
var ball2;

function setup() {
    createCanvas(640, 480);
    background(0);
    physeng = new bounce.Engine();
    physeng.dt = 1.0;

    ball1 = new Ball(new bounce.Vector2d(10, 200), new bounce.Vector2d(10, 0), 1, new bounce.CircleBound(10));
    ball2 = new Ball(new bounce.Vector2d(400, 200), new bounce.Vector2d(-10, 0), 1, new bounce.CircleBound(10));
    ball1.draw();
    ball2.draw();
    physeng.registerThing(ball1);
    physeng.registerThing(ball2);
}

function draw() {
    frameRate(1);
    background(0);
    physeng.tick();

    ball1.draw();
    ball2.draw();
}