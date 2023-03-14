import StatusContainer from "./StatusContainer.js";
import PubSub from "pubsub-js";
import Gist from "./gist.js";
import {OPENAI_API_KEY} from "../config.js";

export  default  class Tools{
    static async getClearingData(){
        let res = await Gist.get({ type: Gist.type.getGists })
        //console.log(res)
        PubSub.publish('nameAndAvatar', { message: res[0].owner });
        this.getOwnerInfo(res);
        return this.clearGistsData(res);
    }
    static clearGistsData(data){
        // only title ,id ; created_at; updated_at; description; filename; raw_url; language

        let sortedData = this.clearingAndSortingData(data);
        //console.log(clearData);
        StatusContainer.ClearAllGistsData = sortedData;
        return sortedData;
    }

    static  clearingAndSortingData(data){
        let clearData = [];
        let idRowUrlMap = {};
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
            idRowUrlMap[gist.id] = gist.files[Object.keys(gist.files)[0]].raw_url;
        }
        StatusContainer.idRowUrlMap = idRowUrlMap;
        // sort by updated_at , return a new array
        return clearData.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
    }

    static clearSingleGistData(data){
        let files = [];
        for (let key in data.files) {
            files.push({
                filename: data.files[key].filename,
                raw_url: data.files[key].raw_url,
                language: data.files[key].language,
                size: data.files[key].size
            })
        }
        return {
            title: files[0].filename,
            created_at: data.created_at,
            updated_at: data.updated_at,
            description: data.description,
            files: files,
            id: data.id,
            html_url: data.html_url,
            owner: data.owner
        };
    }

    static ISO8601ToDDMMYYYY(isoDate){
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return  new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    static ISO8601ToDateTime(isoDate){
        // ISO8601 To YYYY-MM-DD HH:MM:SS , to UTC + 8
        let res = isoDate.replace('T', ' ');
        res = res.replace('Z', ' ');
        return res;
    }

    static convertISO8601toUTC8String(isoString) {
        let date = new Date(isoString);
        let utcOffset = date.getTimezoneOffset() * 60000; // 将分钟转换为毫秒
        let utcTime = date.getTime() + utcOffset;
        let utc8Time = new Date(utcTime + (3600000 * this.timeZoneOffsetInHours())); // 东八时区的偏移量为8个小时，将毫秒转换为小时
        let year = utc8Time.getFullYear();
        let month = this.padZero(utc8Time.getMonth() + 1); // 月份从0开始，需要加1
        let day = this.padZero(utc8Time.getDate());
        let hour = this.padZero(utc8Time.getHours());
        let minute = this.padZero(utc8Time.getMinutes());
        let second = this.padZero(utc8Time.getSeconds());
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }

    static padZero(num) {
        return num < 10 ? "0" + num : num;
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

    static async getHistoryData(gist_id){
        let gistData = await Gist.get({ type: Gist.type.getGist, gist_id: gist_id})
        let historyData = gistData.history;
        //console.log(historyData)

        // Gist.get({ type: Gist.type.getGistHistory, gist_id: gist_id1, sha: sha1 })
        // 使用并发请求全部的历史版本

        let promises = [];
        for (let i = 0; i < historyData.length; i++) {
            let sha = historyData[i].version;
            let promise = Gist.get({ type: Gist.type.getGistHistory, gist_id: gist_id, sha: sha })
            promises.push(promise);
        }
        return await Promise.all(promises);
    };

    static  capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    static  getStarredGists(){
        return new Promise((resolve, reject) => {
            Gist.get({ type: Gist.type.getStarredGists })
                .then(data => {
                    if(StatusContainer.owner === null){
                        this.getOwnerNameAndAvatar().then(ownerData => {
                            StatusContainer.owner = ownerData;
                            let newData = data.filter(item => {
                                return item.owner.login === StatusContainer.owner.login;
                            });
                            //console.log(newData)
                            StatusContainer.starredGists = newData;
                            resolve(newData);
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    static getOwnerInfo(data){
        StatusContainer.owner = data[0].owner;
    }

    static getOwnerNameAndAvatar(){
        return new Promise((resolve, reject) => {
            fetch('https://api.github.com/users/yuenci')
                .then(response => response.json())
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

    static starGist(gist_id){
        Gist.put({ type: Gist.type.starGist, gist_id: gist_id }).then(()=> this.getStarredGists());
    }

    static unStarGist(gist_id){
        console.log(gist_id, 'unStarGist')
        Gist.delete({ type: Gist.type.unStarGist, gist_id: gist_id }).then(()=> this.getStarredGists());
    }

    static  getTags(gist){
        if(!gist) return ;
        let description = gist.description;
        const regex = /#\w+/g;
        return  description.match(regex);
    }
    static  getDesc(gist){
        if(!gist ) return ;
        let description = gist.description;
        const regex = /^(.*?)\s+\[/;
        const match = regex.exec(description);
        if(!match) return description;
        return match[1];
    }

    static createGist( fileName,description, content){
        let data = {
            "description": description,
            "public": true,
            "files": {
                [fileName]: {
                    "content": content
                }
            }
        }
        //console.log(data)
        return new Promise((resolve, reject) => {
            Gist.post({ type: Gist.type.createGist, content: data })
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

    static timeZoneOffsetInHours() {
        const offsetInMinutes = new Date().getTimezoneOffset();
        //console.log(offsetInMinutes);
        return Math.abs(offsetInMinutes) / 60;
    }

    static initRawDataCache(){
        //let promiseMap = new Map();
        StatusContainer.ClearAllGistsData.map(gist => {
            let raw_url = gist.files[0].raw_url;
            let promise = this.getRawContent(raw_url);
            promiseList.push(promise);
        });
        // return promise res , raw_url map




        //return Promise.all(promiseList);
    }

    static deleteGist(gist_id){
        return new Promise((resolve, reject) => {
            Gist.delete({ type: Gist.type.deleteGist, gist_id: gist_id }).then(
                data => {
                    resolve(data);
                }
            ).catch(error => {
                console.error(error);
                reject(error);
            });
        });
    }

    static async chatGPT(text){

        text = "Please give me the filename a short description and a few relevant tags() of the code snippet  below, use json format. " +
            "every tag should be single word. filename use snake case "
            + text;

        return new Promise((resolve, reject) => {
            fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": `${text}`}]
                })
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    let content = data.choices[0].message.content;
                    let jsonForm = JSON.parse(content);
                    console.log(jsonForm);
                    resolve(jsonForm);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        })
    }

    static  romoveTagsFromDesc(desc){
       return  desc.replace(/\[(.*?)]$/, '');
    }
}