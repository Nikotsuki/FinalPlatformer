class StartGame extends Phaser.Scene {
    constructor(){
        super("startGame");
        this.my = {text: {}};   
    }

    init() {
        // variables and settings
        this.ACCELERATION = 400;
        this.DRAG = 3500;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -650;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 1.0;
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
    }

    create(){
        this.map = this.add.tilemap("platformer-level-2", 16, 16, 30, 30);
        this.physics.world.setBounds(0,0, 30*16, 30*16, true, true, false, false);

        this.tileset = this.map.addTilesetImage("1-bit-tileset", "tilemap_sheet");

        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.backgroundLayer.setScale(1.4, 1.4);
        this.platformLayer2 = this.map.createLayer("Platform", this.tileset, 0, 0);
        this.platformLayer2.setScale(1.4, 1.4);
        this.detailsLayer = this.map.createLayer("Details", this.tileset, 0, 0);
        this.detailsLayer.setScale(1.4, 1.4);

        this.platformLayer2.setCollisionByProperty({
            collides: true
        });

        
        my.sprite.player = this.physics.add.sprite(250, 430, "player_idle");
        my.sprite.player.setScale(1.4);
        my.sprite.player.setCollideWorldBounds(false);
        my.sprite.player.body.gravity.y = 1500;

        this.physics.add.collider(my.sprite.player, this.platformLayer2);


        my.vfx.walking = this.add.particles(0, 3, "kenny-particles", {
            frame: ['star_02.png', 'star_03.png'],
            scale: {start: 0.03, end: 0.05, random: false},
            lifespan: 500,
            alpha: {start: 1, end: 0, gravity: 0}, 
        });

        my.vfx.jumping = this.add.particles(0, 0, "kenny-particles", {
            frame: ['flame_01.png', 'flame_02.png', 'flame_03.png', 'flame_04.png'],
            scale: {start: 0.04, end: 0.02, random: false},
            lifespan: 300,
            alpha: {start: 0.5, end: 0.2, gravity: 0}, 
        });

        my.vfx.walking.stop();
        my.vfx.jumping.stop();

        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // TODO: add camera code here
        this.cameras.main.setBounds(-160, 0, 1440, 1440);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.centerOn(my.sprite.player.x, my.sprite.player.y);
        this.cameras.main.setZoom(1.4);

        my.sprite.door = this.add.sprite(420, 481, "door");
        my.sprite.door.setScale(1.4);

        my.text.GameOver1 = this.add.bitmapText(game.config.width/2 - 535, game.config.height/2 - 230, "rocketSquare", "Welcome to Dark Lines!");
        my.text.GameOver1.setScale(0.7);
        //my.text.score = this.add.bitmapText(game.config.width/2 - 255, game.config.height/2 - 50, "rocketSquare", "Your final score was  " + this.finalScore);
        my.text.GameOver2 = this.add.bitmapText(game.config.width/2 - 650, game.config.height/2 - 140, "rocketSquare", "Reach the door at the end of the level \n          and collect gems along the way");
        my.text.GameOver2.setScale(0.7);
    }

    update(){
        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();
                my.vfx.jumping.stop();

            }

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip();
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();
                my.vfx.jumping.stop();

            }

        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            // TODO: have the vfx stop playing
            my.vfx.walking.stop();
        }


        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.vfx.jumping.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2, false);
            my.sprite.player.anims.play('jump');
        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            my.vfx.jumping.start();
            this.sound.play("jump_sound", {
                volume: 0.15   // Can adjust volume using this, goes from 0 to 1
            });
        }
        if(my.sprite.player.body.blocked.down){
            my.vfx.jumping.stopFollow();
        }
        if(my.sprite.player.y > 1100) {
            this.sound.play("hit", {
                volume: 0.3   // Can adjust volume using this, goes from 0 to 1
            });
            this.scene.restart();
        }

        if(this.collides(my.sprite.player, my.sprite.door)){
            this.sound.play("door_sound", {
                volume: 0.4   // Can adjust volume using this, goes from 0 to 1
            });
            this.cameras.main.stopFollow();
            my.sprite.player.x = 1000;
            my.sprite.player.y = -1000;
            this.cameras.main.fadeOut(700, 0, 0, 0);
        }
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start("platformerScene");
        })

    }
    collides(a, b){
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}