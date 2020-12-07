export const Fetch = async (req) => {
    let msg;

    await fetch('http://localhost:4000/graphql', {
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

export const getDate = () => {
    let date = new Date();
    const str = date.toString().split(' ');
    return `${str[1]} ${str[2]} ${str[3]}`;
}