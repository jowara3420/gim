function randomUniQueItem(database, selectList) {
  let rnd = 0;

  do {
    rnd = range(0, database.length);
  } while (selectList.includes(rnd));

  selectList.push(rnd);

  return database[rnd];
}

function shortenWords(str, limit = 20) {
  let result = "";
  if (str.length > limit) {
    result = str.substr(0, limit - 2) + "...";
  } else {
    result = str;
  }
  return result;
}

function range(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function promieLoadImg(element) {
  forceLoadImgUtil(element, {
    retries: 4,
    bustCache: true,
    referrerPolicy: "no-referrer",
    priority: "high",
    timeoutMs: 12000,
  }).catch((err) => {
    console.error(err);
  });
}

async function forceLoadImgUtil(
  img,
  {
    retries = 3,
    bustCache = true,
    referrerPolicy = null,
    priority = "high",
    timeoutMs = 15000,
  } = {}
) {
  const base = img.dataset.src || img.src;

  if (referrerPolicy) img.referrerPolicy = referrerPolicy;
  if ("fetchPriority" in img) img.fetchPriority = priority;
  img.loading = "eager";
  img.decoding = "async";

  for (let attempt = 0; attempt <= retries; attempt++) {
    let src = base;
    if (attempt > 0 && bustCache) {
      const u = new URL(base, location.href);
      u.searchParams.set("_", Date.now());
      src = u.toString();
    }

    try {
      await loadOnce(img, src, timeoutMs);

      if (typeof img.decode === "function") {
        await img.decode().catch(() => {});
      }
      return img;
    } catch (e) {
      if (attempt === retries) throw e;
      await wait(300 * (attempt + 1));
    }
  }
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadOnce(img, src, timeoutMs) {
  return new Promise((resolve, reject) => {
    const onLoad = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("img error"));
    };

    const to = setTimeout(() => {
      cleanup();
      reject(new Error("img timeout"));
    }, timeoutMs);

    function cleanup() {
      clearTimeout(to);
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    }

    img.addEventListener("load", onLoad, { once: true });
    img.addEventListener("error", onError, { once: true });

    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      cleanup();
      resolve();
    }
  });
}

function createItem(itemCount, data) {
  const writeHTML = `    
                <div class="item-img">
                    <a href="https://www.gimhae.go.kr/07058/07063/07072.web">
                        <img src="${data.images[0]}" alt="${data.name}" />
                    </a>
                </div>
                <div class="item-desc">
                    <div class="item-title">
                        <div class="item-number">${itemCount}</div>
                        <h3 class="item-name">${data.name}</h3>
                    </div>
                    <ul class="item-info">
                        <li>
                            <span class="label">축제기간</span>
                            : ${data.sdate}부터 ~ ${data.edate}까지
                        </li>
                        <li>
                            <span class="label">행사장소</span>
                            : ${data.address}
                        </li>
                        <li>
                            <span class="label">관리기관</span>
                            : ${data.opener}
                        </li>
                        <li>
                            <span class="label">전화번호</span>
                            :${data.phone}
                        </li>
                    </ul>
                </div>
                <div class="item-rating">
                    <p class="rating-title">별점 총 0개의 후기</p>
                    <div class="star">☆☆☆☆☆</div>
                    <p class="score">0</p>
                    
                    <div>
                    <button class="scrap-btn">스크랩하기</button>
                    <button class="findRoot-btn">길찾기</button>
                    </div>
                </div>
                
                `;

  return writeHTML;
}
