async function init() {
  const requestURL = "http://www.gimhae.go.kr/openapi/tour/festival.do";
  await apiDataLoad(2, originDatabase, requestURL);

  const content_count = document.getElementById("content-counter");
  content_count.innerHTML = `총 <span style="color: red">${originDatabase.length}</span>건의 게시물이 있습니다.`;

  await pagingRender();
}
