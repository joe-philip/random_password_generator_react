import CardTitle from './card-title/component';
import Form from './form/component';
import './style.css';

function Card() {
    return (
        <div id="card-container">
            <CardTitle title="Random password generator" />
            <Form />
        </div>
    )
}

export default Card;