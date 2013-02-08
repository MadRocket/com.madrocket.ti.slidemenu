var defaults = {
  leftDrawerWidth:  250,
  rightDrawerWidth: 250
}

$._params = {};

var drawer = {
  is_opened: false,
  openDrawer: function() {
    $.slideMenu.fireEvent('open');
    $.content.animate(this.drawerOpenAnimation);
    this.is_opened = true;
  },
  closeDrawer: function() {
    $.slideMenu.fireEvent('close');
    $.content.animate(this.drawerCloseAnimation);
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
  drawerOpenAnimation: Ti.UI.createAnimation({
    left  : 250,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 150
  }),
  drawerCloseAnimation: Ti.UI.createAnimation({
    left : 0,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 150
  })
});

_.extend($.rightDrawer, drawer, {
  drawerOpenAnimation: Ti.UI.createAnimation({
    left : -250,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 150
  }),
  drawerCloseAnimation: Ti.UI.createAnimation({
    left : 0,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 150
  })
});

exports.init = function(options) {
  if(options.hasOwnProperty('leftDrawer')) {
    $.leftDrawer.add(options.leftDrawer);
  }
  else {
    $.slideMenu.remove($.leftDrawer);
  }
  if(options.hasOwnProperty('rightDrawer')) {
    $.rightDrawer.add(options.rightDrawer);
  }
  else {
    $.slideMenu.remove($.rightDrawer);
  }

  $.content.add(options.content);
};
