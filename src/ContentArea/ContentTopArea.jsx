import {Button, Input} from '@arco-design/web-react';
import "./ContentArea.css";
import {IconSort} from "@arco-design/web-react/icon";
const InputSearch = Input.Search;
export  default  function  ContentTopArea ( )  {
    function  onSearchHandler(value){
        console.log(value) ;
    }

    return (
        <div className="content_top_area_con">
            <InputSearch placeholder='Enter keyword to search' className="search-bar" onSearch={onSearchHandler}/>
            <Button type='primary' icon={<IconSort />} />
        </div>
    )
}