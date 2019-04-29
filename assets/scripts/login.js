cc.Class({
    extends: cc.Component,

    properties: {
        // 开始场景音乐
        loginMusic: {
            type: cc.AudioClip,
            default: null
        }
    },

    start () {
        cc.audioEngine.playMusic(this.loginMusic,true);
    },

    clickStart () {
        cc.audioEngine.stopMusic();
        cc.director.loadScene('game');
    },

    clickSetting () {
        cc.director.loadScene('setting');
    }
});
