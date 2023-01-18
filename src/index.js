import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(event => {
    const trimedVal = input.value.trim();
    cleanHtml();
    if (trimedVal !== '') {
      fetchCountries(trimedVal).then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (data.length >= 2 && data.length <= 10) {
          renderCountryList(data);
        } else if (data.length === 1) {
          renderCountry(data);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries){
    const markup = countries
    .map(country=>{
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
          country.name.official
        }" width="30" hight="20">
           <b>${country.name.official}</p>
                  </li>`;
    })
    .join('');
    countryList.innerHTML = markup;
}

function renderCountry(countries){
    const markup = countries
    .map(country=>{
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
              country.name.official
            }" width="30" hight="20">
           <b>${country.name.official}</b></p>
              <p><b>Capital</b>: ${country.capital}</p>
              <p><b>Population</b>: ${country.population}</p>
              <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                  </li>`;
    })
    .join('');
    countryList.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
