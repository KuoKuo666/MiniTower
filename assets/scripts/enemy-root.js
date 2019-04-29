cc.Class({
    extends: cc.Component,

    properties: {
        enemy: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.schedule(this.createOne,3,cc.macro.REPEAT_FOREVER,0);
    },

    createOne () {
        let e = cc.instantiate(this.enemy);
        e.parent = this.node;
    }
});
