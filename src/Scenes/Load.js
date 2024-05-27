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

        this.load.image("enemy_1", "tile_0320.png");
        this.load.image("enemy_2", "tile_0321.png");
        this.load.image("enemy_3", "tile_0322.png");
        this.load.image("enemy_4", "tile_0323.png");

        this.load.audio("door_sound", "doorOpen_2.ogg");
        this.load.audio("gem_sound", "jingles_NES09.ogg");
        this.load.audio("hit", "laserLarge_001.ogg");
        
        this.load.image("door", "tile_0057.png");
        // Load tilemap information
        this.load.image("tilemap_tiles", "monochrome_tilemap_packed.png");                         // Packed tilemap
        this.load.tilemapTiledJSON("platformer-level", "platformer-level.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("platformer-level-2", "platformer-level-2.tmj");

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "monochrome_tilemap_packed.png", {
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
            key: 'jump',
            frames: [
                { key: "player_jump_1" , duration: 70 },
                {key: "player_jump_2"}
            ],
            frameRate: 15,
            repeat: -1
        });

         // ...and pass to the next Scene
         this.scene.start("platformerScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}