$(document).ready(function() {

    const RADIUS = 4;
    const RAD = 4;

    function degToRad(degrees) {
      var result = Math.PI / 180 * degrees;
      return result;
    }
    var invincible = false
    var quadrant;
    var bullets = []
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var context = canvas.getContext("2d");
    var x = 740;
    var y = 803;
    var d = 720;
    var g = 516;
    var player = {x: x, y: y, radius: RADIUS, type:"Player", collidableWith: "enemy" };
    var frames = 0;
    var directions = ['+', '-','+', '-','+', '-', '0']
    var speeds = [.5, 1, 1.5, 2, 2.5, 3]
    function canvasDraw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0066ff";
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, 0, degToRad(360), true);
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
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    function lockChangeAlert() {
      if (document.pointerLockElement === canvas ||
          document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        document.addEventListener('mousemove', updatePosition, true)
      } else {
        console.log('The pointer lock status is now unlocked');
        document.removeEventListener('mousemove', updatePosition, true)
      }
    }

    var tracker = document.getElementById('tracker');

    var animation;
    function updatePosition(e) {
      player.x += e.movementX;
      player.y += e.movementY;
      if (player.x > canvas.width + RADIUS) {
        player.x = canvas.width;
      }
      if (player.y > canvas.height + RADIUS) {
        player.y = canvas.height;
      }
      if (player.x < -RADIUS) {
        player.x = RADIUS;
      }
      if (player.y < -RADIUS) {
        player.y = RADIUS;
      }
      tracker.textContent = "X position: " + player.x + ", Y position: " + player.y

    this.newPos = function() {
        this.player.x += this.speedX;
        this.player.y += this.speedY;
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
                for (i=0; i<bullets.length; i++){
                        var distance = Math.sqrt(((bullets[i].x **2) + (bullets[i].y **2))-((player.x **2)+(player.y**2)));
                        let health = document.getElementById("health")
                        if (distance < bullets[i].radius + RADIUS + 6 && invincible == false) {
                            console.log(player.x, player.y, bullets[i].x, bullets[i].y);
                            ctx.fillStyle = "white";
                            ctx.fill();
                            health.value -= 20;
                            invincible = true;
                    }
                }
            }
    if (invincible == true){
        setTimeout(function(){
            invincible = false
        }, 300)
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
        updateHitbox();
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
            radius: Math.random() * 50,
            xMove: directions[Math.floor(Math.random() * directions.length)],
            yMove: directions[Math.floor(Math.random() * directions.length)],
            xSpeed: speeds[Math.floor(Math.random() * speeds.length)],
            ySpeed: speeds[Math.floor(Math.random() * speeds.length)],
            position: Math.random(),
            type: "enemy",
            collidableWith: player.type
        }
        bullets.push(bulletClone);
    }
    setInterval(function(){
        for (i= 0; i<=5; i++){
            makeBullet()
        }
    }, 200)
    setInterval(function(){
        d= Math.random()/Math.random() *500
        g = Math.random()/Math.random() * 500
    })
        setInterval(function(){
            console.log(invincible)
            if (invincible = true){
                invincible = false
            }
        }, 1000)
})