const Card = ({
    children,
    height,
    width,
    style,
    type,
    icon,
    iconDivStyle,
    iconStyle
}) => {

    styleCard = Object.assign({},styleCard,{height: height,width: width})
    style = Object.assign({},style, styleCard )
    iconDivStyle = Object.assign({}, iconDivStyle, styleDivIcon)
    iconStyle = Object.assign({}, iconStyle, styleIcon)
    let cardType = () => {
        return <></>
    }
    
    switch (type) {
        case "icon":
            style = Object.assign({},style, {border: "3px solid #72A7C7"})
            cardType = () => {
                return(
                    <><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <div style={iconDivStyle}>
                        <i className="material-icons" style={iconStyle}>{icon}</i>
                    </div>
                    </>
                )
            }
            break;
        default:
            cardType = () => {return<></>}
            break;
    }


    return (
            <div style={style}>
                {cardType()}
                <div>
                    {children}
                </div>
            </div>
    );
}

const styleDivIcon = {
    background: "#72A7C7",
    float: "left"
}

const styleIcon = {
    color: "#ffffff"
}

let styleCard = {

} 
//background: "#72A7C7"

Card.defaultProps = {
    height: "110px",
    width: "380px",
    style: {},
    type: "simple",
    icon: "attach_file",
    iconStyle: {}
}

export default Card;