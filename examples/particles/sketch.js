
function Ball(position, velocity, mass, bounds ) {
    PhysObject.call( this, position, velocity, mass, false, bounds );

    this.draw = function() {
        fill(255);
        ellipse(this.position.x, this.position.y, 2*this.bounds.getRadius());
    }
}


var phys;
var balls = new Array();

function setup() {
    createCanvas(640, 480);
    background(0);
    phys = new Physics(1);
    phys.setGravity(new Vector(0,0.1));

    for( var i = 0; i < 20; i++ ) {
        var pos = new Vector(random(width), random(height));
        var vel = new Vector(random(5), random(5));
        var ball = new Ball(pos, vel, 1, new PhysCircleBound(10));
        balls.push(ball);
        balls[i].draw();
        phys.registerObject(balls[i]);
    }
}

function draw() {
    frameRate(30);
    background(0);
    phys.tick();

    for( var i = 0; i < balls.length; i++ ) {
        balls[i].draw();
    }
}