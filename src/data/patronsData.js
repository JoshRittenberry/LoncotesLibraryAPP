const _apiUrl = "/api/patrons";

export const getPatrons = () => {
    return fetch(_apiUrl).then((r) => r.json());
};

export const getPatron = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((r) => r.json());
};

export const editPatron = (patron) => {
    return fetch(`${_apiUrl}/${patron.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patron),
    }).then((res) => res.json());
}

// export const createMaterial = (material) => {
//     return fetch(_apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(material),
//     }).then((res) => res.json());
// };
