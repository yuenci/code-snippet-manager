import {GIST_TOKEN} from "../config.js";

export default class Gist {
    static GIST_TOKEN = GIST_TOKEN;

    // https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28

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

    static headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${this.GIST_TOKEN}`
    }

    static getURLAndMethod(type, gist_id = "", sha = "") {
        let API_URL = "https://api.github.com/gists";
        if (type === this.type.getGist) {
            return { url: `${API_URL}/${gist_id}`, method: "GET" };
        }
        else if (type === this.type.getGists) {
            return { url: `${API_URL}`, method: "GET" };
        }
        else if (type === this.type.getStarredGists) {
            return { url: `${API_URL}/starred`, method: "GET" };
        }
        else if (type === this.type.getGistHistory) {
            return { url: `${API_URL}/${gist_id}/${sha}`, method: "GET" };
        }
        else if (type === this.type.createGist) {
            return { url: `${API_URL}`, method: "POST" };
        }
        else if (type === this.type.updateGist) {
            return { url: `${API_URL}/${gist_id}`, method: "PATCH" };
        }
        else if (type === this.type.deleteGist) {
            return { url: `${API_URL}/${gist_id}`, method: "DELETE" };
        }
        else if (type === this.type.starGist) {
            return { url: `${API_URL}/${gist_id}/star`, method: "PUT" };
        }
        else if (type === this.type.unStarGist) {
            return { url: `${API_URL}/${gist_id}/star`, method: "DELETE" };
        }
        else {
            throw new Error("type not found");
        }
    }

    static async get(data) {
        const { type, gist_id, sha } = data;
        const { url, method } = this.getURLAndMethod(type, gist_id, sha);

        const options = {
            method: method,
            headers: this.headers,
        };


        console.log(url, options);

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    static async post(data) {
        const { type, content, gist_id, sha } = data;
        const { url, method } = this.getURLAndMethod(type, gist_id, sha);

        const options = {
            method: method,
            headers: this.headers,
            body: JSON.stringify(content)
        };

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    static async patch(data) {
        return new Promise((resolve, reject) => {
            this.post(data)
                .then(data => {
                    //console.log(data);
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    static async put(data) {
        const { type, gist_id, sha } = data;
        const { url, method } = this.getURLAndMethod(type, gist_id, sha);

        const options = {
            method: method,
            headers: this.headers,
        };

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(response => response.status)
                .then(data => {
                    //console.log(data)
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    static async delete(data) {
        return new Promise((resolve, reject) => {
            this.put(data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }
}