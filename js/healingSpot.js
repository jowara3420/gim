function drawCardSpot(src, name, desc) {
  const writeHTML = `    
           
             <div class="spot-card">
                <div class="spot-img">
                    <img loading="lazy" decoding="async" data-src="${src}" alt="${name}" width="400" height="267" />
                    <button class="plus-btn">+</button>
                </div>
                <p class="name">${name}</p>
                <p class="desc">${desc}</p>
            </div>
                `;

  return writeHTML;
}

async function renderSpot(size, carousel) {
  const spotData = [];
  const requestURL = "http://www.gimhae.go.kr/openapi/tour/tourinfo.do";
  await apiDataLoad(10, spotData, requestURL);

  const selectList = [];

  let count = 0;
  const pickData = [];
  for (let i = 0; i < spotData.length; i++) {
    const filter = spotData[i].images.length > 1 && spotData[i].copy.length > 1;

    if (filter) {
      pickData.push(spotData[i]);
    }
  }

  for (let i = 0; i < size; i++) {
    const item = randomUniQueItem(pickData, selectList);

    const resizeName = shortenWords(item.name, 15);
    const resizeCopy = shortenWords(item.copy, 35);

    const html = await drawCardSpot(
      `${item.images[0]}`,
      `${resizeName}`,
      `${resizeCopy}`
    );
    const card = document.createElement("li");
    card.innerHTML = html;
    await carousel.appendChild(card);

    await promieLoadImg(card.querySelector("img"));

    count++;
  }
}

var spotIndex = 0;

async function initSpot() {
  const carousel = document.getElementById("spot-card-wrapper");
  console.log(carousel);
  await renderSpot(12, carousel);
  await slideImage(
    "spot-prev",
    "spot-next",
    "spot-card-wrapper",
    "spot-card",
    3,
    1280,
    spotIndex
  );
}
