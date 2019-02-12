import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            ZipCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        // send data to backend
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'TL',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '123456',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false})
        });
    }

    render () {
        let form = (
            <form>
            <input className = {classes.Input} type="text" name ="name" placeholder = "Your Name" />
            <input className = {classes.Input} type="text" name ="email" placeholder = "Your email" />
            <input className = {classes.Input} type="text" name ="street" placeholder = "Street" />
            <input className = {classes.Input} type="text" name ="postal" placeholder = "Postal Code" />
            <Button className = {classes.Input} clicked={this.orderHandler} btnType="Success">Order</Button>
        </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className = {classes.ContactData}>
                <h4> Enter your Contact Information </h4>
                {form}
            </div>
        )
        }

}

export default ContactData;