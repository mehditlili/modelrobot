// Generated by CoffeeScript 1.6.1
(function() {

  window.parseRobot = function(xml) {
    var robotBaseMaterial, xmelon;
    window.scene = window.scene || new THREE.Scene;
    window.robotmaterialcollection = new App.RobotMaterialCollection();
    window.robotlinkcollection = new App.RobotLinkCollection();
    window.robotjointcollection = new App.RobotJointCollection();
    xmelon = $.parseXML(xml);
    robotBaseMaterial = new THREE.MeshPhongMaterial({
      color: 0x6E23BB,
      specular: 0x6E23BB,
      shininess: 50
    });
    window.robot = new THREE.Object3D();
    window.robot.name = "robot";
    $(xmelon).find("color").parent().each(function(index) {
      var robotcolor;
      robotcolor = new App.RobotMaterial($.xml2json(this));
      window.robotmaterialcollection.add(robotcolor);
      return true;
    });
    $(xmelon).find("link").each(function(index) {
      var robotlink, tjson;
      tjson = $.xml2json(this);
      tjson["materialcollection"] = window.robotmaterialcollection;
      robotlink = new App.RobotLink(tjson);
      window.robotlinkcollection.add(robotlink);
      window.robot.add(robotlink.get("link"));
      return true;
    });
    $(xmelon).find("joint").each(function(index) {
      var robotjoint;
      robotjoint = new App.RobotJoint($.xml2json(this));
      robotjoint.set("linkcollection", window.robotlinkcollection);
      return window.robotjointcollection.add(robotjoint);
    });
    console.log(scene);
    window.scene.add(window.robot);
    return renderer.render(window.scene, App.camera);
  };

}).call(this);
