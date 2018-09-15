export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            'X-User-Id': user.userId,
            'X-Auth-Token': user.token,
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}

export function authHeaderNoJson() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            'X-User-Id': user.userId,
            'X-Auth-Token': user.token
        };
    } else {
        return {};
    }
}