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
      drawer:  Alloy.createController('menu').getView(),
      content: content.getView()
    });
    
    // Assume you have this button in the 'content' view
    content.menuButton.on('singletap', $.menu.toggle);
    $.menu.slideMenu.on('open', function(e){
      // Do something on open
    });
    $.menu.slideMenu.on('close', function(e){
      // Do something on close
    });
    
    $.index.open();
