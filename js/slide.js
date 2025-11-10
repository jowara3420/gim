function slideImage(
  prev,
  next,
  wrapper,
  card,
  pageSize,
  tanslateSize,
  carouselIndex
) {
  const prev_btn = document.getElementById(prev);
  const next_btn = document.getElementById(next);
  const container_wrapper = document.getElementById(wrapper);

  const slideSize = parseInt(
    Math.floor(container_wrapper.getElementsByClassName(card).length / pageSize)
  );

  prev_btn.onclick = () => {
    if (carouselIndex === 0) {
      carouselIndex = slideSize;
    }
    carouselIndex--;
    container_wrapper.style.transform = `translate3d(-${
      tanslateSize * carouselIndex
    }px, 0, 0)`;
  };

  next_btn.onclick = () => {
    if (carouselIndex === slideSize - 1) {
      carouselIndex = -1;
    }
    carouselIndex++;
    container_wrapper.style.transform = `translate3d(-${
      tanslateSize * carouselIndex
    }px, 0, 0)`;
  };
}
