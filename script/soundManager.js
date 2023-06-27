/*
*   This class is used to handle sounds
*   It can handle 
*   - playing sounds concurrently
*   - change, store and load volume from localStorage
*   - add any number of sounds
*   - cache sounds to prevent unnecessary extra loading
*   - call a function when sound is done playing
*/
export class SoundManager {
    // Associative array where name is the key and HTMLAudioElement is the value
    sounds = [];

    volume = 0.5;

    // Load volume from local storage on creation
    constructor() {
        this.loadVolume();

        this.addSound("player_hurt", "./sound/player/damage.ogg");
        this.addSound("player_shoot", "./sound/player/shoot.mp3");
        this.addSound("player_move", "./sound/player/steps.mp3");

        this.addSound("ranged_attack", "./sound/enemy/range_attack.mp3");
        this.addSound("ranged_death", "./sound/enemy/range_deathsound.mp3");

        this.addSound("melee_attack", "./sound/enemy/melee_attack.wav");
        this.addSound("melee_death", "./sound/enemy/melee_deathsound.wav");

        this.addSound("game_over", "./sound/game/game-over-arcade.mp3");
        this.addSound("menu_hover", "./sound/game/mouse_hover_menu.wav");
        this.addSound("background_music", "./sound/game/background_music.mp3");
    }

    // Get sound from array by name
    getSound(name) {
        return this.sounds[name];
    }

    // Add sound to the array
    // Returns Promise that resolves when sound is loaded
    async addSound(name, src) {
        const audio = new Audio(src);
        audio.volume = this.volume;

        return new Promise((resolve, reject) => {
            audio.onloadedmetadata = () => {
                this.sounds[name] = audio;
                resolve();
            }
        });
    }

    // Play a sound from name
    // Callback gets executed when sound is done playing
    async play(name, loop = false, callback) {
        try {
            const sound = this.getSound(name);

            sound.pause();
            sound.currentTime = 0;

            sound.loop = loop;
            await sound.play();
        } catch (e) {
            setTimeout(() => {
                this.play(name, loop, callback);
            }, 100);
            return;
        }
        

        if(callback) {
            if(loop) { // Does not work yet
                //this.callbackInterval = setInterval(callback, sound.duration * 1000);
            } else {
                setTimeout(() => {
                    callback();
                    this.stop();
                }, sound.duration * 1000);
            }
        }
    }

    // Workaround to not restart a sound that is already playing
    playIfNotPlaying(name, loop = false, callback) {
        if(this.getSound(name) && this.getSound(name).paused) {
            this.play(name, loop, callback);
        }
    }

    // Pauses current sound or all sounds if no argument is passed
    pause(name) {
        if(!name) {
            Object.keys(this.sounds).forEach(sound => { this.pause(sound) });
            return;
        }
        this.getSound(name).pause();

        if(this.callbackInterval) {
            clearInterval(this.callbackInterval);
            this.callbackInterval = 0;
        }
    }

    // Resumes current sound or all sounds if no argument is passed
    resume(name) {
        if(!name) {
            Object.keys(this.sounds).forEach(sound => { this.resume(sound) });
            return;
        }

        if(this.getSound(name).paused)
            this.getSound(name).play();
    }

    // Stops current sound or all sounds if no argument is passed
    stop(name) {
        if(!name) {
            Object.keys(this.sounds).forEach(sound => { this.stop(sound) });
            return;
        }

        this.getSound(name).pause();
        this.getSound(name).currentTime = 0;

        if(this.callbackInterval) {
            clearInterval(this.callbackInterval);
            this.callbackInterval = 0;
        }
    }

    // Sets volume in program and localstorage
    setVolume(volume) {
        this.volume = volume;
        window.localStorage.setItem("volume", volume);

        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume;
        })
    }

    // Loads volume from localstorage, 0.5 if it is not sent
    loadVolume() {
        this.volume = window.localStorage.getItem("volume");
        if(!this.volume) {
            this.volume = 0.5;
            window.localStorage.setItem("volume", this.volume);
        }

        this.setVolume(this.volume);
        return this.volume;
    }
};