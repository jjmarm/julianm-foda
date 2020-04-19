// var i = 0;
// var dragging = false;
//
// $("#resize").mousedown(function(e) {
//   e.preventDefault;
//   console.log("Mouse down!");
//
//   dragging = true;
//   $(document).mousemove(function(e) {
//       $("#resize").css("right", e.pageX + 2)
//   });
// });
//
// $(document).mouseup(function (e) {
//   if (dragging) {
//     var percentage = (e.pageX / window.innerWidth) * 100;
//     var bodyPercentage = 100 - percentage;
//
//     $("#resize").css("width", percentage + "%");
//     $(".body").css("width", bodyPercentage + "%")
//
//     $(document).unbind("mousemove");
//     dragging = false;
//   }
// })

document.addEventListener('DOMContentLoaded', function(){
      var currentObject = null;
      const sections = document.querySelectorAll(".section.ch");
      const menu_links = document.querySelectorAll("li");

      const makeActive = (link) => menu_links[link].classList.add("active");
      const removeActive = (link) => menu_links[link].classList.remove("active");
      const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));

      let currentActive = 0;
      const sectionMargin = 200;

      window.addEventListener("scroll", () => {
        const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1

        if (current !== currentActive) {
          removeAllActive();
          currentActive = current;
          makeActive(current);
        }
      }, false)

      const images = document.querySelectorAll("img");
      const tooltip = document.getElementById('tooltip');

      const showTooltip = function (e, altText) {
        currentObject = altText;
        if (altText != "") {
          tooltip.style.visibility = "visible";
          tooltip.style.opacity = 1.0;
          tooltip.innerHTML = `<p>${altText}</p>`
          tooltip.style.top = e.pageY + 'px';
          if ((e.pageX + tooltip.offsetWidth) < window.innerWidth) {
            tooltip.style.left = e.pageX + 'px';
          }
        }
      }

      for (var i = 0; i < images.length; i++) {
        const altText = images[i].alt;
        images[i].addEventListener('mousemove', function(e) {showTooltip(e, altText)}, false);
        images[i].addEventListener('mouseout', function (e) {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = 0;
            currentObject = null;
        })
      }

      const statement = document.querySelector("#statement");
      statement.addEventListener('mousemove', function(e) {showTooltip(e, "Less is more")}, false);
      statement.addEventListener('mouseout', function(e) {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = 0;
        currentObject = null;
      })

      document.addEventListener('wheel', function(e) {
        if (currentObject != null) {
          tooltip.style.visibility = "visible";
          tooltip.style.opacity = 1.0;
          tooltip.innerHTML = `<p>${currentObject}</p>`
          tooltip.style.top = e.pageY + 'px';
          if ((e.pageX + tooltip.offsetWidth) < window.innerWidth) {
            tooltip.style.left = e.pageX + 'px';
          }
        }
      }, false)
}, false);

function sliderChange(percent) {
  const images = document.querySelectorAll("img");

  for (var image of images) {
    image.style.width = percent + "%";
  }

  document.getElementById('slidertext').innerHTML = percent + "%";
}
