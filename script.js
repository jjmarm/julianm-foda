var i = 0;
var dragging = false;

$("#resize").mousedown(function(e) {
  e.preventDefault;
  console.log("Mouse down!");

  dragging = true;
  $(document).mousemove(function(e) {
      $("#resize").css("right", e.pageX + 2)
  });
});

$(document).mouseup(function (e) {
  if (dragging) {
    var percentage = (e.pageX / window.innerWidth) * 100;
    var bodyPercentage = 100 - percentage;

    $("#resize").css("width", percentage + "%");
    $(".body").css("width", bodyPercentage + "%")

    $(document).unbind("mousemove");
    dragging = false;
  }
})
