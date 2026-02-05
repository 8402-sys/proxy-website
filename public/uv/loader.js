async function launch() {
    let url = document.getElementById('url').value;
    if (!url.includes('.')) url = "https://www.google.com/search?q=" + url;
    else if (!url.startsWith('http')) url = "https://" + url;

    await navigator.serviceWorker.register('/uv/uv.sw.js', { scope: __uv$config.prefix });
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
}

// Auto-apply Cloak
const cloak = JSON.parse(localStorage.getItem('cloak'));
if (cloak) {
    document.title = cloak.t;
    document.getElementById('tab-icon').href = cloak.i;
}
