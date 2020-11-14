export const Fetch = (req) => {
    let send;
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: req
        })
    })
    .then(res => {
        if(res.status == 429) send = 'Too Many Requests';
        return res.json()
    })
    .then(data => {
        send = data;
    })

    return data;
}