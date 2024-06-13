class Level2 extends Phaser.Scene {
    constructor() {
        super("level2");

        my.sprite.enemies = [];
        this.gemsCollected;
    }

    init(data) {
        // variables and settings
        this.ACCELERATION = 750;
        this.DRAG = 2900;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -870;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 1.0;
        my.sprite.enemies = [];
        this.gemsCollected = data.gemsCollected;
    }

    create() {
        this.map = this.add.tilemap("platformer-level2", 16, 16, 30*16, 100*16);
        this.physics.world.setBounds(0,0, 1440, 1000*16, true, true, false, false);

        this.tileset = this.map.addTilesetImage("line_tilemap", "tilemap_sheet2");

        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.backgroundLayer.setScale(3.0, 3.0);
        this.platformLayer = this.map.createLayer("Platform", this.tileset, 0, 0);
        this.platformLayer.setScale(3.0, 3.0);
        this.detailsLayer = this.map.createLayer("Details", this.tileset, 0, 0);
        this.detailsLayer.setScale(3.0, 3.0);
        this.platformLayer.setCollisionByProperty({
            collides: true
        });

        this.gems = this.map.createFromObjects("Gems", {
            name: "gem",
            key: "tilemap_sheet",
            frame: 82
        });

        this.gems.map((gem) => {
            gem.x *= 3.0;
            gem.y *= 3.0;
            gem.setScale(3.0);
        });
        
        this.physics.world.enable(this.gems, Phaser.Physics.Arcade.STATIC_BODY);
        
        this.gemGroup = this.add.group(this.gems);
        
        this.respawn1y = 4380; 
        this.respawn2y = 2228; 

        //player
        my.sprite.player = this.physics.add.sprite(700, 4380, "player2_idle");
        my.sprite.player.setScale(3.5);
        my.sprite.player.respawnx = 700;
        my.sprite.player.respawny = 4380;
        my.sprite.player.body.gravity.y = 1500;
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.body.setMaxVelocity(550, 1100);

        this.physics.world.TILE_BIAS = 24;

        this.enemies1points = [
            950, 3550,
            1050, 3550,
        ];
        this.enemies1curve = new Phaser.Curves.Spline(this.enemies1points);
        this.enemies2points = [
            288, 3312,
            480, 3312,
        ];
        this.enemies2curve = new Phaser.Curves.Spline(this.enemies2points);
        this.enemies3points = [
            672, 2640,
            672, 2928,
        ];
        this.enemies3curve = new Phaser.Curves.Spline(this.enemies3points);
        this.enemies4points = [
            1104, 2592,
            1344, 2592,
        ];
        this.enemies4curve = new Phaser.Curves.Spline(this.enemies4points);
        this.enemies5points = [
            240, 1968,
            432, 1968,
        ];
        this.enemies5curve = new Phaser.Curves.Spline(this.enemies5points);
        this.enemies6points = [
            432, 1728,
            240, 1728,
        ];
        this.enemies6curve = new Phaser.Curves.Spline(this.enemies6points);
        this.enemies7points = [
            528, 1056,
            720, 816,
            912, 1056,
            528, 1056,
        ];
        this.enemies7curve = new Phaser.Curves.Spline(this.enemies7points);
        this.enemies8points = [
            720, 816,
            912, 1056,
            528, 1056,
            720, 816,
        ];
        this.enemies8curve = new Phaser.Curves.Spline(this.enemies8points);
        this.enemies9points = [
            912, 1056,
            528, 1056,
            720, 816,
            912, 1056,
        ];
        this.enemies9curve = new Phaser.Curves.Spline(this.enemies9points);

        my.sprite.enemies.push(this.add.follower(this.enemies1curve, 950, 3550, "enemy2_1"));
        my.sprite.enemies[0].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[0]);
        my.sprite.enemies[0].body.gravity.y = 0;
        my.sprite.enemies[0].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies2curve, 288, 3312, "enemy2_1"));
        my.sprite.enemies[1].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[1]);
        my.sprite.enemies[1].body.gravity.y = 0;
        my.sprite.enemies[1].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies3curve, 672, 2640, "enemy2_1"));
        my.sprite.enemies[2].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[2]);
        my.sprite.enemies[2].body.gravity.y = 0;
        my.sprite.enemies[2].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies4curve, 1104, 2592, "enemy2_1"));
        my.sprite.enemies[3].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[3]);
        my.sprite.enemies[3].body.gravity.y = 0;
        my.sprite.enemies[3].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies5curve, 240, 1968, "enemy2_1"));
        my.sprite.enemies[4].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[4]);
        my.sprite.enemies[4].body.gravity.y = 0;
        my.sprite.enemies[4].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies6curve, 432, 1728, "enemy2_1"));
        my.sprite.enemies[5].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[5]);
        my.sprite.enemies[5].body.gravity.y = 0;
        my.sprite.enemies[5].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies7curve, 528, 1056, "enemy2_1"));
        my.sprite.enemies[6].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[6]);
        my.sprite.enemies[6].body.gravity.y = 0;
        my.sprite.enemies[6].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies8curve, 720, 816, "enemy2_1"));
        my.sprite.enemies[7].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[7]);
        my.sprite.enemies[7].body.gravity.y = 0;
        my.sprite.enemies[7].body.immovable = true;

        my.sprite.enemies.push(this.add.follower(this.enemies9curve, 912, 1056, "enemy2_1"));
        my.sprite.enemies[8].setScale(4.0);
        this.physics.add.existing(my.sprite.enemies[8]);
        my.sprite.enemies[8].body.gravity.y = 0;
        my.sprite.enemies[7].body.immovable = true;

        for(let i = 0; i < 6; i++){
            my.sprite.enemies[i].startFollow({from: 0, to: 1, delay: 0, duration: 1000, ease: 'Sine.easeInOut', repeat: -1, yoyo: true, rotateToPath: false, rotationOffset: -90});
        }
        my.sprite.enemies[6].startFollow({from: 0, to: 1, delay: 0, duration: 3200, ease: 'Linear', repeat: -1, yoyo: false, rotateToPath: false, rotationOffset: -90});
        my.sprite.enemies[7].startFollow({from: 0, to: 1, delay: 0, duration: 3200, ease: 'Linear', repeat: -1, yoyo: false, rotateToPath: false, rotationOffset: -90});
        my.sprite.enemies[8].startFollow({from: 0, to: 1, delay: 0, duration: 3200, ease: 'Linear', repeat: -1, yoyo: false, rotateToPath: false, rotationOffset: -90});

        my.sprite.door = this.add.sprite(735, 312, "door");
        my.sprite.door.setScale(3.0);

        this.physics.add.collider(my.sprite.player, this.platformLayer);

        this.physics.add.overlap(my.sprite.player, this.gemGroup, (obj1, obj2) => {
            obj2.destroy(); 
            this.sound.play("gem_sound", {
                volume: 0.6 
            });
            this.gemsCollected += 1;
        });
        
        cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        my.vfx.walking = this.add.particles(0, 2, "kenny-particles", {
            frame: ['star_02.png', 'star_03.png'],
            scale: {start: 0.02, end: 0.04, random: false},
            lifespan: 500,
            alpha: {start: 0.8, end: 0, gravity: 0}, 
        });

        my.vfx.jumping = this.add.particles(0, 0, "kenny-particles", {
            frame: ['flame_01.png', 'flame_02.png', 'flame_03.png', 'flame_04.png'],
            scale: {start: 0.03, end: 0.04, random: false},
            lifespan: 200,
            alpha: {start: 0.5, end: 0.2, gravity: 0}, 
        });

        my.vfx.walking.stop();
        my.vfx.jumping.stop();

        // TODO: add camera code here
        this.cameras.main.setBounds(0, 0, 1440, 4780);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.centerOn(my.sprite.player.x, my.sprite.player.y);
        this.cameras.main.setZoom(1.2);

    }

    update() {

        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk2', true);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-27, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();
                my.vfx.jumping.stop();

            }

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk2', true);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-27, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();
                my.vfx.jumping.stop();

            }

        } else {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle2');
            my.vfx.walking.stop();
        }

        //jumping
        if(!my.sprite.player.body.blocked.down) {
            my.vfx.jumping.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-27, my.sprite.player.displayHeight/2-15, false);
            my.sprite.player.anims.play('jump2');
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
                    my.sprite.player.body.setVelocityY(-900);
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

        //respawn
        if(my.sprite.player.y < 2230){
            my.sprite.player.respawny = 2228;
        }
        else{
            my.sprite.player.respawny = 4380;
        }

        //oob
        if(my.sprite.player.y > 4900) {
            this.sound.play("hit", {
                volume: 0.3   // Can adjust volume using this, goes from 0 to 1
            });
            my.sprite.player.x = my.sprite.player.respawnx;
            my.sprite.player.y = my.sprite.player.respawny;
        }

        //door
        if(this.collides(my.sprite.player, my.sprite.door)){
            this.sound.play("door_sound", {
                volume: 0.4   // Can adjust volume using this, goes from 0 to 1
            });
            this.cameras.main.stopFollow();
            my.sprite.player.x = -2000
            this.cameras.main.fadeOut(700, 0, 0, 0);
        }
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start("level3", {gemsCollected: this.gemsCollected});
        })
    }

    collides(a, b){
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2-15 + b.displayHeight/2-15)) return false;
        return true;
    }
}
