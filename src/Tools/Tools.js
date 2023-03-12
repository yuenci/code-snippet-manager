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
    }
}