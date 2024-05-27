class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");

        my.sprite.enemies = [];
    }

    init() {
        // variables and settings
        this.ACCELERATION = 400;
        this.DRAG = 3500;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -650;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 1.0;
        my.sprite.enemies = [];
    }

    create() {
        this.map = this.add.tilemap("platformer-level", 16, 16, 1000, 30);

        this.tileset = this.map.addTilesetImage("1-bit-tileset", "tilemap_sheet");

        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.backgroundLayer.setScale(1.4, 1.4);
        this.platformLayer = this.map.createLayer("Platforms", this.tileset, 0, 0);
        this.platformLayer.setScale(1.4, 1.4);
        this.detailsLayer = this.map.createLayer("Details", this.tileset, 0, 0);
        this.detailsLayer.setScale(1.4, 1.4);

        // Make it collidable
        this.platformLayer.setCollisionByProperty({
            collides: true
        });

        this.gems = this.map.createFromObjects("Gems", {
            name: "gem",
            key: "tilemap_sheet",
            frame: 82
        });

        this.gems.map((gem) => {
            gem.x *= 1.4;
            gem.y *= 1.4;
            gem.setScale(1.4);
        });
        
        this.physics.world.enable(this.gems, Phaser.Physics.Arcade.STATIC_BODY);
        
        this.gemGroup = this.add.group(this.gems);
        

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(25, 535, "player_idle");
        my.sprite.player.setScale(1.4);
        my.sprite.player.setCollideWorldBounds(false);

        my.sprite.enemies.push(this.add.sprite(167, 548, "enemy_1"));
        my.sprite.enemies[0].setScale(1.4);
        my.sprite.enemies.push(this.add.sprite(413, 369, "enemy_1"));
        my.sprite.enemies[1].setScale(1.4);
        my.sprite.enemies.push(this.add.sprite(1022, 392, "enemy_1"));
        my.sprite.enemies[2].setScale(1.4);
        my.sprite.enemies.push(this.add.sprite(1378, 436, "enemy_1"));
        my.sprite.enemies[3].setScale(1.4);
        my.sprite.enemies.push(this.add.sprite(1946, 548, "enemy_1"));
        my.sprite.enemies[4].setScale(1.4);

        my.sprite.door = this.add.sprite(2131, 125, "door");
        my.sprite.door.setScale(1.4);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.platformLayer);

        // TODO: Add coin collision handler
        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.gemGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            this.sound.play("gem_sound", {
                volume: 0.6   // Can adjust volume using this, goes from 0 to 1
            });
        });
        

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // TODO: Add movement vfx here
        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['star_02.png', 'star_03.png'],
            scale: {start: 0.03, end: 0.05, random: false},
            lifespan: 300,
            alpha: {start: 0, end: 1, gravity: 100}, 
        });

        my.vfx.jumping = this.add.particles(0, 0, "kenny-particles", {
            frame: ['flame_01.png', 'flame_02.png', 'flame_03.png', 'flame_04.png'],
            scale: {start: 0.03, end: 0.05, random: true},
            lifespan: 250,
            alpha: {start: 1, end: 2, gravity: -1000}, 
        });

        my.vfx.walking.stop();
        my.vfx.jumping.stop();

        // TODO: add camera code here
        this.cameras.main.setBounds(-50, 0);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.centerOn(my.sprite.player.x, my.sprite.player.y);
        this.cameras.main.setZoom(1.0);

    }

    update() {

        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip(false, true);
            my.sprite.player.anims.play('walk', true);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-10, false);

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
        }
        for(let enemy of my.sprite.enemies){
            enemy.anims.play('enemy', true);
            if(this.collides(enemy, my.sprite.player)){
                this.sound.play("hit", {
                    volume: 0.3   // Can adjust volume using this, goes from 0 to 1
                });
                this.scene.restart();
            }
        }
        if(my.sprite.player.y > 1100) {
            this.scene.restart();
        }

        if(this.collides(my.sprite.player, my.sprite.door)){
            this.sound.play("door_sound", {
                volume: 0.4   // Can adjust volume using this, goes from 0 to 1
            });
            this.cameras.main.stopFollow();
            my.sprite.player.x = -2000
            this.cameras.main.fadeOut(700, 0, 0, 0);
        }
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start("beatGame", {score: this.myScore});
        })
    }

    collides(a, b){
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}
