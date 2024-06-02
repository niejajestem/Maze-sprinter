function HitBox()
{
    this.x = 0;
    this.y = 0;
    this.width = 15;
    this.height = 15;
    this.color = 'rgba(0, 0, 0, 0)';

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
export { HitBox }