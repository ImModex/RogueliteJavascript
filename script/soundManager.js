export class SoundManager {
    
    // Associative array where name is the key and HTMLAudioElement is the value
    sounds = [];

    // Reference to the active sound
    activeSound;

    volume = 0.5;

    // ID of callback Interval if looped sound is  playing
    callbackInterval = 0;

    // Load volume from local storage on creation
    constructor() {
        this.loadVolume();
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

        if(loop) {
            this.callbackInterval = setInterval(callback, sound.duration * 1000);
            console.log(sound.duration);
        } else {
            setTimeout(() => {
                callback();
                this.stop();
            }, sound.duration * 1000);
        }

        this.activeSound = sound;
    }

    // Pauses current sound
    pause() {
        this.activeSound.pause();

        if(this.callbackInterval) {
            clearInterval(this.callbackInterval);
            this.callbackInterval = 0;
        }
    }

    // Resumes currently paused sound
    resume() {
        if(this.activeSound && this.activeSound.paused) {
            this.activeSound.play();
        }
    }

    // Stops currently playing sound
    stop() {
        this.activeSound.pause();
        this.activeSound.currentTime = 0;

        if(this.callbackInterval) {
            clearInterval(this.callbackInterval);
            this.callbackInterval = 0;
        }

        this.activeSound = null;
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