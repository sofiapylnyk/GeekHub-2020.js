import React, {PureComponent} from 'react';

const validName = /^[а-щьюяїієґ]+\s+[а-щьюяїієґ]+\s+[а-щьюяїієґ]+$/i;
const validEmail = /^[a-z0-9-]+[a-z0-9-\.]+[a-z0-9-]@[a-z0-9-][a-z0-9-.]+\.[a-z0-9-]+$/i;
const validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/;
const validHomeNum = /^[1-9]([0-9]){5}$/;
const validMobileNum = /(^3[0-9]{11}$)|(^0[0-9]{9}$)/;
const defaultStyle = {
    backgroundColor: '#FFFFFF',
};
const validStyle = {
    backgroundColor: '#C2E0C6',
};
const invalidStyle = {
    backgroundColor: '#F9D0C4',
};

class Phone extends PureComponent {
    constructor(props) {
        super(props);
        this.owner = props.owner;
        this.state = {number: props.number, type: props.type, style: props.style};

        this.changeNumber = this.changeNumber.bind(this);
        this.changeType = this.changeType.bind(this);
        this.removePhone = this.removePhone.bind(this);
        }

    changeNumber(event) {
        this.setState({number: event.target.value});
        this.owner.handleNumChange(this.state.number, event.target.value);
    }

    changeType(event) {
        this.setState({type: event.target.value});
        this.owner.handleTypeChange(this.state.number, event.target.value);
    }

    removePhone() {
        this.owner.removePhone(this.state.number);
    }

    render() {
        return (
            <div className="input-group mb-3">
			    <input style={this.state.style} type="text" className="form-control" name="phones" value={this.state.number} onChange={this.changeNumber}/>
			    <select className="custom-select" value={this.state.type} onChange={this.changeType}>
				    <option value="home">Домашній</option>
				    <option value="mobile">Мобільний</option>
			    </select>
			    <div className="input-group-append">
				    <button className="btn btn-outline-secondary" type="button" onClick={this.removePhone}>Видалити</button>
			    </div>
            </div>
        );
    }
}

export default class UserForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {name: props.user.name, email: props.user.email, 
            password: props.user.password, phones: props.user.phones,
            nameStyle: defaultStyle, emailStyle: defaultStyle,
            passStyle: defaultStyle};

        this.phonesComp = [];

        for (let phone of props.user.phones) {
            this.phonesComp.push(<Phone key={phone.number}
                                    number={phone.number} 
                                    type={phone.type}
                                    owner={this}
                                    style={defaultStyle} />);
        }
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

    addPhone = () => {
        let newPhone = {number: '', type: 'home'};
        let temp = [];
        this.phonesComp = [];

        for (let p of this.state.phones) {
            temp.push(p);
            this.phonesComp.push(<Phone key={p.number}
                number={p.number} 
                type={p.type}
                owner={this}
                style={defaultStyle} />);
        }
        temp.push(newPhone);
        this.phonesComp.push(<Phone key={temp.length}
            number={newPhone.number} 
            type={newPhone.type}
            owner={this}
            style={defaultStyle} />);
        this.setState({phones: temp});
    }

    removePhone = (num) => {
        if (this.state.phones.length > 1) {
            let temp = [];
            this.phonesComp = [];

            for (let p of this.state.phones) {
                if (p.number != num) {
                    temp.push(p);
                    this.phonesComp.push(<Phone key={p.number}
                        number={p.number} 
                        type={p.type}
                        owner={this}
                        style={defaultStyle} />);
                }
            }
            this.setState({phones: temp});
        }
    }

    handleNumChange = (oldNum, newNum) => {
        for (let p of this.state.phones) {
            if (p.number == oldNum) {
                p.number = newNum;
            }
        }
    }

    handleTypeChange = (num, type) => {
        for (let p of this.state.phones) {
            if (p.number == num) {
                p.type = type;
            }
        }
    }

    handleSubmit = (event) => {
        if (validName.test(this.state.name.trim())) {
            this.setState({nameStyle: validStyle});
        } else {
            this.setState({nameStyle: invalidStyle});
        }
        if (validEmail.test(this.state.email.trim())) {
            this.setState({emailStyle: validStyle});
        } else {
            this.setState({emailStyle: invalidStyle});
        }
        if (validPassword.test(this.state.password)) {
            this.setState({passStyle: validStyle});
        } else {
            this.setState({passStyle: invalidStyle});
        }
        let temp = [];
        let comp = [];

        for (let p of this.state.phones) {
            let style = invalidStyle;
            let num = p.number;
            let type = p.type
            temp.push({number: num, type: type});

            if (type == 'home') {
                if (validHomeNum.test(num.trim())) {
                    style = validStyle;
                }
            } else {
                if (validMobileNum.test(num.trim())) {
                    style = validStyle;
                }
            }
            comp.push(<Phone key={num}
                number={num} 
                type={type}
                owner={this}
                style={style} />);
        }
        this.phonesComp = comp;
        this.setState({phones: temp});
    }
    
    render() {
        return (
        <div className="container p-5">
	        <form id="user-form">
            <div className="form-group">
                <label>Name</label>
                <input style={this.state.nameStyle} type="text" name="full_name" className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
                <small className="form-text text-muted">Обовʼязково прізвище, імʼя та по батькові. Тільки літерами українскього алфавіту</small>
            </div>
            <div className ="form-group">
			    <label>Email</label>
			    <input style={this.state.emailStyle} type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
			    <small className="form-text text-muted">Адреса електронної пошти</small>
		    </div>
            <div className="form-group">
                <label>Password</label>
                <input style={this.state.passStyle} type="password" name="password" className="form-control" value={this.state.password} onChange={this.handlePassChange}/>
                <small className="form-text text-muted">Мінімум 8 літер. Обовʼязково повинні бути великі та малі літери англійського алфавіту та числа</small>
            </div>
	        	<div>
		        	<label>Phones</label>
			        {this.phonesComp}
		            <button type="button" className="btn btn-primary" onClick={this.handleSubmit} >Submit</button>
                    <button className="btn btn-outline-secondary" type="button" onClick={this.addPhone}>Додати</button>
                </div>	
	        </form>
        </div>
        );
    }
}

  