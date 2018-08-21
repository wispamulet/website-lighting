import Axios from 'axios';

function getNews() {
  const article = document.querySelector('#news__article');

  const { href } = window.location;
  const query = href.split('/').pop();
  // console.log(query);

  Axios.get(`/api/get/news?q=${query}`).then(res => {
    // console.log(res.data);
    article.innerHTML = res.data.html;
  });
}

export default getNews;
