const page = document.querySelector('.page');
const studentList = page.querySelector('.student-list');
const students = page.querySelectorAll('.student-item');
const pageHeader = page.querySelector('.page-header');
const pageSize = 10;

// Takes an array and returns an object with a number of pages containing no more than "pageSize" items
// Returned obj also contains total number of pages
function populatePages(list) {
  const pages = {};
  pages.numOfPages = Math.ceil(list.length / pageSize);
  let itemIndex = 0;

  // Create a page property containing "pageSize" number of items
  // Slice the list down by incrementing the "itemIndex" by the "pageSize"
  // Grab the remainder of items when the loop is on its last pass
  for (let i = 1; i <= pages.numOfPages; i += 1) {
    pages[`page${i}`] = list.slice(itemIndex, (i < pages.numOfPages) ? itemIndex += pageSize : list.length);
  }

  return pages;
}

// Adds the pagination div and ul to the DOM
function addPaginationBlock(parentNode) {
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  paginationDiv.appendChild(document.createElement('ul'));
  return parentNode.appendChild(paginationDiv);
}

// Adds the pagination links to the DOM
function addPageLinks(pagesObj, parentNode) {
  for (let i = 1; i <= pagesObj.numOfPages; i += 1) {
    const paginationItem = document.createElement('li');
    const paginationLink = document.createElement('a');
    // Always load the first page
    if (i === 1) {
      paginationLink.classList.add('active');
    }
    paginationLink.setAttribute('href', '#');
    paginationLink.innerText = `${i}`;
    paginationItem.appendChild(paginationLink);
    parentNode.appendChild(paginationItem);
  }
}

// Adds the list items for a given page to the DOM
function loadPage(pageNum, pagesObj) {
  const studentNodes = pagesObj[`page${pageNum}`];
  // Clear out the list
  studentList.innerHTML = '';

  // Set up a cascading fade-in effect, adding 20ms delay for each list item
  let delay = 20;
  studentNodes.forEach((studentNode) => {
    // Remove the show class so items will always fade in
    studentNode.classList.remove('show');
    studentList.appendChild(studentNode);
    setTimeout(() => {
      studentNode.classList.add('show');
    }, delay);
    delay += 20;
  });
}


// Initial page load
// Initialize the pages obj with array of students pulled from the html
const pagesObj = populatePages([...students]);
addPageLinks(pagesObj, addPaginationBlock(page));
loadPage(1, pagesObj);

// Event listeners
// Pagination page selection
page.querySelector('.pagination').addEventListener('click', (e) => {
  if (e.target.nodeName === 'A') {
    page.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    loadPage(e.target.innerText, pagesObj);
  }
});
