define('app/Particle', [
    'app/GameObject'
], function(GameObject) { 

    class Particle extends GameObject {
        constructor(config) {
          super(config);
          this.image = config.image;
          this.velocity = config.velocity;
          this.lifetimeMax = config.lifetime;
          this.lifetime = config.lifetime;
        }
        tick() {
          const nextPosition = {
            x: this.aabb.x + this.velocity.x,
            y: this.aabb.y + this.velocity.y
          }
          this.velocity.x = this.velocity.x * 0.95;
          this.velocity.y = this.velocity.y * 0.95;
          this.aabb = nextPosition;

          this.lifetime--;
          if (this.lifetime <= 0) this.destroy();
        }
        draw(context) {
          context.drawImage(this.image, this.aabb.x, this.aabb.y);
        }
  }

    return Particle;
});