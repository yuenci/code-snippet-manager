import "../../Sidebar/Sidebar.css";
import PubSub from "pubsub-js";
import StatusContainer from "../../Tools/StatusContainer.js";
export  default  function  TagCard(props) {
    const  {text,type,data} = props;

    let clickHandler = () => {
        if(type ==="starred"){
            //console.log(data)
            PubSub.publish('updateEditorData', { gist_id: data.id });
            PubSub.publish('switchEditor', {
                type: "main",
                content:StatusContainer.currentCodeContent,
            });
        }
    };

    return (
        <div className="tag-card" onClick={clickHandler}>
            {text}
        </div>
    )
}