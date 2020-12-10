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
    const expires = new Date();
    expires.setHours(expires.getHours() + 2);
    document.cookie = `token=${value}; expires=${expires.toUTCString()}`;
    console.log(document.cookie);
};

// Remove Cookie
export const remove_token = () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    document.cookie = `token=; expires=${now.toUTCString()}`;
    console.log(document.cookie);
};

// Get Cookie
export const get_token = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.split('='));
    const val = cookies.reduce((accumulator, [key, value]) => 
        ({ ...accumulator, [key.trim()]: decodeURIComponent(value)}), {});
    return val.token;
};

// Add Liked Post
export const add_liked = (id) => {
    const liked = sessionStorage.getItem('liked');
    if(liked) {
        const new_liked = [...liked, id];
        sessionStorage.setItem('liked', JSON.stringify(new_liked));
    } else {
        sessionStorage.setItem("liked", JSON.stringify([id]));
    }
}

// Get Liked Posts
export const liked_posts = () => JSON.parse(sessionStorage.getItem('liked'));

// Remove Liked Posts
export const remove_liked = (id) => {
    const liked = JSON.parse(sessionStorage.getItem('liked'));
    const index = liked.findIndex(id);
    liked.splice(index, index);
    sessionStorage.setItem('liked', liked);
};

// Add Supported User
export const add_support = (id) => {
    const supported = sessionStorage.getItem('supported');
    if(supported) {
        const new_supported = [...supported, id];
        sessionStorage.setItem('liked', JSON.stringify(new_supported));
    } else {
        sessionStorage.setItem("supported", JSON.stringify([id]));
    }
}

// Get Supported Users
export const supported_users = () => JSON.parse(sessionStorage.getItem('liked'));

export const remove_supported = (id) => {
    const supported = JSON.parse(sessionStorage.getItem('supported'));
    const index = supported.findIndex(id);
    supported.splice(index, index);
    sessionStorage.setItem('supported', supported);
};