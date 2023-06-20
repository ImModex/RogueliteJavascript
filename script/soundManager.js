export class SoundManager {
    // Associative array where name is the key and HTMLAudioElement is the value
    sounds = [];

    volume = 0.5;

    // Load volume from local storage on creation
    constructor() {
        this.loadVolume();

        this.addSound("player_hurt", "./sound/player/damage.ogg");
        this.addSound("player_shoot", "./sound/player/shooting.mp3");
        this.addSound("player_move", "./sound/player/steps.mp3");

        this.addSound("enemy_shoot", "./sound/enemy/shooting.wav");
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
    play(name, loop = false, callback) {
        const sound = this.getSound(name);

        if(!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }

        sound.loop = loop;
        sound.play();
        

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

    playIfNotPlaying(name, loop = false, callback) {
        if(this.getSound(name) && this.getSound(name).paused) {
            this.play(name, loop, callback);
        }
    }

    pause() {
        this.sounds.keys().forEach(sound => { this.pause(sound) });
    }

    // Pauses current sound
    pause(name) {
        this.getSound[name].pause();

        if(this.callbackInterval) {
            clearInterval(this.callbackInterval);
            this.callbackInterval = 0;
        }
    }

    // Resumes currently paused sound
    resume() {
        this.sounds.keys().forEach(sound => { this.resume(sound) });
    }

    resume(name) {
        if(this.getSound[name].paused)
            this.getSound[name].play();
    }

    // Stops currently playing sound
    stop() {
        this.sounds.keys().forEach(sound => { this.stop(sound) });
    }

    stop(name) {
        this.getSound[name].stop();

        if(this.callbackInterval) {
            clearInterval(this.callbackInterval);
            this.callbackInterval = 0;
        }
    }

    // Sets volume in program and localstorage
    setVolume(volume) {
        this.volume = volume;
        window.localStorage.setItem("volume", volume);

        this.sounds.forEach(sound => {
            sound.volume = volume;
        });
    }

    // Loads volume from localstorage, 0.5 if it is not sent
    loadVolume() {
        this.volume = window.localStorage.getItem("volume");
        if(!this.volume) {
            this.volume = 0.5;
            window.localStorage.setItem("volume", this.volume);
        }
    }
};