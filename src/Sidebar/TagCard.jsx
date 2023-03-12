import "./Sidebar.css";
export  default  function  TagCard(props) {
    const  {text} = props;
    return (
        <div className="tag-card">
            {text}
        </div>
    )
}