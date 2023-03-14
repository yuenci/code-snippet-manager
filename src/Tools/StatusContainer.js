export default  class StatusContainer {
    static  AllGistsData = [];
    static  ClearAllGistsData=[]; // only title; created_at; updated_at; description; filename; raw_url; language

    static currentCodeContent = '';

    static currentEditor = "main";

    static owner = null;

    static starredGists = [];

    static rowDataCache = [];

    static idRowUrlMap = {};

}