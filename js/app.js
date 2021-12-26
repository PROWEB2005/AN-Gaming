(function () {
    slidesPlugin();
  
    function slidesPlugin(indexOfActiveSlide = 0) {
      const slider = document.querySelector(".slider");
      const slides = document.querySelectorAll(".slide");
      const numberOfLastSlide = slides.length - 1;
  
      setActiveSlide(indexOfActiveSlide, slides);
  
      slides.forEach((slide) => {
        slide.addEventListener("click", () => {
          console.log("Mouse click:", slide);
  
          indexOfActiveSlide = getOrderOfSlide(slide);
  
          setActiveSlide(indexOfActiveSlide, slides);
        });
      });
  
      slider.addEventListener("wheel", (event) => {
        event.preventDefault();
  
        const mouseWheel = Math.sign(event.deltaY);
  
        const wheelDirection = mouseWheel > 0 ? "up" : "down";
        const slideDirection = mouseWheel > 0 ? "right" : "left";
  
        console.log(`Mouse wheel: scroll ${wheelDirection}`);
  
        changeSlide(slideDirection, numberOfLastSlide, slides);
      });
  
      function changeSlide(direction, numberOfLastSlide, slides) {
        switch (direction) {
          case "right":
            indexOfActiveSlide++;
            if (indexOfActiveSlide > numberOfLastSlide) {
              indexOfActiveSlide = 0;
            }
            break;
          case "left":
            indexOfActiveSlide--;
            if (indexOfActiveSlide < 0) {
              indexOfActiveSlide = numberOfLastSlide;
            }
            break;
        }
  
        setActiveSlide(indexOfActiveSlide, slides);
      }
  
      function setActiveSlide(indexOfNewActivSlide, slides) {
        clearActiveClasses(slides);
  
        slides.forEach((slide) => {
          if (getOrderOfSlide(slide) === indexOfNewActivSlide) {
            slide.classList.add("slide_active");
          } else {
            const caption = slide.querySelector(".slide__caption");
            caption.classList.add("slide__caption_visuall-hidden");
          }
        });
  
        console.log("Active slide index:", indexOfNewActivSlide);
        console.log("===================================");
      }
  
      function getOrderOfSlide(slide) {
        return parseInt(slide.dataset.index, 10);
      }
  
      function clearActiveClasses(slides) {
        slides.forEach((slide) => {
          slide.classList.remove("slide_active");
  
          const caption = slide.querySelector(".slide__caption");
          caption.classList.remove("slide__caption_visuall-hidden");
        });
      }
    }
  })();
  