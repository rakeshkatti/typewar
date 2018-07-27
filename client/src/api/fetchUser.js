export const fetchUser = () => {
    return fetch("http://localhost:2222/data")
    .then((response) => {
        return response.json()
    })
}