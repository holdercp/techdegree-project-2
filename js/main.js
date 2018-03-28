const page = document.querySelector('.page');
const studentList = page.querySelector('.student-list');
const students = page.querySelectorAll('.student-item');
const pageHeader = page.querySelector('.page-header');
const pageSize = 10;

function populatePages(list) {
  const pages = {};
  pages.numOfPages = Math.ceil(list.length / pageSize);
  let pageIndex = 0;

  for (let i = 1; i <= pages.numOfPages; i += 1) {
    pages[`page${i}`] = list.slice(pageIndex, (i < pages.numOfPages) ? pageIndex += pageSize : list.length - 1);
  }
  return pages;
}

function addPaginationElem(parentNode) {
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  const paginationList = document.createElement('ul');
  paginationDiv.appendChild(paginationList);
  parentNode.appendChild(paginationDiv);
}

function addPageLinks(pagesObj, parentNode) {
  for (let i = 1; i <= pages.numOfPages; i += 1) {
    const paginationItem = document.createElement('li');
    const paginationLink = document.createElement('a');
    if (i === 1) {
      paginationLink.classList.add('active');
    }
    paginationLink.setAttribute('href', '#');
    paginationLink.innerText = `${i}`;
    paginationItem.appendChild(paginationLink);
    parentNode.appendChild(paginationItem);
  }
}

function loadPage(pageNum, list) {
  const studentNodes = list[`page${pageNum}`];
  studentList.innerHTML = '';
  let delay = 20;
  studentNodes.forEach((studentNode) => {
    studentNode.classList.remove('show');
    studentList.appendChild(studentNode);
    setTimeout(() => {
      studentNode.classList.add('show');
    }, delay);
    delay += 20;
  });
}

const pages = populatePages([...students]);
addPaginationElem(page);
addPageLinks(pages, page.querySelector('.pagination ul'));

const paginationDiv = page.querySelector('.pagination');
paginationDiv.addEventListener('click', (e) => {
  if (e.target.nodeName === 'A') {
    page.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    loadPage(e.target.innerText, pages);
  }
});

loadPage(1, pages);
