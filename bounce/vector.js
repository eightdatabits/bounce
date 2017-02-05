var bounce = bounce || {}; // Create the bounce namespace if it hasn't already been created

bounce.Vector2d = function(_x, _y) {
    this.x = _x;
    this.y = _y;

    this.len = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    this.add = function(vect) {
        this.x += vect.x;
        this.y += vect.y;

        return this;
    }

    this.subtract = function(vect) {
        this.x -= vect.x;
        this.y -= vect.y;

        return this;
    }

    this.scale = function(c) {
        this.x *= c;
        this.y *= c;

        return this;
    }

    this.distance = function(vect) {
        return this.clone().subtract(vect).len();
    }

    this.dot = function(vect) {
        return (this.x * vect.x) + (this.y * vect.y);
    }

    this.copy = function(vect) {
        this.x = vect.x;
        this.y = vect.y;

        return this;
    }

    this.clone = function() {
        return new bounce.Vector2d(this.x, this.y);
    }
}
