import StatusContainer from "./StatusContainer.js";
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
                    language: gist.files[key].language
                })
            }
            clearData.push({
                title: gist.description,
                created_at: gist.created_at,
                updated_at: gist.updated_at,
                description: gist.description,
                files: files,
                id: gist.id
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