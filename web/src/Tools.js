export const handleKeys = (e, state, setState, submit) => {
    if(state == "Control" && e.key == "Enter") {
        submit();
    } else {
        setState(e.key);
    }
}

export const add_token = (value) => {
    sessionStorage.setItem('token', value);
};

export const remove_token = () => {
    sessionStorage.removeItem('token');
};

export const get_token = () => {
    return sessionStorage.getItem('token');
};

export const liked_posts = () => JSON.parse(sessionStorage.getItem('liked'));

export const supported_users = () => JSON.parse(sessionStorage.getItem('liked'));

export const set_supported = (val) => {
    sessionStorage.setItem('supported', JSON.stringify(val));
}

export const set_liked = (val) => {
    sessionStorage.setItem('liked', JSON.stringify(val));
}

export const layouts = [
    {
        id: 0,
        title: 'Layout 1',
        information: [
            {
                title: 'Supporters',
                checked: true
            },
            {
                title: 'Post Count',
                checked: true
            },
            {
                title: 'Bio',
                checked: false
            },
            {
                title: 'Messages',
                checked: true
            },
            {
                title: 'Shareable Link',
                checked: true
            }
        ]
    },
    {
        id: 1,
        title: 'Layout 2',
        information: [
            {
                title: 'Supporters',
                checked: false
            },
            {
                title: 'Post Count',
                checked: true
            },
            {
                title: 'Bio',
                checked: true
            },
            {
                title: 'Messages',
                checked: false
            },
            {
                title: 'Shareable Link',
                checked: true
            }
        ]
    },
    {
        id: 2,
        title: 'Layout 3',
        information: [
            {
                title: 'Supporters',
                checked: true
            },
            {
                title: 'Post Count',
                checked: false
            },
            {
                title: 'Bio',
                checked: true
            },
            {
                title: 'Messages',
                checked: true
            },
            {
                title: 'Shareable Link',
                checked: true
            }
        ]
    }
];
