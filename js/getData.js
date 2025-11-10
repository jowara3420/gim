async function apiDataLoad(size, receiveBuffer, reqeustURL) {
  const proxy = "https://nextit.or.kr:41080/";
  for (let i = 1; i < size; i++) {
    const origin = `${reqeustURL}?page=${i}&pageunit=10`;
    const url = `${proxy}${origin}`;
    //console.log(url);

    const data = await fetchJson(url);

    //�꾨룄 寃쎈룄 �덈뒗 寃껊쭔 異붾━湲�
    const temp = data.results;
    for (let j = 0; j < temp.length; j++) {
      const filter =
        temp[j].images != null &&
        temp[j].images.length > 0 &&
        temp[j].xposition != null &&
        temp[j].xposition.trim() != "" &&
        temp[j].xposition.trim() != " " &&
        Number(temp[j].xposition) > 0;

      if (filter) {
        receiveBuffer.push(temp[j]);
      }
    }
  }
}

async function fetchJson(url) {
  const response = await fetch(url);

  return response.json();
}
