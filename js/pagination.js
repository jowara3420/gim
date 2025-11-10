async function pagingRender() {
  await updateFirstlast(1);
  await setPageButtons();
  await addNumberButtonListner();
  await setPageOf(1);
}

function updateFirstlast(targetPage) {
  const limit = parseInt(document.getElementById("limitSize").value);
  const pageCount = parseInt(document.getElementById("pageSize").value);
  totalPage = Math.ceil(originDatabase.length / limit);
  pageGroup = Math.ceil(targetPage / pageCount);

  lastNumber = pageGroup * pageCount;

  firstNumber = lastNumber - pageCount + 1;

  if (lastNumber > totalPage) {
    lastNumber = totalPage;
  }

  if (firstNumber < 1) {
    firstNumber = 1;
  }
}

function setPageButtons() {
  const numberButtonWrapper = document.querySelector(".list-pagination");
  numberButtonWrapper.innerHTML = "";
  for (let i = firstNumber; i <= lastNumber; i++) {
    numberButtonWrapper.innerHTML += `<button class="number-button" id="number-button-${i}"> ${i} </button>`;
  }
}

function addNumberButtonListner() {
  const pageNumberButtons = document.querySelectorAll(".number-button");
  for (let i = 0; i < pageNumberButtons.length; i++) {
    pageNumberButtons[i].addEventListener("click", onClickNumberButton);
    pageNumberButtons[i].style.backgroundColor = "lightsteelblue";
  }

  const preButton = document.getElementById("pre-button");
  const nextButton = document.getElementById("next-button");
  preButton.addEventListener("click", onClickPre);
  nextButton.addEventListener("click", onClickNext);
}

function onClickPre(e) {
  const delta = currentPage - 1;
  if (firstNumber <= delta) {
  } else if (0 < delta) {
    updateFirstlast(delta);
    setPageButtons();
    addNumberButtonListner();
  }

  if (delta <= 1) {
    currentPage = 1;
  } else {
    currentPage = delta;
  }
  setPageOf(currentPage);
}

function onClickNext(e) {
  const delta = currentPage + 1;
  if (delta <= lastNumber) {
  } else if (delta <= totalPage) {
    updateFirstlast(delta);
    setPageButtons();
    addNumberButtonListner();
  }

  if (totalPage <= delta) {
    currentPage = totalPage;
  } else {
    currentPage = delta;
  }
  setPageOf(currentPage);
}

function onClickNumberButton(e) {
  const currentPage = parseInt(e.target.innerHTML);

  const currentBtn = e.target;

  setPageOf(currentPage);
}

function limitSizeOnChange(value) {
  alert(`${value}을 선택`);
  updateFirstlast(1);
  setPageButtons();
  addNumberButtonListner();
  setPageOf(1);
}

function pageSizeOnChange(value) {
  alert(`${value}을 선택`);
  updateFirstlast(1);
  setPageButtons();
  addNumberButtonListner();
  setPageOf(1);
}

async function setPageOf(current) {
  const limitSize = parseInt(document.getElementById("limitSize").value);

  let start = limitSize * (current - 1);
  let end = limitSize * (current - 1) + limitSize;
  if (start < 1) {
    start = 0;
  }

  if (originDatabase.length <= end) {
    end = originDatabase.length - 1;
  }

  const flex = document.getElementById("content-list");

  flex.innerHTML = "";
  let itemCount = 1;
  for (let i = start; i <= end; i++) {
    const data = originDatabase[i];
    if (data.images != null && data.images.length > 0) {
      const htmlData = await createItem(itemCount, data);

      const cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "content-item");
      cardDiv.setAttribute("id", `${i}-${data.idx}`);
      cardDiv.innerHTML = htmlData;

      await flex.appendChild(cardDiv);

      itemCount++;
    }
  }
  const pageNumberButtons = document.querySelectorAll(".number-button");
  for (let i = 0; i < pageNumberButtons.length; i++) {
    pageNumberButtons[i].style.backgroundColor = "white";
    pageNumberButtons[i].style.color = "#897777";
  }

  const currentBtn = document.getElementById(`number-button-${current}`);
  currentBtn.style.backgroundColor = "#444444";
  currentBtn.style.color = "white";

  currentPage = current;
}
