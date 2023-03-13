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

class Gist{
    static type = {
        "getGist": "getGist", // https://api.github.com/gists/:gist_id // GET
        "getGists": "getGists", // https://api.github.com/gists // GET
        "getStarredGists": "getStarredGists", // https://api.github.com/gists/starred // GET
        "getGistHistory": "getGistHistory", // https://api.github.com/gists/:gist_id/:sha // GET
        "createGist": "createGist", // https://api.github.com/gists // POST
        "updateGist": "updateGist", // https://api.github.com/gists/:gist_id // PATCH
        "deleteGist": "deleteGist", // https://api.github.com/gists/:gist_id // DELETE
        "starGist": "starGist", // https://api.github.com/gists/:gist_id/star // PUT
        "unStarGist": "unStarGist", // https://api.github.com/gists/:gist_id/star // DELETE
    }

    static getURLAndMethod(type ,gist_id = "",sha=""){
        let API_URL = "https://api.github.com/gists";
        if(type === this.type.getGist) {
            return {url: `${API_URL}/${gist_id}`, method: "GET"};
        }
        else if(type === this.type.getGists) {
            return {url: `${API_URL}`, method: "GET"};
        }
        else if(type === this.type.getStarredGists) {
            return {url: `${API_URL}/starred`, method: "GET"};
        }
        else if(type === this.type.getGistHistory) {
            return {url: `${API_URL}/${gist_id}/${sha}`, method: "GET"};
        }
        else if(type === this.type.createGist) {
            return {url: `${API_URL}`, method: "POST"};
        }
        else if(type === this.type.updateGist) {
            return {url: `${API_URL}/${gist_id}`, method: "PATCH"};
        }
        else if(type === this.type.deleteGist) {
            return {url: `${API_URL}/${gist_id}`, method: "DELETE"};
        }
        else if(type === this.type.starGist) {
            return {url: `${API_URL}/${gist_id}/star`, method: "PUT"};
        }
        else if(type === this.type.unStarGist) {
            return {url: `${API_URL}/${gist_id}/star`, method: "DELETE"};
        }
        else{
            throw new Error("type not found");
        }
    }

    static async get(type, content={} ,gist_id = "",sha=""){
        const {url, method} = this.getURLAndMethod(type,gist_id,sha);

        let headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${GIST_TOKEN}`
        }

        let body = JSON.stringify(content);

        const options = {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
        };
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => {
                    if(method === "PUT" || method === "DELETE"){
                        return response.status
                    }else{
                        return response.json()
                    }
                })
                .then(data => {
                    console.log(data)
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }
}


export {getPublicGists,Gist};