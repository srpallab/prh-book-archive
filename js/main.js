// all important sections
const searchBox = document.getElementById('searchText');
const searchBtn = document.getElementById('search');
const toatalSearchParagraph =  document.getElementById('total-search');
const resultArea = document.getElementById('results');


const addSpinner = () => {
  // add spinner
  const spinnerDiv= document.createElement('div');
  spinnerDiv.innerHTML = `<img alt="Spinner" src="images/spinner-loop.gif" width='200'/>`;
  resultArea.appendChild(spinnerDiv);
}

searchBtn.addEventListener('click', () => {
  const searchText = searchBox.value;
  searchBox.value = '';
  resultArea.innerHTML = ``;
  addSpinner();
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  // fetch Data
  fetch(url).then(res => res.json()).then(data => displayData(data));
});

//  This fuction displays all the data in the html
const displayData = data => {
  // spinner.style.display = 'block';
  toatalSearchParagraph.innerText = `Total Number of Books: ${data.numFound}`;
  resultArea.innerHTML = ``;
  const dataArray = data.docs.slice(0, 30);
  if( dataArray.length > 0) {
    dataArray.forEach((book, i) => {
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('box');
      resultDiv.innerHTML = `
	<img alt="" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"/>
        <h4>Book Title : </h4>
        <p>${book.title}</p>
        <h4>Author:</h4>
	<p> ${book.author_name === undefined ? "No Data Found" : book.author_name[0]} </p>
        <h4>Publisher Name: </h4>
	<p>${book.publisher === undefined ? "No Data Found" : book.publisher[0]}</p>
	<h4>First Publish Year: </h4>
        <p>${book.first_publish_year === undefined ? "No Data Found" : book.first_publish_year}</p>
	
      `;
      resultArea.appendChild(resultDiv);
    }
    );
  }
}
