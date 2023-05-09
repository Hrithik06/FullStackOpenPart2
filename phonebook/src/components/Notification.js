const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    const errorStyle = {
        color:'red',
    }
if(message.includes('removed')){
    return (
        <div className="notif" style={errorStyle}>
            {message}
        </div>
    )
}
    return (
        <div className="notif">
            {message}
        </div>
    )
}

export default Notification;