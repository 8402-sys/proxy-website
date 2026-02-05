export function shield(req, res, next) {
    delete req.headers['x-forwarded-for'];
    req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0';
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
}
