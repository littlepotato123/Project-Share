export const Fetch = async (req) => {
    let msg;

    await fetch(`http://localhost:4000/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: req
        })
    })
    .then(res => res.json())
    .then(data => {
        msg = data.data;
    });

    return msg;
};

// Textarea onChange Values
export const handleKeys = (e, state, setState, submit) => {
    if(state == "Control" && e.key == "Enter") {
        submit();
    } else {
        setState(e.key);
    }
}

// Add Cookie
export const add_token = (value) => {
    sessionStorage.setItem('token', value);
};

// Remove Cookie
export const remove_token = () => {
    sessionStorage.removeItem('token');
};

// Get Cookie
export const get_token = () => {
    return sessionStorage.getItem('token');
};

// Get Liked Posts
export const liked_posts = () => JSON.parse(sessionStorage.getItem('liked'));

// Get Supported Users
export const supported_users = () => JSON.parse(sessionStorage.getItem('liked'));

// Set Supported
export const set_supported = (val) => {
    sessionStorage.setItem('supported', JSON.stringify(val));
}

// Set Liked
export const set_liked = (val) => {
    sessionStorage.setItem('liked', JSON.stringify(val));
}