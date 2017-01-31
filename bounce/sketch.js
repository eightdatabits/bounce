
function Ball(position, velocity, mass, bounds ) {
    PhysObject.call( this, position, velocity, mass, false, bounds );

    this.draw = function() {
        fill(255);
        ellipse(this.position[0], this.position[1], 2*this.bounds.getRadius());
    }
}


var phys;
var balls = new Array();

function setup() {
    createCanvas(400, 400);
    background(255);
    phys = new Physics(1);
    phys.setGravity([0,0.1]);

    for( var i = 0; i < 20; i++ ) {
        var ball = new Ball([random(width), random(height)], [random(5), random(5)], 1, new PhysCircleBound(10));
        balls.push(ball);
        balls[i].draw();
        phys.registerObject(balls[i]);
    }
    //ball1 = new Ball([100,90], [3,0], 1, new PhysCircleBound(10));
    //ball2 = new Ball([300,100], [-3,0], 1, new PhysCircleBound(10));
}

function draw() {
    frameRate(30);
    background(0);
    phys.tick();

    for( var i = 0; i < balls.length; i++ ) {
        balls[i].draw();
    }
}