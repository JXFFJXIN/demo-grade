/**
 * 
 * @param {*} options 
 */
function StarRating(options) {
    this.max = options.max || 5;
    this.disabled = options.disabled;
    this.score = options.score || 0;
    this.dom = document.createElement('div');
    this.message = options.message || [];
}
StarRating.prototype.init = function () {
    this.createDom();
    if (!this.disabled) {
        this.bindEvent()
    }
}
StarRating.prototype.createDom = function () {
    this.dom.className = 'rate';
    var activeIndex = Math.floor(this.score);
    for (var i = 0; i < this.max; i++) {
        var oSpan = document.createElement('span');
        oSpan.className = 'rate-item';
        oSpan.setAttribute('data-score', i + 1)
        if (i < activeIndex) {
            oSpan.classList.add('rate-item-on')
        }
        this.dom.appendChild(oSpan);
    }
    var textSpan = document.createElement('span');
    textSpan.className = 'rate-text';
    // console.log()
    var showTextIndex = Math.floor(this.score / (this.max / this.message.length));
    
    textSpan.innerText = this.message[showTextIndex];
    this.dom.appendChild(textSpan);
}

StarRating.prototype.bindEvent = function () {
    var self = this;
    this.dom.onmouseover = function (e) {
        console.log(e.target)
        var score = e.target.getAttribute('data-score');
        if (score) {
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
        if (i < score) {
            items[i].classList.add('rate-item-on')
        } else {
            items[i].classList.remove('rate-item-on')
        }
    }
}