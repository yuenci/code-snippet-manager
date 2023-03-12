import "./ContentArea.css";
import Tools from "../Tools/Tools.js";
import PubSub from 'pubsub-js';


export  default  function ContentCard(props){
    const {gist} = props;
    //console.log(gist)
    function  clickHandler() {
        Tools.getRawContent(gist.files[0].raw_url).then(data => {
            //console.log(data)
            PubSub.publish('gistInfo', { message: gist });
            PubSub.publish('codeValue', { message: data });
        })
    }

    return (
        <div className="content-card" onClick={clickHandler}>
            <div className="content-card-title">
                {gist.title}
            </div>
            <div className="content-card-description">
                {gist.description}
            </div>
            <div className="content-card-description">
                {Tools.ISO8601ToDDMMYYYY(gist.updated_at)}
            </div>
        </div>
    )
}