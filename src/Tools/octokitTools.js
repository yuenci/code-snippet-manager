import {GIST_TOKEN} from "../config.js";

async function  getPublicGists() {
    let headers= {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${GIST_TOKEN}`
    }
    fetch("https://api.github.com/gists", {
        headers: headers
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}


export {getPublicGists};