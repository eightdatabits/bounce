function PhysObject(position, velocity, mass, is_static, bounds) {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.is_static = is_static;
    this.bounds = bounds;

    this.getPosition = function() {
        return this.position;
    }

    this.setPosition = function(position) {
        this.position = position;
    }

    this.getVelocity = function() {
        return this.velocity;
    }

    this.setVelocity = function(velocity) {
        this.velocity = velocity;
    }

    this.getMass = function() {
        return this.mass;
    }

    this.setMass = function(mass) {
        this.mass = mass;
    }

    this.isStatic = function() {
        return this.is_static;
    }

    this.setStatic = function(is_static) {
        this.is_static = is_static;
    }

    this.getBounds = function() {
        return this.bounds;
    }
}