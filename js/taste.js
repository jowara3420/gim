function drawCardTaste(src, name, desc, location) {
  const writeHTML = `    
           
             <div class="taste-card">
                <img loading="lazy" decoding="async" data-src="${src}" alt="${name}" width="250" height="166" />
                <div class="info">
                  <p class="name">${name}</p>
                  <p class="desc">${desc}</p>
                  <p class="location">${location}</p>
                </div>
              </div>
            `;

  return writeHTML;
}

async function renderTaste(size, carousel) {
  const tasteDatabase = [];
  const requestURL = "http://www.gimhae.go.kr/openapi/tour/restaurant.do";
  await apiDataLoad(50, tasteDatabase, requestURL);

  const selectList = [];

  let count = 0;
  const pickData = [];
  for (let i = 0; i < tasteDatabase.length; i++) {
    const filter =
      tasteDatabase[i].images.length > 1 &&
      tasteDatabase[i].menuprice.length > 0;

    if (filter) {
      pickData.push(tasteDatabase[i]);
    }
  }

  for (let i = 0; i < size; i++) {
    const item = randomUniQueItem(pickData, selectList);

    const resizeName = shortenWords(item.name, 15);
    const resizeAddress = shortenWords(item.address, 20);

    const html = await drawCardTaste(
      `${item.images[0]}`,
      `${resizeName}`,
      `${item.menuprice}`,
      `${resizeAddress}`
    );
    const card = document.createElement("li");
    card.innerHTML = html;
    await carousel.appendChild(card);

    await promieLoadImg(card.querySelector("img"));

    count++;
  }
}

var tasteindex = 0;

async function initTaste() {
  const carousel = document.getElementById("taste-card-wrapper");
  console.log(carousel);
  await renderTaste(12, carousel);
  await slideImage(
    "taste-prev",
    "taste-next",
    "taste-card-wrapper",
    "taste-card",
    4,
    1100,
    tasteindex
  );
}
