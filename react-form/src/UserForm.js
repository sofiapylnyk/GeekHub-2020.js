import React, {PureComponent, useCallback} from 'react';

const validName = /^[а-щьюяїієґ]+\s+[а-щьюяїієґ]+\s+[а-щьюяїієґ]+$/i;
const validEmail = /^[a-z0-9-]+[a-z0-9-\.]+[a-z0-9-]@[a-z0-9-][a-z0-9-.]+\.[a-z0-9-]+$/i;
const validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/;
const validHomeNum = /^[1-9]([0-9]){5}$/;
const validMobileNum = /(^3[0-9]{11}$)|(^0[0-9]{9}$)/;
const DEFAULT = 0;
const VALID = 1;
const INVALID = -1;
const DEFAULT_STYLE = {
    backgroundColor: '#FFFFFF',
};
const VALID_STYLE = {
    backgroundColor: '#C2E0C6',
};
const INVALID_STYLE = {
    backgroundColor: '#F9D0C4',
};

class Phone extends PureComponent {
    constructor(props) {
        super(props);
        this.owner = props.owner;
        this.state = {number: props.number, type: props.type, valIdx: props.valIdx};
    }

    changeNumber = (event) => {
        this.setState({number: event.target.value});
        this.owner.handleNumChange(this.state.number, event.target.value);
    }

    changeType = (event) => {
        this.setState({type: event.target.value});
        this.owner.handleTypeChange(this.state.number, event.target.value);
    }

    removePhone = () => {
        this.owner.removePhone(this.state.number);
    }

    render() {
        return (
            <div className="input-group mb-3">
			    <input style={this.owner.getStyle(this.state.valIdx)} type="text" className="form-control" name="phones" value={this.state.number} onChange={this.changeNumber}/>
			    <select className="custom-select" value={this.state.type} onChange={this.changeType}>
				    <option value="home">Домашній</option>
				    <option value="mobile">Мобільний</option>
			    </select>
			    <div className="input-group-append">
				    <button className="btn btn-outline-secondary" type="button" onClick={this.removePhone} >Видалити</button>
			    </div>
            </div>
        );
    }
}



export default class UserForm extends PureComponent {
    constructor(props) {
        super(props);
        this.key = 0;
        this.state = {name: props.user.name,
            email: props.user.email, 
            password: props.user.password,
            phones: props.user.phones.map(function(obj) { return {number: obj.number, 
                type: obj.type, 
                valIdx: DEFAULT,
            }} ),
            nameValIdx: DEFAULT,
            emailValIdx: DEFAULT,
            passValIdx: DEFAULT,
        };
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePassChange = (event) => {
        this.setState({password: event.target.value});
    }

    handleNumChange = (oldNum, newNum) => {
        let temp = [];

        for (let p of this.state.phones) {
            if (p.number == oldNum) {
                p.number = newNum;
            }
            temp.push(p);
        }
        this.setState({phones: temp});
    }

    handleTypeChange = (num, type) => {
        let temp = [];

        for (let p of this.state.phones) {
            if (p.number == num) {
                p.type = type;
            }
            temp.push(p);
        }
        this.setState({phones: temp});
    }

    onSubmit = (event) => {
        if (validName.test(this.state.name.trim())) {
            this.setState({nameValIdx: VALID});
        } else {
            this.setState({nameValIdx: INVALID});
        }
        if (validEmail.test(this.state.email.trim())) {
            this.setState({emailValIdx: VALID});
        } else {
            this.setState({emailValIdx: INVALID});
        }
        if (validPassword.test(this.state.password)) {
            this.setState({passValIdx: VALID});
        } else {
            this.setState({passValIdx: INVALID});
        }
        let temp = [];

        for (let p of this.state.phones) {
            let valIdx = INVALID;

            if (p.type == 'home') {
                if (validHomeNum.test(p.number.trim())) {
                    valIdx = VALID;
                }
            } else {
                if (validMobileNum.test(p.number.trim())) {
                    valIdx = VALID;
                }
            }
            p.valIdx = valIdx;
            temp.push(p);
            console.log(p.number, p.valIdx);
        }
        this.setState({phones: temp});
    }

    getStyle = (valIdx) => {
        switch(valIdx) {
            case VALID: return VALID_STYLE;
            case INVALID: return INVALID_STYLE;
            default: return DEFAULT_STYLE;
        }
    }

    getPhone = (obj) => {
        return <Phone key={this.key++} number={obj.number} type={obj.type} valIdx={obj.valIdx} owner={this} />
    }

    removePhone = (number) => {
        let temp = [];

        for (let i = 0; i < this.state.phones.length; i++) {
            if (this.state.phones[i].number != number) {
                temp.push(this.state.phones[i]);
            }
        }
        this.setState({phones: temp});
    }

    addPhone = () => {
        let temp = [];

        for (let i = 0; i < this.state.phones.length; i++) {
            temp.push(this.state.phones[i]);
        }
        temp.push({number: '', type: 'home', valIdx: DEFAULT});
        this.setState({phones: temp});
    }
    
    render() {
        return (
        <div className="container p-5">
	        <form id="user-form">
            <div className="form-group">
                <label>Name</label>
                <input style={this.getStyle(this.state.nameValIdx)} type="text" name="full_name" className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
                <small className="form-text text-muted">Обовʼязково прізвище, імʼя та по батькові. Тільки літерами українскього алфавіту</small>
            </div>
            <div className ="form-group">
			    <label>Email</label>
			    <input style={this.getStyle(this.state.emailValIdx)} type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
			    <small className="form-text text-muted">Адреса електронної пошти</small>
		    </div>
            <div className="form-group">
                <label>Password</label>
                <input style={this.getStyle(this.state.passValIdx)} type="password" name="password" className="form-control" value={this.state.password} onChange={this.handlePassChange}/>
                <small className="form-text text-muted">Мінімум 8 літер. Обовʼязково повинні бути великі та малі літери англійського алфавіту та числа</small>
            </div>
	        	<div>
		        	<label>Phones</label>
                    {this.state.phones.map(this.getPhone)}
                    <div>
		                <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                        <button className="btn btn-outline-secondary"  type="button" onClick={this.addPhone}>Додати</button>
                    </div>
                </div>
	        </form>
        </div>

        );
    }
}

  