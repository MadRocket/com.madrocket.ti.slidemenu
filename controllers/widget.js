var drawer = {
  is_opened: false,
  initialize: function(content) {
    this.setWidth(content.width);
    this.add(content);
  },
  openDrawer: function() {
    this.fireEvent('open');
    $.content.animate(this.getDrawerOpenAnimation());
    this.is_opened = true;
  },
  closeDrawer: function() {
    this.fireEvent('close');
    $.content.animate(this.getDrawerCloseAnimation());
    this.is_opened = false;
  },
  toggleDrawer: function() {
    if(this.is_opened) {
      this.closeDrawer();
    }
    else {
      this.openDrawer();
    }
  }
};

_.extend($.leftDrawer, drawer, {
  getDrawerOpenAnimation: function() {
    var width = this.width;
    return Ti.UI.createAnimation({
      left  : width,
      curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
      duration : 150
    });
  },
  getDrawerCloseAnimation: function() {
    return Ti.UI.createAnimation({
      left : 0,
      curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
      duration : 150
    })
  }
});

_.extend($.rightDrawer, drawer, {
  getDrawerOpenAnimation: function() {
    var width = this.width;
    return Ti.UI.createAnimation({
      left : - width,
      curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
      duration : 150
    });
  },
  getDrawerCloseAnimation: function() {
    return Ti.UI.createAnimation({
      left : 0,
      curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
      duration : 150
    })
  }
});

var touchStartX = 0;
var touchStarted = false;

$.content.addEventListener('touchstart', function(event) {
  touchStartX = parseInt(event.x, 10);
  touchStarted = true;
});

$.content.addEventListener('touchend', function(event) {
  touchStarted = false;

  var coords = event.source.convertPointToView({x:event.x,y:event.y}, $.slideMenu);
  var touchEndX = parseInt(event.x, 10);

  var delta = touchEndX - touchStartX;

  if(delta == 0) { return false; }

  if($.content.left > 0) {
    if (delta > 10) {
      $.leftDrawer.openDrawer();
    } else {
      $.leftDrawer.closeDrawer();
    }
    if (delta < -5) {
      $.leftDrawer.closeDrawer();
    } else {
      $.leftDrawer.openDrawer();
    }
  }
  else {
    if (delta > 5) {
      $.rightDrawer.closeDrawer();
    } else {
      $.rightDrawer.openDrawer();
    }
    if (delta < -10) {
      $.rightDrawer.openDrawer();
    } else {
      $.rightDrawer.closeDrawer();
    }
  }
});

$.content.addEventListener('touchmove', function(event) {
  var coords = event.source.convertPointToView({x:event.x,y:event.y}, $.slideMenu);
  var _x = parseInt(coords.x, 10);
  var newLeft = _x - touchStartX;
  var swipeToRight = newLeft > 0 ? true : false;
  var swipeToLeft = newLeft < 0 ? true : false;
  if (touchStarted) {
    if(swipeToRight) {
      $.leftDrawer.zIndex = 2;
      $.rightDrawer.zIndex = 1;
    }
    else {
      $.leftDrawer.zIndex = 1;
      $.rightDrawer.zIndex = 2;
    }

    if ((swipeToRight && newLeft <= $.leftDrawer.width) || (swipeToLeft && newLeft >= - $.rightDrawer.width)) {
      $.content.left = newLeft;
    }
  }
  if (newLeft > 10) {
    touchStarted = true;
  }
});

$.leftDrawer.addEventListener('open', function(){
  $.rightDrawer.is_opened = false;

  $.leftDrawer.zIndex = 2;
  $.rightDrawer.zIndex = 1;
  $.trigger('open:[left]');
});
$.leftDrawer.addEventListener('close', function(){
  $.trigger('close:[left]');
});

$.rightDrawer.addEventListener('open', function(){
  $.leftDrawer.is_opened = false;

  $.leftDrawer.zIndex = 1;
  $.rightDrawer.zIndex = 2;
  $.trigger('open:[right]');
});
$.rightDrawer.addEventListener('close', function(){
  $.trigger('close:[right]');
});


exports.init = function(options) {
  if(options.hasOwnProperty('leftDrawer')) {
    $.leftDrawer.initialize(options.leftDrawer);
  }
  else {
    $.slideMenu.remove($.leftDrawer);
  }
  if(options.hasOwnProperty('rightDrawer')) {
    $.rightDrawer.initialize(options.rightDrawer);
  }
  else {
    $.slideMenu.remove($.rightDrawer);
  }

  $.content.add(options.content);
};

exports.toggleRightDrawer = function(){ $.rightDrawer.toggleDrawer(); }
exports.toggleLeftDrawer = function(){ $.leftDrawer.toggleDrawer(); }
