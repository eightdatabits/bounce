function Physics(dt) {
    this.gravity = [0.0, 0.0];
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

                var dist = distance(this.objects[i], this.objects[j]);

                if( dist <= (this.objects[i].getBounds().getRadius() + this.objects[j].getBounds().getRadius())) {
                    var newvel = elasticCollision(this.objects[i], this.objects[j]);
                    if( this.objects[i].isStatic() == false ) {
                        this.objects[i].setVelocity(newvel[0]);
                    }
                    if( this.objects[j].isStatic() == false ) {
                        this.objects[j].setVelocity(newvel[1]);
                    }
                    console.log('collision: '+newvel);
                }
            };
        };

        for( var i = 0; i < this.objects.length; i++ ){
            // Update velocities according to gravity
            var vel = this.objects[i].getVelocity();
            vel[0] = vel[0] + this.gravity[0] * this.dt;
            vel[1] = vel[1] + this.gravity[1] * this.dt;
            this.objects[i].setVelocity(vel);

            // Update positions according to velocities
            var pos = this.objects[i].getPosition();
            pos[0] = pos[0] + vel[0] * this.dt;
            pos[1] = pos[1] + vel[1] * this.dt;
            this.objects[i].setPosition(pos);

            if( (pos[0] - this.objects[i].getBounds().getRadius() <= 0) &&
                (vel[0] < 0) ) {
                vel[0] = -1 * vel[0];
            }

            if( (pos[0] + this.objects[i].getBounds().getRadius() >= width) &&
                (vel[0] > 0)) {
                vel[0] = -1 * vel[0];
            }

            if( (pos[1] - this.objects[i].getBounds().getRadius() <= 0) &&
                (vel[1] < 0) ) {
                vel[1] = -1 * vel[1];
            }

            if( (pos[1] + this.objects[i].getBounds().getRadius() >= height) &&
                (vel[1] > 0)) {
                vel[1] = -1 * vel[1];
            }
        };
    }

    function distance(object1, object2) {
        var obj1_pos = object1.getPosition();
        var obj1_x = obj1_pos[0];
        var obj1_y = obj1_pos[1];
        var obj2_pos = object2.getPosition();
        var obj2_x = obj2_pos[0];
        var obj2_y = obj2_pos[1];

        return Math.sqrt(Math.pow(obj1_x - obj2_x, 2) + Math.pow(obj1_y - obj2_y, 2));
    }

    function vectLength(vector) {
        return Math.sqrt(Math.pow(vector[0],2) + Math.pow(vector[1],2));
    }

    function elasticCollision(object1, object2) {
        var obj1_pos = object1.getPosition();
        var obj1_x = obj1_pos[0];
        var obj1_y = obj1_pos[1];
        var obj2_pos = object2.getPosition();
        var obj2_x = obj2_pos[0];
        var obj2_y = obj2_pos[1];
        var obj1_vel = object1.getVelocity();
        var obj1_velx = obj1_vel[0];
        var obj1_vely = obj1_vel[1];
        var obj2_vel = object2.getVelocity();
        var obj2_velx = obj2_vel[0];
        var obj2_vely = obj2_vel[1];
        var obj1_mass = object1.getMass();
        var obj2_mass = object2.getMass();

        var v1diff = [obj1_velx - obj2_velx, obj1_vely - obj2_vely];
        var v2diff = [obj2_velx - obj1_velx, obj2_vely - obj1_vely];
        var pos1diff = [obj1_x - obj2_x, obj1_y - obj2_y];
        var pos2diff = [obj2_x - obj1_x, obj2_y - obj1_y];
        var v1diffdot = v1diff[0] * pos1diff[0] + v1diff[1] * pos1diff[1];
        var v2diffdot = v2diff[0] * pos2diff[0] + v2diff[1] * pos2diff[1];

        var pos1length = vectLength(pos1diff);
        var pos2length = vectLength(pos2diff);

        var mass1 = 2 * obj1_mass / (obj1_mass + obj2_mass);
        var mass2 = 2 * obj2_mass / (obj1_mass + obj2_mass);

        var newv1x = obj1_velx - mass1 * v1diffdot / Math.pow(pos1length,2) * (obj1_x - obj2_x);
        var newv1y = obj1_vely - mass1 * v1diffdot / Math.pow(pos1length,2) * (obj1_y - obj2_y);
        var newv2x = obj2_velx - mass2 * v2diffdot / Math.pow(pos2length,2) * (obj2_x - obj1_x);
        var newv2y = obj2_vely - mass2 * v2diffdot / Math.pow(pos2length,2) * (obj2_y - obj1_y);

        return [[newv1x,newv1y], [newv2x,newv2y]];
    }
}