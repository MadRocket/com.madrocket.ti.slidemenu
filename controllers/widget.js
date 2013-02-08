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

$.leftDrawer.on('open', function(){
  $.leftDrawer.zIndex = 2;
  $.rightDrawer.zIndex = 1;
  $.trigger('open:[left]');
});
$.leftDrawer.on('close', function(){
  $.trigger('close:[left]');
});

$.rightDrawer.on('open', function(){
  $.leftDrawer.zIndex = 1;
  $.rightDrawer.zIndex = 2;
  $.trigger('open:[right]');
});
$.rightDrawer.on('close', function(){
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
