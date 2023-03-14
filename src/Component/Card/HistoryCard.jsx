import Tools from "../../Tools/Tools.js";
import "./HistoryCard.css";
import {IconHistory} from "@arco-design/web-react/icon";
import StatusContainer from "../../Tools/StatusContainer.js";

export  default  function HistoryCard(props){
    const {history,setShowDrawer} = props;
    const  owner  =  history.owner;
    const keys = Object.keys(history.files);
    const file = history.files[keys[0]];
    //console.log(file.language)
    // const  language  =  file.language;
    // const  languageLower  =  file.language.toLowerCase();
    // const languageIcon  =  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${languageLower}/${languageLower}-original.svg`;
    //console.log(languageIcon)

    const currentHistory = file.content;

    function showDiff(){
        //console.log("showDiff")
        PubSub.publish('switchEditor', {
            type: "diff",
            content:[StatusContainer.currentCodeContent, currentHistory]
        });
        setShowDrawer(false);
    }


    return (
        <div className="history-card">
            <div className="history-card-left">
                <img src={owner.avatar_url} alt="avatar" className="history-card-avatar-img"  />
            </div>
            <div  className="history-card-right">
                <div  className="history-card-upper">
                    <div className="history-card-owner">
                        <span className="history-card-owner-name">{Tools.capitalizeFirstLetter(owner.login )}</span>
                        <span> edited</span>
                    </div>
                    {/*<img src={languageIcon}  alt="language" className="history-card-language-img" />*/}
                    <div className={"history-card-icon-con"}>
                        <IconHistory  className={"history-card-icon"} onClick={ showDiff} />
                    </div>
                </div>
                <div  className="history-card-lower">
                    <div className="history-card-update-time">
                        {Tools.convertISO8601toUTC8String(history.history[0].committed_at)}
                    </div>
                </div>
            </div>
        </div>
    )
}