async function init() {
  const requestURL = "http://www.gimhae.go.kr/openapi/tour/lodging.do";
  await apiDataLoad(10, originDatabase, requestURL);

  const content_count = document.getElementById("content-counter");
  content_count.innerHTML = `총 <span style="color: red">${originDatabase.length}</span>건의 게시물이 있습니다.`;

  await pagingRender();
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
                            <span class="label">분류</span>
                            : ${data.category}
                        </li>
                        <li>
                            <span class="label">기관</span>
                            : ${data.name}
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
