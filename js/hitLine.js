function HitLine()
{
    this.x = 0;
    this.y = 0;
    this.width = 20;
    this.height = 20;
    this.direction = "none";

    this.draw = function(context) {
        context.fillStyle = 'rgba(0, 0, 0, 0)';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
export { HitLine }