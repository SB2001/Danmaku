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
    var player = {x: x, y: y, radius: RADIUS, type:"Player", collidableWith: "enemy" };
    var frames = 0;
    var directions = ['+', '-','+', '-','+', '-', '0']
    var speeds = [.5, 1, 1.5, 2, 2.5, 3]
    var isColliding = false;
    var returnedObjects = []
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
      player.x += e.movementX;
      player.y += e.movementY;
      if (player.x > canvas.width + RADIUS) {
        player.x = canvas.width;
      }
      if (y > canvas.height + RADIUS) {
        player.y = canvas.height;
      }
      if (x < -RADIUS) {
        player.x = RADIUS;
      }
      if (y < -RADIUS) {
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
    function QuadTree(boundBox, lvl) {
        var maxObjects = 10;
        this.bounds = boundBox || {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        this.nodes = [];
        /*
         * Clears the quadTree and all nodes of objects
         */
        this.clear = function() {
            bullets = [];
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].clear();
            }
            this.nodes = [];
        };
        /*
         * Get all objects in the quadTree
         */
        this.getAllObjects = function(returnedObjects) {
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].getAllObjects(returnedObjects);
            }
            for (var i = 0, len = bullets.length; i < len; i++) {
                returnedObjects.push(bullets[i]);
            }
            return returnedObjects;
        };
        /*
         * Return all objects that the object could collide with
         */
        this.findObjects = function(returnedObjects, bulletClone) {
            if (typeof obj === "undefined") {
                console.log("UNDEFINED OBJECT");
                return;
            }
            var index = this.getIndex(bulletClone);
            if (index != -1 && this.nodes.length) {
                this.nodes[index].findObjects(returnedObjects, bulletClone);
            }
            for (var i = 0, len = objects.length; i < len; i++) {
                returnedObjects.push(objects[i]);
            }
            return returnedObjects;
        };
        /*
         * Insert the object into the quadTree. If the tree
         * excedes the capacity, it will split and add all
         * objects to their corresponding nodes.
         */
        this.insert = function(obj) {
            if (typeof bulletClone === "undefined") {
                return;
            }
            if (bulletClone instanceof Array) {
                for (var i = 0, len = bulletClone.length; i < len; i++) {
                    this.insert(bulletClone[i]);
                }
                return;
            }
            if (this.nodes.length) {
                var index = this.getIndex(bulletClone);
                // Only add the object to a subnode if it can fit completely
                // within one
                if (index != -1) {
                    this.nodes[index].insert(bulletClone);
                    return;
                }
            }
            bullets.push(bulletClone);
            // Prevent infinite splitting
            if (objects.length > maxObjects && level < maxLevels) {
                if (this.nodes[0] == null) {
                    this.split();
                }
                var i = 0;
                while (i < bullets.length) {
                    var index = this.getIndex(bullets[i]);
                    if (index != -1) {
                        this.nodes[index].insert((bullets.splice(i,1))[0]);
                    }
                    else {
                        i++;
                    }
                }
            }
        };
        /*
         * Determine which node the object belongs to. -1 means
         * object cannot completely fit within a node and is part
         * of the current node
         */
        this.getIndex = function(bulletClone) {
            var index = -1;
            var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
            var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
            // Object can fit completely within the top quadrant
            var topQuadrant = (bulletClone.y < horizontalMidpoint && bulletClone.y + bulletClone.radius < horizontalMidpoint);
            // Object can fit completely within the bottom quandrant
            var bottomQuadrant = (bulletClone.y > horizontalMidpoint);
            // Object can fit completely within the left quadrants
            if (bulletClone.x < verticalMidpoint &&
                    bulletClone.x + bulletClone.width < verticalMidpoint) {
                if (topQuadrant) {
                    index = 1;
                }
                else if (bottomQuadrant) {
                    index = 2;
                }
            }
            // Object can fix completely within the right quandrants
            else if (bulletClone.x > verticalMidpoint) {
                if (topQuadrant) {
                    index = 0;
                }
                else if (bottomQuadrant) {
                    index = 3;
                }
            }
            return index;
        };
        /*
         * Splits the node into 4 subnodes
         */
        this.split = function() {
            // Bitwise or [html5rocks]
            var subWidth = (this.bounds.width / 2) | 0;
            var subHeight = (this.bounds.height / 2) | 0;
            this.nodes[0] = new QuadTree({
                x: this.bounds.x + subWidth,
                y: this.bounds.y,
                width: subWidth,
                height: subHeight
            }, level+1);
            this.nodes[1] = new QuadTree({
                x: this.bounds.x,
                y: this.bounds.y,
                width: subWidth,
                height: subHeight
            }, level+1);
            this.nodes[2] = new QuadTree({
                x: this.bounds.x,
                y: this.bounds.y + subHeight,
                width: subWidth,
                height: subHeight
            }, level+1);
            this.nodes[3] = new QuadTree({
                x: this.bounds.x + subWidth,
                y: this.bounds.y + subHeight,
                width: subWidth,
                height: subHeight
            }, level+1);
        };
    }
    function detectCollision() {
        game.quadTree.getAllObjects(bullets);
        for (var x = 0, len = bullets.length; x < len; x++) {
            game.quadTree.findObjects(obj = [], bullets[x]);
            for (y = 0, length = bullets.bulletClone[y].length; y < length; y++) {
                // DETECT COLLISION ALGORITHM
                if (bullets[x].collidableWith === obj[y].type &&
                    (bullets[x].x < obj[y].x + obj[y].width &&
                     bullets[x].x + objects[x].width > obj[y].x &&
                     bullets[x].y < bullets.bulletClone[y].y + bullets.bulletClone[y].height &&
                     bullets[x].y + objects[x].height > obj[y].y)) {
                    bullets[x].isColliding = true;
                    bullets.bulletClone[y].isColliding = true;
                }
            }
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
            position: Math.random(),
            type: "enemy",
            collidableWith: player.type
        }
        bullets.push(bulletClone);
    }
    setInterval(function(){
        for (i= 0; i<=10; i++){
            makeBullet()
        }
        console.log(bullets.length)
    }, 100)
    setInterval(function(){
        d= Math.random()/Math.random() *500
        g = Math.random()/Math.random() * 500
    })
    this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});
})