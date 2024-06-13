class Level3 extends Phaser.Scene {
    constructor() {
        super("level3");

        my.sprite.enemies = [];
        my.sprite.enemies2 = [];
    }

    init(data) {
        // variables and settings
        this.ACCELERATION = 750;
        this.DRAG = 2900;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -800;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 1.0;
        my.sprite.enemies = [];
        my.sprite.enemies2 = [];
        this.gemsCollected = data.gemsCollected;
        this.keyCollected = 0;
    }

    create() {
        this.map = this.add.tilemap("platformer-level3", 16, 16, 100*16, 40*16);
        this.physics.world.setBounds(0,0, 100*16, 40*16, true, false, false, false);

        this.tileset1 = this.map.addTilesetImage("line-tileset", "tilemap_tiles2");
        this.tileset2 = this.map.addTilesetImage("1-bit-tileset", "tilemap_tiles");

        this.backgroundLayer = this.map.createLayer("Background", [this.tileset1,this.tileset2], 0, 0);
        this.backgroundLayer.setScale(3.0, 3.0);
        this.platformLayer = this.map.createLayer("Platforms", [this.tileset1,this.tileset2], 0, 0);
        this.platformLayer.setScale(3.0, 3.0);
        this.detailsLayer = this.map.createLayer("Details", [this.tileset1,this.tileset2], 0, 0);
        this.detailsLayer.setScale(3.0, 3.0);
        this.platformLayer.setCollisionByProperty({
            collides: true
        });

        this.gems = this.map.createFromObjects("Gems", {
            name: "gem",
            key: "tilemap_sheet",
            frame: 82
        });

        this.keys = this.map.createFromObjects("Key", {
            name: "key",
            key: "tilemap_sheet",
            frame: 96
        });

        this.gems.map((gem) => {
            gem.x *= 3.0;
            gem.y *= 3.0;
            gem.setScale(3.0);
        });

        this.keys.map((key) => {
            key.x *= 3.0;
            key.y *= 3.0;
            key.setScale(3.0);
        });
        
        this.physics.world.enable(this.gems, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.keys, Phaser.Physics.Arcade.STATIC_BODY);
        
        this.gemGroup = this.add.group(this.gems);
        this.keyGroup = this.add.group(this.keys);
        
        this.respawn1y = 4380; 
        this.respawn2y = 2250; 

        //player
        my.sprite.player = this.physics.add.sprite(164, 1480, "player_idle");
        my.sprite.player.setScale(3.0);
        my.sprite.player.respawnx = 700;
        my.sprite.player.respawny = 4380;
        my.sprite.player.body.gravity.y = 1500;
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.body.setMaxVelocity(550, 1100);

        this.physics.world.TILE_BIAS = 32;

        this.enemies1points = [
            2350, 1280,
            2550, 1280,
        ];
        this.enemies1curve = new Phaser.Curves.Spline(this.enemies1points);
        this.enemies2points = [
            2550, 790,
            2350, 790,
        ];
        this.enemies2curve = new Phaser.Curves.Spline(this.enemies2points);
        this.enemies3points = [
            950, 700,
            950, 400,
        ];
        this.enemies3curve = new Phaser.Curves.Spline(this.enemies3points);
        this.enemies4points = [
            3555, 1400,
            3555, 700,
        ];
        this.enemies4curve = new Phaser.Curves.Spline(this.enemies4points);
        this.enemies5curve = new Phaser.Curves.Spline(this.enemies5points);
        this.enemies6points = [
            2460, 1370,
            2460, 1100,
        ];
        this.enemies6curve = new Phaser.Curves.Spline(this.enemies6points);
        this.enemies7points = [
            3197, 1272,
            3380, 1272,
        ];
        this.enemies7curve = new Phaser.Curves.Spline(this.enemies7points);
        this.enemies8points = [
            600, 1416,
            900, 1416,
        ];
        this.enemies8curve = new Phaser.Curves.Spline(this.enemies8points);
        this.enemies9points = [
            1284, 1080,
            795, 1080,
        ];
        this.enemies9curve = new Phaser.Curves.Spline(this.enemies9points);
        this.plat1points = [
            695, 1184,
            695, 950,
            1600, 950,
        ];
        this.plat1curve = new Phaser.Curves.Spline(this.plat1points);

        my.sprite.enemies.push(this.add.follower(this.enemies1curve, 2350, 1190, "enemy2_1"));
        my.sprite.enemies[0].setScale(3.0);
        this.physics.add.existing(my.sprite.enemies[0]);
        my.sprite.enemies[0].body.gravity.y = 0;
        my.sprite.enemies[0].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies2curve, 2550, 900, "enemy2_1"));
        my.sprite.enemies[1].setScale(3.0);
        this.physics.add.existing(my.sprite.enemies[1]);
        my.sprite.enemies[1].body.gravity.y = 0;
        my.sprite.enemies[1].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies3curve, 1060, 1800, "enemy2_1"));
        my.sprite.enemies[2].setScale(3.0);
        this.physics.add.existing(my.sprite.enemies[2]);
        my.sprite.enemies[2].body.gravity.y = 0;
        my.sprite.enemies[2].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies4curve, 3555, 1600, "enemy2_1"));
        my.sprite.enemies[3].setScale(3.0);
        this.physics.add.existing(my.sprite.enemies[3]);
        my.sprite.enemies[3].body.gravity.y = 0;
        my.sprite.enemies[3].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies6curve, 1550, 1370, "enemy2_1"));
        my.sprite.enemies[4].setScale(3.0);
        this.physics.add.existing(my.sprite.enemies[4]);
        my.sprite.enemies[4].body.gravity.y = 0;
        my.sprite.enemies[4].body.immovable = true;

        my.sprite.enemies2.push(this.add.follower(this.enemies7curve, 3197, 1272, "enemy_1"));
        my.sprite.enemies2[0].setScale(3.0);
        this.physics.add.existing(my.sprite.enemies2[0]);
        my.sprite.enemies2[0].body.gravity.y = 0;

        my.sprite.enemies2.push(this.add.follower(this.enemies8curve, 600, 1416, "enemy_1"));
        my.sprite.enemies2[1].setScale(3.0);
        this.physics.add.existing(my.sprite.enemies2[1]);
        my.sprite.enemies2[1].body.gravity.y = 0;

        my.sprite.enemies2.push(this.add.follower(this.enemies9curve, 1284, 1080, "enemy_1"));
        my.sprite.enemies2[2].setScale(3.0);
        this.physics.add.existing(my.sprite.enemies2[2]);
        my.sprite.enemies2[2].body.gravity.y = 0;


        my.sprite.plat1 = this.add.follower(this.plat1curve, 695, 1030, "platform");
        my.sprite.plat1.setScale(5.0, 3.0);
        this.physics.add.existing(my.sprite.plat1);
        this.physics.add.collider(my.sprite.player, my.sprite.plat1);
        my.sprite.plat1.body.allowGravity = false;
        my.sprite.plat1.body.immovable = true;

        for(let i = 0; i < 5; i++){
            my.sprite.enemies[i].startFollow({from: 0, to: 1, delay: 0, duration: 1000, ease: 'Sine.easeInOut', repeat: -1, yoyo: true, rotateToPath: false, rotationOffset: -90});
        }
        
        for(let i = 0; i < 3; i++){
            my.sprite.enemies2[i].startFollow({from: 0, to: 1, delay: 0, duration: 2000, ease: 'Sine.easeInOut', repeat: -1, yoyo: true, rotateToPath: false, rotationOffset: -90});
        }
        
        my.sprite.plat1.startFollow({from: 0, to: 1, delay: 0, duration: 4500, ease: 'Linear', repeat: -1, yoyo: true, rotateToPath: false, rotationOffset: -90});

        my.sprite.door = this.add.sprite(4729, 796, "door");
        my.sprite.door.setScale(2.5);

        this.physics.add.collider(my.sprite.player, this.platformLayer);

        this.physics.add.overlap(my.sprite.player, this.gemGroup, (obj1, obj2) => {
            obj2.destroy(); 
            this.sound.play("gem_sound", {
                volume: 0.6 
            });
            this.gemsCollected += 1;
        });

        this.physics.add.overlap(my.sprite.player, this.keyGroup, (obj1, obj2) => {
            obj2.destroy(); 
            this.sound.play("key_sound", {
                volume: 0.6 
            });
            this.keyCollected = 1;
        });
        
        cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        my.vfx.walking = this.add.particles(0, 2, "kenny-particles", {
            frame: ['star_02.png', 'star_03.png'],
            scale: {start: 0.06, end: 0.107, random: false},
            lifespan: 500,
            alpha: {start: 1, end: 0, gravity: 0}, 
        });

        my.vfx.jumping = this.add.particles(0, 0, "kenny-particles", {
            frame: ['flame_01.png', 'flame_02.png', 'flame_03.png', 'flame_04.png'],
            scale: {start: 0.03, end: 0.04, random: false},
            lifespan: 300,
            alpha: {start: 0.5, end: 0.2, gravity: 0}, 
        });

        my.vfx.walking.stop();
        my.vfx.jumping.stop();

        // TODO: add camera code here
        this.cameras.main.setBounds(0, 0, 4780, 1920);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.centerOn(my.sprite.player.x, my.sprite.player.y);
        this.cameras.main.setZoom(0.8);

    }

    update() {
        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-10, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();
                my.vfx.jumping.stop();

            }

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-10, false);

            my.vfx.walking.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();
                my.vfx.jumping.stop();

            }

        } else {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            my.vfx.walking.stop();
        }

        //Movement
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

        //Enemy collision
        for(let enemy of my.sprite.enemies){
            enemy.anims.play('enemy2', true);
            this.physics.world.collide(my.sprite.player, enemy, function(player, enemy){
                if(enemy.body.touching.up && player.body.touching.down){
                    my.sprite.player.body.setVelocityY(-1000);
                }
            });
            if(this.collides(enemy, my.sprite.player)){
                this.sound.play("hit", {
                    volume: 0.3   // Can adjust volume using this, goes from 0 to 1
                });
                my.sprite.player.x = my.sprite.player.respawnx;
                my.sprite.player.y = my.sprite.player.respawny;
            }
        }

        for(let enemy of my.sprite.enemies2){
            enemy.anims.play('enemy', true);
            if(this.collides(enemy, my.sprite.player)){
                this.sound.play("hit", {
                    volume: 0.3   // Can adjust volume using this, goes from 0 to 1
                });
                my.sprite.player.x = my.sprite.player.respawnx;
                my.sprite.player.y = my.sprite.player.respawny;
            }
        }

        this.physics.world.collide(my.sprite.player, my.sprite.plat1, function(player, plat1){
            if(plat1.body.touching.up && player.body.touching.down){
                console.log("hu");
                //my.sprite.player.body.x = my.sprite.plat1.x + 10;
                //my.sprite.player.body.y = my.sprite.plat1.y - 15;
            }
        });

        //respawn
        if(my.sprite.player.x < 2230){
            my.sprite.player.respawnx = 75;
            my.sprite.player.respawny = 1000;
        }
        else{
            my.sprite.player.respawnx = 2242;
            my.sprite.player.respawny = 345;
        }

        //oob
        if(my.sprite.player.y > 2000) {
            this.sound.play("hit", {
                volume: 0.3   // Can adjust volume using this, goes from 0 to 1
            });
            my.sprite.player.x = my.sprite.player.respawnx;
            my.sprite.player.y = my.sprite.player.respawny;
        }

        //door
        if(this.collides(my.sprite.player, my.sprite.door) && this.keyCollected == 1){
            this.sound.play("door_sound", {
                volume: 0.4   // Can adjust volume using this, goes from 0 to 1
            });
            this.cameras.main.stopFollow();
            my.sprite.player.x = -2000
            this.cameras.main.fadeOut(700, 0, 0, 0);
        }
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start("beatGame", {gemsCollected: this.gemsCollected});
        })
    }

    collides(a, b){
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2-20 + b.displayHeight/2-20)) return false;
        return true;
    }
}
