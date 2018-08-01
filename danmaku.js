$(document).ready(function() {

    const RADIUS = 4;
    const RAD = 4;

    function degToRad(degrees) {
      var result = Math.PI / 180 * degrees;
      return result;
    }
    var invincible = false
    var bullets = []
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var context = canvas.getContext("2d");
    var x = 740;
    var y = 803;
    var d = 720;
    var g = 516;
    var bullet = {x: d, y: g, radius: RAD, xMove: '+', yMove:'+', speed:1};
    var frames = 0;
    var directions = ['+', '-','+', '-','+', '-', '0']
    var speeds = [.5, 1, 1.5, 2, 2.5, 3]
    function canvasDraw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0066ff";
        ctx.beginPath();
        ctx.arc(x, y, RADIUS, 0, degToRad(360), true);
        ctx.fill();
        }
    canvasDraw();
    placeBullets();
    // pointer lock object forking for cross browser

    canvas.requestPointerLock = canvas.requestPointerLock ||
                                canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock ||
                               document.mozExitPointerLock;

    canvas.onclick = function() {
      canvas.requestPointerLock();
    };

    // pointer lock event listeners

    // Hook pointer lock state change events for different browsers
    document.addEventListener("mousemove", updateHitbox, false)
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    function lockChangeAlert() {
      if (document.pointerLockElement === canvas ||
          document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        document.addEventListener("mousemove", updatePosition, false);
      } else {
        console.log('The pointer lock status is now unlocked');
        document.removeEventListener("mousemove", updatePosition, false);
      }
    }

    var tracker = document.getElementById('tracker');

    var animation;
    function updatePosition(e) {
      x += e.movementX;
      y += e.movementY;
      if (x > canvas.width + RADIUS) {
        x = canvas.width;
      }
      if (y > canvas.height + RADIUS) {
        y = canvas.height;
      }
      if (x < -RADIUS) {
        x = RADIUS;
      }
      if (y < -RADIUS) {
        y = RADIUS;
      }
      tracker.textContent = "X position: " + x + ", Y position: " + y

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

      if (!animation) {
        animation = requestAnimationFrame(function() {
          animation = null;
          canvasDraw();
          placeBullets();
        });
      }
    }
    function updateHitbox(){
        for (i=0; i<bullet.length; i++){
            var distance = Math.sqrt((bullets[i].x *bullets[i].x) + (bullets[i].y * bullets[i].y));
            let health = document.getElementById("health")
            if (distance < bullets[i].radius + RADIUS + 6 && invincible == false) {
                console.log("whoops");
                ctx.fillStyle = "red";
                ctx.fill();
                health.value -= 20;
                invincible = true;
                bullets.splice(i, 1)
            }
        }
    }
    if (invincible == true){
        setTimeout(function(){
            invincible = false
        }, 100)
    }
    setTimeout(function(){
        window.requestAnimationFrame(moveBullet);},2500)

        for(i = 0; i<= 10; i++){
            makeBullet();
        }
    function moveBullet(){
        placeBullets();
        for(i = 0; i<bullets.length; i++){
            context.clearRect(0, 0, canvas.width, canvas.height)
            if (bullets[i].xMove == "+"){
                bullets[i].x += bullets[i].position * bullets[i].xSpeed;
            }
            if (bullets[i].yMove == "+"){
                bullets[i].y += bullets[i].position * bullets[i].ySpeed;
            }
            if (bullets[i].xMove == "-"){
                bullets[i].x -= bullets[i].position * bullets[i].xSpeed;
            }
            if (bullets[i].yMove == "-"){
                bullets[i].y -= bullets[i].position * bullets[i].ySpeed;
            }
            if (bullets[i].xMove == "0"){
                bullets[i].x += 0
                bullets[i].y * .5
            }
            if (bullets[i].yMove == "0"){
                bullets[i].y += 0
                bullets[i].x *.5
            }
            if (bullets[i].x <= 0 || bullets[i].x >= 1500 || bullets[i].y <= 0 || bullets[i].y >= 1125 ||
                (bullets[i].xMove =="0" && bullets[i].yMove =="0")||bullets[i].position >= .8||bullets[i].position <= .15||((bullets[i].xMove =="0" || bullets[i].yMove =="0")&& i/2 ===0)){
                bullets.splice(i, 1);
            }
        }
        window.requestAnimationFrame(moveBullet);
        canvasDraw();
        placeBullets();
        frames = frames + 1
    }
    $("#score").html('Score = '+ frames)
    function placeBullets(){
        for(i = 0; i<bullets.length; i++){
            context.beginPath();
            context.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, 2 * Math.PI, false)
            context.fillStyle = "#F03C69"
            context.fill();
        }
    }
    function makeBullet(){
        var bulletClone = {
            x: d,
            y: g,
            radius: RAD,
            xMove: directions[Math.floor(Math.random() * directions.length)],
            yMove: directions[Math.floor(Math.random() * directions.length)],
            xSpeed: speeds[Math.floor(Math.random() * speeds.length)],
            ySpeed: speeds[Math.floor(Math.random() * speeds.length)],
            position: Math.random()
        }
        bullets.push(bulletClone);
    }
    setInterval(function(){
        for (i= 0; i<=10; i++){
            makeBullet()
        }
    }, 50)
    setInterval(function(){
        d= Math.random()/Math.random() *500
        g = Math.random()/Math.random() * 500
    })
})