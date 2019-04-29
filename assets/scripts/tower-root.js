var Game = require('game');
cc.Class({
    extends: cc.Component,

    properties: {
        tower: cc.Prefab,
        game: Game,
        // shoot音乐
        shootEffect: {
            type: cc.AudioClip,
            default: null
        }
    },

    createOne (dx, dy) {
        if (this.game.map[dx][dy] == -1) {
            return;
        }
        let t = cc.instantiate(this.tower);
        t.parent = this.node;
        t.x = 50 + dx * 100;
        t.y = 50 + dy * 100;
        // 地图上有了
        this.game.map[dx][dy] = -1;
    }
});
