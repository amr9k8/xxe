async function fetchPage(url, headers = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
    credentials: 'include'
  });
  return response.text();
}

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


function extractByName(html, name) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const el = doc.querySelector(`[name="${name}"]`);
  return el ? (el.value || el.content || el.getAttribute('content')) : null;
}

// Step 1: fetch html contains token
const html =  await fetchPage('http://54.217.177.44/');
// Step 2: Extract token (use simpler selector if possible)
const token = extractByName(html, 'csrf-token');
const test =  await getRequest('http://qvp6rtbbgiykgu9twx19ac1hy84zs4gt.oastify.com', { token: token  });
