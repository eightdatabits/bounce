var bounce = bounce || {}; // Create the bounce namespace if it hasn't already been created

bounce.Thing = function(position, velocity, mass, is_static, bounds) {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.is_static = is_static;
    this.bounds = bounds;
}