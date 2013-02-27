Titanium Alloy Slide Menu Widget
================================
com.madrocket.ti.slidemenu

Platforms: 
* ios (tested on emulator)
* android (2.3 tested on device, 4.x on emulator)

Drawer can be created from the left, right or both.

Demo app: https://github.com/MadRocket/slidemenu-demo (might be outdated, but you should get the idea)

Usage
-----

Assumptions:
* You have views/content.xml for your content
* You have views/leftmenu.xml for the left drawer
* You have views/rightmenu.xml for the right drawer
* You have views/index.xml where you going to assemble application

In your views/index.xml:

    <Alloy>
      <Window id="index">
        <Require type="widget" src="com.madrocket.ti.slidemenu" id="menu" />
      </Window>
    </Alloy>

In your controllers/index.js:

    var content = Alloy.createController('content');
    $.menu.init({
      leftDrawer:  Alloy.createController('leftmenu').getView(),
      rightDrawer: Alloy.createController('rightmenu').getView(),
      content: content.getView()
    });

    // Assume you have these buttons in the 'content' view
    content.leftb.addEventListener('click', function(){
      $.menu.toggleLeftDrawer();
    });
    content.rightb.addEventListener('click', function(){
      $.menu.toggleRightDrawer();
    });

    $.menu.on('open:[left]', function(e){
      // Do something on open
    });
    $.menu.on('close:[right]', function(e){
      // Do something on close
    });

Highly inspired by [https://github.com/danielsefton/AlloySliderMenu](https://github.com/danielsefton/AlloySliderMenu)
