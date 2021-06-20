const articles = document.querySelector("#articles");
const pagination = document.querySelector("#pagination");

let paginationState = {
  offset: 0,
  limit: 10,
  page: 1,
  count: 0,
};
const navigate = async (e = null, offset = 0, limit = 10) => {
  
  if (e) {
    
    if (e.target.attributes.direction.value === "prev") {
      paginationState.offset -= 10;
      paginationState.page--;
    }
    
    else if (e.target.attributes.direction.value === "next") {
      paginationState.offset += 10;
      paginationState.page++;
    }
   
    else {
      paginationState.offset = offset;
      paginationState.limit = limit;
      paginationState.page = e.target.innerText;
    }
  }

  articles.innerHTML = "";
  await fetch(
    `http://localhost:3000/articles?offset=${paginationState.offset}&limit=${paginationState.limit}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.map((article) => {
        articles.innerHTML += `
        <div class="col-md-12">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-2 d-flex flex-column position-static">
                    <h3 class="mb-0">${article.title}</h3>
                    <div class="mb-1 text-muted">${article.createdAt}</div>
                    <p>${article.content.substring(0, 200)} ...</p>
                        <a class="btn stretched-link" href="articleDetails.html?id=${article.id}" style="background-color : pink; ">read more</a>
                    </div>
                <div class="col-auto d-none d-lg-block">
                <img src="https://picsum.photos/${Math.floor(Math.random()*(300 - 200)+200)}" class="bd-placeholder-img" width="200" height="200" role="img" ></img>

                </div>
            </div>
        </div>`;
      });
    });

  buildPagination(paginationState.page);
};

const buildPagination = async (page = 1, offset = 0, limit = 10) => {
 
  pagination.innerHTML = "";

 
  pagination.innerHTML += `
  <li ${
    paginationState.offset - 10 < 0
      ? 'class="page-item disabled"'
      : 'class="page-item"'
  }>
        <a class="page-link" href="#" onclick="navigate(event)" direction="prev" style="background-color: #df1e95; color : black">Previous</a>
    </li>`;
  await fetch(`http://localhost:3000/articles`)
    .then((response) => response.json())
    .then((data) => {
      paginationState.count = data.length;
      data.slice(offset, Math.round(data.length / 10)).map((article, i) => {
       
        pagination.innerHTML += `
        <li ${page == i + 1 ? 'class="page-item active"' : 'class="page-item"'}>
            <a class="page-link" href="#" onclick="navigate(event, ${offset},${limit})" direction="page" style="color : black">${
          i + 1
        }</a>
        </li>`;
        offset += 10;
      });
    });
  
  pagination.innerHTML += `
      <li ${
        paginationState.offset + 10 < paginationState.count
          ? 'class="page-item"'
          : 'class="page-item disabled"'
      }>
          <a class="page-link" href="#" onclick="navigate(event)" direction="next" style="background-color: #df1e95; color : black">Next</a>
      </li>`;
};



buildPagination();
navigate();