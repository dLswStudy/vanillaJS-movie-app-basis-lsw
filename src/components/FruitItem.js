import {Component} from "../core/heropy";

export default class FruitItem extends Component {
    constructor(payload) {
        super({
                tagName: 'li',
                props: payload.props
            }
        );
    }
    render() {
        this.el.innerHTML = `
            <span>${this.props.name}</span>
            <span>${this.props.price}</span>
        `
    }
}
