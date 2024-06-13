class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        //this.load.atlas("platformer_characters", "monochrome_tilemap_packed.png", "monochrome_tilemap.json");

        

        this.load.image("player_idle", "tile_0240.png");
        this.load.image("player_walk_1", "tile_0241.png");
        this.load.image("player_walk_2", "tile_0242.png");
        this.load.image("player_walk_3", "tile_0243.png");
        this.load.image("player_walk_4", "tile_0244.png");
        this.load.image("player_jump_1", "tile_0245.png");
        this.load.image("player_jump_2", "tile_0246.png");

        this.load.image("player2_idle", "tile_0045.png");
        this.load.image("player2_walk", "tile_0046.png");

        this.load.image("enemy_1", "tile_0320.png");
        this.load.image("enemy_2", "tile_0321.png");
        this.load.image("enemy_3", "tile_0322.png");
        this.load.image("enemy_4", "tile_0323.png");

        this.load.image("enemy2_1", "tile_0051.png");
        this.load.image("enemy2_2", "tile_0052.png");

        this.load.image("platform", "tile_0123.png");

        this.load.audio("door_sound", "doorOpen_2.ogg");
        this.load.audio("bounce_sound", "bounce_sound.wav");
        this.load.audio("gem_sound", "gem_sound.wav");
        this.load.audio("key_sound", "key_sound.wav");
        this.load.audio("jump_sound", "jump_sound.wav");
        this.load.audio("hit", "laserLarge_001.ogg");
        
        this.load.image("door", "tile_0057.png");

        // Load tilemap information
        this.load.image("tilemap_tiles", "monochrome_tilemap_packed.png");                         // Packed tilemap
        this.load.image("tilemap_tiles2", "tilemap_packed.png");
        this.load.tilemapTiledJSON("platformer-level", "platformer-level.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("platformer-level-2", "platformer-end-game.tmj");
        this.load.tilemapTiledJSON("platformer-level2", "platformer-level2.tmj");
        this.load.tilemapTiledJSON("platformer-level3", "platformer-level3.tmj");

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "monochrome_tilemap_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("tilemap_sheet2", "tilemap_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // Oooh, fancy. A multi atlas is a texture atlas which has the textures spread
        // across multiple png files, so as to keep their size small for use with
        // lower resource devices (like mobile phones).
        // kenny-particles.json internally has a list of the png files
        // The multiatlas was created using TexturePacker and the Kenny
        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
        
        this.anims.create({
            key: 'walk',
            frames: [
                {key: 'player_walk_1'},
                {key: 'player_walk_2'},
                {key: 'player_walk_3'},
                {key: 'player_walk_4'}
            ],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'walk2',
            frames: [
                {key: 'player2_idle'},
                {key: 'player2_walk', duration: 15}
            ],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy2',
            frames: [
                {key: 'enemy2_1'},
                {key: 'enemy2_2', duration: 30},
            ],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy',
            frames: [
                {key: 'enemy_1'},
                {key: 'enemy_2'},
                {key: 'enemy_3'}
            ],
            frameRate: 6,
            repeat: 1000
        });

        this.anims.create({
            key: 'idle',
            frames: [
                { key: "player_idle"}
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'idle2',
            frames: [
                { key: "player2_idle"}
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [
                { key: "player_jump_1", duration: 20},
                { key: "player_jump_2"}
            ],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jump2',
            frames: [
                { key: "player2_walk"}
            ],
            frameRate: 15,
            repeat: -1
        });

         // ...and pass to the next Scene
         this.scene.start("startGame");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}