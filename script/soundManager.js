export class SoundManager {
    sounds = [];
    activeSound;
    volume = 0.5;

    constructor(sounds) {
        this.volume = window.localStorage.getItem("volume");
        if(!this.volume) {
            this.volume = 0.5;
            window.localStorage.setItem("volume", this.volume);
        }

        if(sounds instanceof Array) {
            sounds.forEach(sound => {
                this.addSound(sound);
            });
        } else {
            this.addSound(sounds);
        }
    }

    addSound(name, src) {
        const audio = new Audio(src);
        audio.volume = this.volume;

        this.sounds[name] = audio;        
    }

    setVolume(volume) {
        this.volume = volume;

        this.sounds.forEach(sound => {
            sound.volume = volume;
        });
    }

    play(name) {
        if(!this.sounds[name].paused) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }

        this.sounds[name].play();

        this.activeSound = this.sounds[name];
    }

    stop() {
        this.activeSound.pause();
        this.activeSound.currentTime = 0;
    }
};