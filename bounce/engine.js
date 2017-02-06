var bounce = bounce || {}; // Create the bounce namespace if it hasn't already been created

bounce.Engine = function() {
    this.gravity = new bounce.Vector2d(0.0, 0.0);
    this.dt = 1.0;

    var things = [];

    this.setGravity = function(gravity) {
        this.gravity = gravity;
    }

    this.registerThing = function(thing) {
        things.push(thing);
    }

    this.tick = function() {

        // Calculate elastic collisions and new velocities
        for( var i = 0; i < things.length; i++ ) {
            for( var j = i + 1; j < things.length; j++ ) {

                if( things[i].is_static && things[j].is_static) {
                    continue;
                }

                var dist = things[i].position.distance(things[j].position);
                if( dist <= (things[i].bounds.radius + things[j].bounds.radius) &&
                    isColliding(things[i], things[j])) {

                    var newvels = elasticCollision(things[i], things[j]);

                    if( things[i].is_static == false ) {
                        things[i].velocity.copy(newvels[0]);
                    }
                    if( things[j].is_static == false ) {
                        things[j].velocity.copy(newvels[1]);
                    }
                    console.log('collision: ' + i + ', ' + j);
                }
            };
        };

        for( var i = 0; i < things.length; i++ ){
            var vel = things[i].velocity;
            var pos = things[i].position;

            // Update velocities according to gravity
            vel.add( this.gravity.clone().scale(this.dt) );

            // Update positions according to velocities
            pos.add( vel.clone().scale(this.dt) );

            if( (pos.x - things[i].bounds.radius <= 0) &&
                (vel.x < 0) ) {
                vel.x = -1 * vel.x;
            }

            if( (pos.x + things[i].bounds.radius >= width) &&
                (vel.x > 0)) {
                vel.x = -1 * vel.x;
            }

            if( (pos.y - things[i].bounds.radius <= 0) &&
                (vel.y < 0) ) {
                vel.y = -1 * vel.y;
            }

            if( (pos.y + things[i].bounds.radius >= height) &&
                (vel.y > 0)) {
                vel.y = -1 * vel.y;
            }

            things[i].velocity.copy(vel);
            things[i].position.copy(pos);
        };
    }

    function elasticCollision(thing1, thing2) {

        var v1diff = thing1.velocity.clone().subtract(thing2.velocity);
        var v2diff = thing2.velocity.clone().subtract(thing1.velocity);
        var pos1diff = thing1.position.clone().subtract(thing2.position);
        var pos2diff = thing2.position.clone().subtract(thing1.position);
        var v1diffdot = v1diff.dot(pos1diff);
        var v2diffdot = v2diff.dot(pos2diff);

        var pos1length = pos1diff.len();
        var pos2length = pos2diff.len();

        var mass1 = 2 * thing1.mass / (thing1.mass + thing2.mass);
        var mass2 = 2 * thing2.mass / (thing1.mass + thing2.mass);

        var newv1 = thing1.velocity.clone().subtract(thing1.position.clone().subtract(thing2.position).scale(mass1 * v1diffdot / Math.pow(pos1length,2)));
        var newv2 = thing2.velocity.clone().subtract(thing2.position.clone().subtract(thing1.position).scale(mass2 * v2diffdot / Math.pow(pos2length,2)));

        return [newv1, newv2];
    }

    function isColliding(thing1, thing2) {

        var centerline_norm = thing2.position.clone().subtract(thing1.position);
        centerline_norm.scale(1/centerline_norm.len());
        var relative_vel = thing1.velocity.clone().subtract(thing2.velocity);

        var projection = relative_vel.dot(centerline_norm);
console.log(relative_vel);
console.log(centerline_norm);
console.log(projection);
        return (projection > 0);
    }
}