export const fetchWords = () => {
    return fetch("http://localhost:2222/data")
    .then((response) => {
        return response.json()
    })
}