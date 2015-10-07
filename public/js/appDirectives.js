angular.module('directives', []).directive('ngConfirmClick', [
  function(){
    return {
      link: function (scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.confirmedClick;
        element.bind('click',function (event) {
          if ( window.confirm(msg) ) {
            scope.$eval(clickAction)
          }
        });
      }
    };
}]).directive("autoGrow", function(){
      return function(scope, element, attr){
          var update = function(){
              element.css("height", "auto");
              element.css("height", element[0].scrollHeight + "px");
          };
          scope.$watch(attr.ngModel, function(){
              update();
          });
          attr.$set("ngTrim", "false");
      };
  });
