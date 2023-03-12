import {GIST_TOKEN} from "../config.js";
import StatusContainer from "./StatusContainer.js";
import Tools from "./Tools.js";

async function  getPublicGists() {
    let headers= {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${GIST_TOKEN}`
    }
    fetch("https://api.github.com/gists", {
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            StatusContainer.AllGistsData = data;
            Tools.clearGistsData(data);
        })
        .catch(error => console.error(error));
}


export {getPublicGists};