class Mobile {

    constructor(game, mobile) {
        this.game = game;
        this.active = mobile;
        this.platform = this.getMobileOperatingSystem();
    }

    getMobileOperatingSystem() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "mobile"; // "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "mobile"; // "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "mobile"; // "iOS";
        }

        return "desktop";
    }
}

export default Mobile;

