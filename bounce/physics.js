function Physics(dt) {
    this.gravity = Vector(0.0, 0.0);
    this.objects = [];
    this.dt = dt;

    this.setGravity = function(gravity) {
        this.gravity = gravity;
    }

    this.registerObject = function(object) {
        this.objects.push(object);
    }

    this.tick = function() {

        // Calculate elastic collisions and new velocities
        for( var i = 0; i < this.objects.length; i++ ) {
            for( var j = i + 1; j < this.objects.length; j++ ) {

                if( this.objects[i].isStatic() && this.objects[j].isStatic()) {
                    continue;
                }

                var dist = distance(this.objects[i].getPosition(), this.objects[j].getPosition());

                if( dist <= (this.objects[i].getBounds().getRadius() + this.objects[j].getBounds().getRadius())) {
                    var newvels = elasticCollision(this.objects[i], this.objects[j]);
                    if( this.objects[i].isStatic() == false ) {
                        this.objects[i].setVelocity(newvels[0]);
                    }
                    if( this.objects[j].isStatic() == false ) {
                        this.objects[j].setVelocity(newvels[1]);
                    }
                    console.log('collision: '+newvels);
                }
            };
        };

        for( var i = 0; i < this.objects.length; i++ ){
            // Update velocities according to gravity
            var vel = this.objects[i].getVelocity();
            vel.add( this.gravity.scale(this.dt) );
            this.objects[i].setVelocity(vel);

            // Update positions according to velocities
            var pos = this.objects[i].getPosition();
            pos.add( vel.scale(this.dt) );
            this.objects[i].setPosition(pos);

            if( (pos.x - this.objects[i].getBounds().getRadius() <= 0) &&
                (vel.x < 0) ) {
                vel.x = -1 * vel.x;
            }

            if( (pos.x + this.objects[i].getBounds().getRadius() >= width) &&
                (vel.x > 0)) {
                vel.x = -1 * vel.x;
            }

            if( (pos.y - this.objects[i].getBounds().getRadius() <= 0) &&
                (vel.y < 0) ) {
                vel.y = -1 * vel.y;
            }

            if( (pos.y + this.objects[i].getBounds().getRadius() >= height) &&
                (vel.y > 0)) {
                vel.y = -1 * vel.y;
            }
        };
    }

    function elasticCollision(object1, object2) {
        var obj1_pos = object1.getPosition();
        var obj2_pos = object2.getPosition();
        var obj1_vel = object1.getVelocity();
        var obj2_vel = object2.getVelocity();
        var obj1_mass = object1.getMass();
        var obj2_mass = object2.getMass();

        var v1diff = subtract(obj1_vel, obj2_vel);
        var v2diff = subtract(obj2_vel, obj1_vel);
        var pos1diff = subtract(obj1_pos, obj2_pos);
        var pos2diff = subtract(obj2_pos, obj1_pos);
        var v1diffdot = v1diff.dot(pos1diff);
        var v2diffdot = v2diff.dot(pos2diff);

        var pos1length = pos1diff.len();
        var pos2length = pos2diff.len();

        var mass1 = 2 * obj1_mass / (obj1_mass + obj2_mass);
        var mass2 = 2 * obj2_mass / (obj1_mass + obj2_mass);

        var newv1 = subtract(obj1_vel, subtract(obj1_pos, obj2_pos).scale(mass1 * v1diffdot / Math.pow(pos1length,2)));
        //var newv1x = obj1_velx - mass1 * v1diffdot / Math.pow(pos1length,2) * (obj1_x - obj2_x);
        //var newv1y = obj1_vely - mass1 * v1diffdot / Math.pow(pos1length,2) * (obj1_y - obj2_y);
        var newv2 = subtract(obj2_vel, subtract(obj2_pos, obj1_pos).scale(mass2 * v2diffdot / Math.pow(pos2length,2)));
        //var newv2x = obj2_velx - mass2 * v2diffdot / Math.pow(pos2length,2) * (obj2_x - obj1_x);
        //var newv2y = obj2_vely - mass2 * v2diffdot / Math.pow(pos2length,2) * (obj2_y - obj1_y);

        return [newv1, newv2];
    }
}