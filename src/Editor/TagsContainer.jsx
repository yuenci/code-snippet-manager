import {Space, Tag} from "@arco-design/web-react";

export  default  function  TagsContainer(props) {
    const {tags} = props;
    const COLORS = [
        'red',
        'orangered',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'arcoblue',
        'purple',
        'pinkpurple',
        'magenta',
        'gray',
    ];

    function getRandomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    return (
        <Space>
            {tags &&
                tags.map((item, index) => {
                    return <Tag checkable color={getRandomColor()} defaultChecked closable key={index}>{item}</Tag>
                })
            }
        </Space>
    )
}