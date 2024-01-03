const _apiUrl = "/api/checkouts";

export const getCheckouts = () => {
    return fetch(_apiUrl).then((r) => r.json());
};

export const editCheckout = (checkout) => {
    return fetch(`${_apiUrl}/${checkout.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkout),
    })
}