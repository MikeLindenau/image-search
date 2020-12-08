import axios from 'axios'

export function fetchImages(query) {
  return axios.get('https://api.unsplash.com/search/photos', {
    params: { query, per_page: 100 },
    headers: {
      Authorization: 'Client-ID NTIv4gS1-IiJJwoSKhjMBnapt9DolHVdI_fVRe9lCys',
    },
  })
}
