import './style.css'

function CardTitle(props) {
    return (
        <center>
            <h3 id='card-title'>{props.title}</h3>
        </center>
    );
}

export default CardTitle;