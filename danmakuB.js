var bullet = {x: d, y: g, radius: RAD};
drawBullet(bullet);
setTimeout(function(){
    window,requestAnimationFrame(moveBullet);},2500)

function moveBullet(){
    bullet.x +=1;
    bullet.y += 1;
    console.log(bullet.x, bullet.y)
    drawBullet(bullet);
    window.requestAnimationFrame(moveBullet);
}

function drawBullet(bullet){
    context.beginPath();
    context.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI, false)
    context.fillStyle = "#F03C69"
    context.fill();
}

console.log(bulletSource)

});