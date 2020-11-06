/**
 * 
 * @param {object} options 
 *        {Number}max: 最大的分数
 *        {Number}score：当前的评分
 *        {Array}message：每一个分数对应的描述
 *        {Boolean}disable：是否禁用（修改分数）
 */
function StarRating(options) {
    this.max = options.max || 5;
    this.disabled = !!options.disabled;
    this.score = options.score || 0;
    this.dom = document.createElement('div');
    this.message = options.message || ['极差', '合格', '中等', '良好', '优秀'];
}
// 初始化结构以及功能
StarRating.prototype.init = function () {
    // 1. 创建评分的结构
    this.createDom();
    // 2. 修改评分的功能
    if (!this.disabled) {
        // 绑定事件
        this.bindEvent()
    }
}
// 创建评分结构
StarRating.prototype.createDom = function () {
    this.dom.className = 'rate';
    var activeIndex = Math.floor(this.score);
    for (var i = 0; i < this.max; i++) {//循环max长度
        var oSpan = document.createElement('span');//创建span
        oSpan.className = 'rate-item';//添加类名
        oSpan.setAttribute('data-score', i + 1)
        if (i < activeIndex) {
            oSpan.classList.add('rate-item-on')
            // classList.add()
        }
        this.dom.appendChild(oSpan);//dom插入创建的span
    }
    var textSpan = document.createElement('span');
    textSpan.className = 'rate-text';
    // console.log()
    var showTextIndex = Math.floor(this.score / (this.max / this.message.length));
    
    textSpan.innerText = this.message[showTextIndex];
    this.dom.appendChild(textSpan);
}
// 绑定事件
StarRating.prototype.bindEvent = function () {
    var self = this;
    this.dom.onmouseover = function (e) {
        // mouseenter 不会冒泡 鼠标移到元素触发事件 不能找到子元素
        // mouseover 会冒泡 鼠标移到元素触发事件 可以找到子元素
        console.log(e.target)
        var score = e.target.getAttribute('data-score');
        if (score) {
            // 修改评分的样式
            self.changeRating(score);
            self.dom.onmouseleave = function (e) {
                self.score = 0
                self.changeRating(self.score)
            }
    
            self.dom.onclick = function (e) {
                self.dom.onmouseleave = null;
                var score = e.target.getAttribute('data-score');
                self.score = score;
                self.changeRating(self.score);
            }
        }
      
    }

}
// 改变评分样式
StarRating.prototype.changeRating = function (score) {
    var rateText = this.dom.querySelector('.rate-text');
    var showTextIndex = Math.floor(score / (this.max / this.message.length));
    console.log(showTextIndex)
    if (showTextIndex >= this.message.length) {
        showTextIndex = this.message.length - 1;
    }
    rateText.innerText = this.message[showTextIndex] || '';
    var items = this.dom.querySelectorAll('.rate-item');
    for (var i = 0; i < items.length; i++) {
        // 判断当前星星是不是小于等于评分
        // 如果是则修改class类名
        // 如果不是则移除class类名
        if (i < score) {
            items[i].classList.add('rate-item-on')
        } else {
            items[i].classList.remove('rate-item-on')
        }
    }
}