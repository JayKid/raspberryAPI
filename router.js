function route(handle, pathname) 
{
    var path_items = pathname.split('/');
    var service = path_items[path_items.length-2];
    var action = path_items[path_items.length-1];

    if (typeof handle[service] === 'function')
        return handle[service](action);
    else 
        return "404 Not Found, baby";
}

exports.route = route;