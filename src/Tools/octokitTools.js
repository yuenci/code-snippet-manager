import {GIST_TOKEN} from "../config.js";
import StatusContainer from "./StatusContainer.js";
// import Tools from "./Tools.js";

async function  getPublicGists() {
    let headers= {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${GIST_TOKEN}`
    }
    return new Promise((resolve, reject) => {
        fetch("https://api.github.com/gists", {
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                StatusContainer.AllGistsData = data;
                resolve(data);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    })
}


export {getPublicGists};