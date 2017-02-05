//var phys = phys || {}; // Create the Phys namespace if it hasn't already been created
//var phys.vector = phys.vector || {};
function Vector(_x, _y) {
    this.x = _x;
    this.y = _y;

    this.len = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    this.add = function(vect) {
        this.x = this.x + vect.x;
        this.y = this.y + vect.y;

        return this;
    }

    this.sub = function(vect) {
        this.x = this.x - vect.x;
        this.y = this.y - vect.y;

        return this;
    }

    this.scale = function(c) {
        this.x = this.x * c;
        this.y = this.y * c;

        return this;
    }

    this.dot = function(vect) {
        return (this.x * vect.x) + (this.y * vect.y);
    }
}

subtract = function(vect1, vect2) {
    return new Vector(vect1.x - vect2.x, vect1.y - vect2.y);
}

distance = function(vect1, vect2) {
    return subtract(vect1, vect2).len();
}