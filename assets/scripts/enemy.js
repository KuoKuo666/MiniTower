var Global = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.hp = Math.floor(20 + 10 * Math.random());
        this.hpLab = this.node.getChildByName('hp').getComponent(cc.Label);
        this.hpLab.string = this.hp + '';
    },

    start () {
        this.startPoint = cc.v2(Global.start[0], Global.start[1]);
        this.now = Global.map[this.startPoint.x][this.startPoint.y];
        this.node.x = 50 + this.startPoint.x * 100;
        this.node.y = 50 + this.startPoint.y * 100;
        // 开始向着结尾进发
        this.now += 1;
        this.enemyGo(this.startPoint.x, this.startPoint.y);
    },

    // 碰撞后
    onCollisionEnter: function (other, self) {
        this.hp -= 1;
        this.hpLab.string = this.hp + '';
        if (this.hp <= 0) {
            this.node.destroy();
        }
    },

    enemyGo (x, y) {
        if (Global.map[x][y] == Global.end) {
            this.node.destroy();
            return;
        }
        let dir = [[0,1],[1,0],[0,-1],[-1,0]];
        // 4个方向
        for (let k = 0; k < 4 ; k++) {
            let mx = x + dir[k][0];
            let my = y + dir[k][1];
            if (mx < 0 || mx > 8 || my < 0 || my > 6) {
                continue;
            }
            if (this.now == Global.map[mx][my]) {
                this.now += 1;
                this.node.runAction(cc.sequence(
                    cc.moveTo(1, 50 + mx * 100, 50 + my * 100),
                    cc.callFunc(() => {
                        this.enemyGo(mx, my);
                    },this)
                ));
                break;
            }
        }
    }
});
