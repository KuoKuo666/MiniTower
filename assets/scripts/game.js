var Global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        BK: cc.Node,
        road: cc.Prefab,
        block: cc.Prefab,
        // 场景音乐
        musicBGM: {
            type: cc.AudioClip,
            default: null
        }
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start () {
        cc.audioEngine.playMusic(this.musicBGM,true);
        // 复制一份
        this.map = null;
        this.copyMap(Global.map);
        // 生成地图
        this.initMap();
    },

    initMap () {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 6; j++) {
                if (this.map[i][j] != 0) {
                    this.createRoad(i, j);
                } else {
                    this.createBlock(i, j);
                }
            }
        }
    },

    createRoad (dx, dy) {
        let r = cc.instantiate(this.road);
        // BK锚点为0,0 且数组下标与xy轴相反
        r.parent = this.BK;
        r.x = 50 + dx * 100;
        r.y = 50 + dy * 100;
    },

    createBlock (dx, dy) {
        let r = cc.instantiate(this.block);
        // BK锚点为0,0 且数组下标与xy轴相反
        r.parent = this.BK;
        r.x = 50 + dx * 100;
        r.y = 50 + dy * 100;
    },

    copyMap (map) {
        this.map = [];
        for (let i = 0; i < 8; i++) {
            this.map[i] = [];
            for (let j = 0; j < 6; j++) {
                this.map[i][j] = map[i][j];
            }
        }
    }
});
