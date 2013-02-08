Titanium Alloy Slide Menu Widget
================================
com.madrocket.ti.slidemenu

Highly inspired by [https://github.com/danielsefton/AlloySliderMenu](https://github.com/danielsefton/AlloySliderMenu)

In your view:

    <Alloy>
      <Window id="index">
        <Require type="widget" src="com.madrocket.ti.slidemenu" id="menu" />
      </Window>
    </Alloy>

In your controller:

    var content = Alloy.createController('content');
    $.menu.init({
      leftDrawer:  Alloy.createController('leftmenu').getView(),
      rightDrawer: Alloy.createController('rightmenu').getView(),
      content: content.getView()
    });

    // Assume you have these buttons in the 'content' view
    content.leftb.on('click', function(){
      $.menu.toggleLeftDrawer();
    });
    content.rightb.on('click', function(){
      $.menu.toggleRightDrawer();
    });

    $.menu.on('open:[left]', function(e){
      // Do something on open
    });
    $.menu.on('close:[right]', function(e){
      // Do something on close
    });
