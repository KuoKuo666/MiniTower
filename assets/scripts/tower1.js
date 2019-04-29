cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.timeCD = 0;
        this.isShoot = false;
        this.enemy = cc.find('Canvas/Enemy');
        //console.log(this.enemy);
        this.select = null;
        this.range = 200;

        this.effect = this.node.parent.getComponent('tower-root').shootEffect;
    },

    atkEnemy () {
        if (this.timeCD < 0.8) {
            return;
        }
        cc.audioEngine.playEffect(this.effect);
        this.isShoot = true;
        this.timeCD = 0;
        let x = this.select.x;
        let y = this.select.y;
        x = x - this.node.x;
        y = y - this.node.y;
        let s = this.node.getChildByName('shoot');
        s.runAction(
            cc.sequence(
                cc.moveTo(0.2, x, y),
                cc.callFunc(()=>{
                    if (s.x != 0 || s.y != 0) {
                        s.x = 0;
                        s.y = 0;
                        this.isShoot = false;
                    }
                },this))
            );
    },

    update (dt) {
        this.timeCD += dt;
        if (this.isShoot) {
            return;
        }
        // 先测试选定者
        if (this.select && this.select.position.sub(this.node.position).mag < this.range) {
            this.atkEnemy();
            return;
        }
        // 遍历敌人层
        for (let i = 0; i < this.enemy.childrenCount; i++) {
            if (this.enemy.children[i].position.sub(this.node.position).mag() < this.range) {
                this.select = this.enemy.children[i];
                this.atkEnemy();
                break;
            }
        }
    }

});
