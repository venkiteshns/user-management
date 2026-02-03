export const cacheClear = (req, res, next) => {
    // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    // res.set('Pragma', 'no-cache');
    // res.set('Expires', '0');
    next();
};
