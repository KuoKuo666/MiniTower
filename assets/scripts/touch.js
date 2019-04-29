var Tower = require('tower-root')
cc.Class({
    extends: cc.Component,

    properties: {
        tower: Tower,
    },

    start () {
        this.node.on('touchstart',this.touchStart,this);
    },

    touchStart (e) {
        let pos = e.getLocation();
        let dx = Math.floor(pos.x/100);
        let dy = Math.floor(pos.y/100);
        this.tower.createOne(dx, dy);
    }
});
