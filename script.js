//Get Countries From Json File
const searchcountry = async searchBox => {
  const res = await fetch('../data/countries.json');
  const countries = await res.json();
  // console.log(countries);

  //Get Match Of Entered Data
  let matches = countries.filter(country => {
    const regex = new RegExp(`^${searchBox}`, 'gi');
    return country.name.match(regex) || country.abbr.match(regex);
  });

  if (searchBox.length === 0) {
    matches = [];
    countryList.innerHTML = '';
  }
  // console.log(matches);
  outputHtml(matches);
};

// show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
     <div class="row">
     <div class="col s12">
       <div class="card  grey darken-4 darken-1">
         <div class="card-content white-text">
           <h4 class="card-title m1">${match.name} (${
          match.abbr
        })<span class="blue-text m-4"> ${match.capital}</span></h4>
        <div class="card-action">
        <a>Country Code :</a>
        <a>${match.phoneCode}</a>
      </div>
         </div>
       </div>
     </div>
   </div>
     `
      )
      .join('');
    // console.log(html);
    document.getElementById('countryList').innerHTML = html;
  }
};

document
  .getElementById('search')
  .addEventListener('input', () => searchcountry(search.value));
