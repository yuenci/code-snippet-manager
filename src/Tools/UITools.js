import {Notification} from "@arco-design/web-react";

export  default  class UITools{
    static Notify( type,message) {
        type = type.toLowerCase();

        if(type === 'info'){
            Notification.info({
                title: 'Info',
                content: message,
            })
        }else if(type === 'error'){
            Notification.error({
                title: 'Error',
                content: message,
            })
        }else if(type === 'warning'){
            Notification.warning({
                title: 'Warning',
                content: message,
            })
        }else if (type === 'success'){
            Notification.success({
                title: 'Success',
                content: message,
            })
        } else {
            Notification.normal({
                title: 'Normal',
                content:  message,
            })
        }
    }
}