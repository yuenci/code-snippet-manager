import {Modal} from "@arco-design/web-react";
import "./Sidebar.css"
import Tools from "../Tools/Tools.js";
export default  function InfoModal(props){
    const {visible, setVisible,gist} = props;
    //console.log(gist)
    return (
        <Modal
            title='Snippet Properties'
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            okText='OK'
            cancelText='Cancel'
        >
            <div>
               <div className="info-item">
                   <div className="info-title">Title</div>
                   <div className="info-desc">{gist.title}</div>
               </div>
                <div className="info-item">
                    <div className="info-title">Updated</div>
                    <div className="info-desc">{Tools.ISO8601ToDateTime(gist.updated_at)}</div>
                </div>
                <div className="info-item">
                    <div className="info-title">Created</div>
                    <div className="info-desc">{Tools.ISO8601ToDateTime(gist.created_at)}</div>
                </div>
                <div className="info-item">
                    <div className="info-title">Size</div>
                    <div className="info-desc">{gist.files[0].size} Bytes</div>
                </div>
                <div className="info-item">
                    <div className="info-title">URL</div>
                    <div className="info-desc">
                        <a href={gist.html_url} target="_blank" rel="noreferrer">{
                            gist.html_url.substring(0, 45) + "..."
                        }</a>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-title">Language</div>
                    <div className="info-desc">{gist.files[0].language}</div>
                </div>
                <div className="info-item">
                    <div className="info-title">Owner</div>
                    <img
                        src={ gist.owner.avatar_url }
                        alt="owner avatar"
                        className="info-avatar"
                        onClick={() => { window.open(gist.owner.html_url)}}
                    />
                </div>
            </div>
        </Modal>
    )
}