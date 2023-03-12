import "./ContentArea.css";

export  default  function ContentCard(props){
    const {title,description} = props;
    return (
        <div className="content-card">
            <div className="content-card-title">
                {title}
            </div>
            <div className="content-card-description">
                {description}
            </div>
        </div>
    )
}