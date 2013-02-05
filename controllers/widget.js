_.extend($.slideMenu, {
  leftAnimation: Ti.UI.createAnimation({
    left : 232,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 150
  }),
  rightAnimation: Ti.UI.createAnimation({
    left : 0,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 150
  }),
  opened: false
});

exports.init = function(options) {
  $.slideMenuDrawer.add(options.drawer);
  $.slideMenuContent.add(options.content);
};

exports.toggle = function(e) {
  if ($.slideMenu.opened) {
    $.slideMenu.fireEvent('close');
    $.slideMenuContent.animate($.slideMenu.rightAnimation);
    $.slideMenu.opened = false;
  }
  else {
    $.slideMenu.fireEvent('open');
    $.slideMenuContent.animate($.slideMenu.leftAnimation);
    $.slideMenu.opened = true;
  }
};
