cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.node.runAction(cc.repeatForever(cc.rotateBy(5,360)));
    },

    // 碰撞后
    onCollisionEnter: function (other, self) {
        this.node.stopAllActions();
        this.node.parent.getComponent('tower1').isShoot = false;
        this.node.x = 0;
        this.node.y = 0;
    }

});
