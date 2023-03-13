import StatusContainer from "./StatusContainer.js";
import PubSub from "pubsub-js";
export  default  class Tools{
    static clearGistsData(data){
        // only title ,id ; created_at; updated_at; description; filename; raw_url; language
        let clearData = [];
        for (let i = 0; i < data.length; i++) {
            let gist = data[i];
            let files = [];
            for (let key in gist.files) {
                files.push({
                    filename: gist.files[key].filename,
                    raw_url: gist.files[key].raw_url,
                    language: gist.files[key].language,
                    size: gist.files[key].size
                })
                PubSub.publish('language', { message: gist.files[key].language });
            }
            clearData.push({
                //title: gist.description,
                title: files[0].filename,
                created_at: gist.created_at,
                updated_at: gist.updated_at,
                description: gist.description,
                files: files,
                id: gist.id,
                html_url: gist.html_url,
                owner: gist.owner
            })
        }
        //console.log(clearData);
        StatusContainer.ClearAllGistsData = clearData;
        return clearData;
    }

    static ISO8601ToDDMMYYYY(isoDate){
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return  new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    static ISO8601ToDateTime(isoDate){
        // ISO8601 To YYYY-MM-DD HH:MM:SS
        let res = isoDate.replace('T', ' ');
        res = res.replace('Z', ' ');
        return res;
    }

    static getRawContent(url){
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    //console.log(data)
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        })
    }
}