import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAnimals } from '../../store/animals/actions';
import styles from './animals.module.scss';



class Animals extends PureComponent {
	constructor(props) {
    super(props);
    this.state = {
			dropdown: 'Default Sort',
			clickDropdown: false,
			// animals: this.props.getAnimals(),
		};
		this.handleDropdownClick = this.handleDropdownClick.bind(this);
		this.ageAscending = this.ageAscending.bind(this);
  }
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickaway, false);
		this.props.getAnimals();
	}

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickaway, false);
	}

	handleClickaway(e) {
    // let clickedDropDown = false;
    // const refValues = Object.values(this.refs);
    // refValues.forEach(button => {
    //   if (button.contains(e.target)) {
    //     clickedDropDown = true;
    //   }
    // });

    // if (!clickedDropDown) {
    //   this.setState({ clickDropdown: false });
		// }
		console.log('refs: ', this.refs);
	}

	handleDropdownClick(e) {
		this.setState({ clickDropdown: true }, ()=> console.log('dropdown: ',this.state.clickDropdown));

	}

	closeDropdown(e, dropdownOption) {
		e.preventDefault();
		this.setState({
			clickDropdown: false,
			dropdown: dropdownOption,
		}, ()=> console.log('state: ',this.state));
	}

	ageAscending(e) {
		e.preventDefault();
    let animals = this.state.animals.slice();
		// animals.sort();
		this.setState({ animals: animals.sort() }, ()=> {
			this.closeDropdown(e, 'Age Ascending');
		})
	}

	capitolize(str) {
		let splitStr = str.toLowerCase().split(' ');
		for (let i = 0; i<splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}
		return splitStr.join(' ');
	}
	
	render() {

		return (
			<div className={`${styles.bodyContainer}`}>
				<div>
				<h1>Animal Adoption Center</h1>
				{ !this.state.clickDropdown
				? (
					<button ref={this.props.onMounted} onClick={(e) => this.handleDropdownClick(e)} className={`${styles.dropdownButton}`}>{this.state.dropdown}</button>
				)
				: (
					<section className={styles.dropdownSpacing}>
						<ul className={`${styles.dropdownContainer}`}>
							<li className={`${styles.dropdownOptions}`} onClick={(e) => this.ageAscending(e)}>
								<div>Age Ascending</div>
							</li>
							<li className={`${styles.dropdownOptions}`} onClick={(e) => this.closeDropdown(e, 'Weight Ascending')}>
								<div>Weight Ascending</div>
							</li>
							<li className={`${styles.dropdownOptions}`} onClick={(e) => this.closeDropdown(e, 'Price Ascending')}>
								<div>Price Ascending</div>
							</li>
						</ul>
					</section>
				)}
				{this.props.animals.map((animal, index) => (
					<section key={index} className={[animal.species === 'cat' ? `${styles.catRowDirection}` : `${styles.dogRowDirection}`, `${styles.card}`].join(' ')}>
							<div className={`${styles.topCardContainer}`}>
								<div className='row'>
									<div className='col'>
										<img className={`${styles.imgBorder}`} src={require(`../../../public/images/${animal.image}`)} />
									</div>
									<div className='col'>
										<div className={styles.petName}>
											<h4>{this.capitolize(animal.name)}</h4>
											<p>{this.capitolize(animal.gender)}</p>
											<p>{this.capitolize(animal.breed)}</p>
											<p>{`${Math.floor(animal.age)} year, ${Math.floor((animal.age - Math.floor(animal.age))*12)}, months`}</p>
										</div>
									</div>
								</div>
								<div className={`${styles.adoptButtonContainer}`}>
									<button className={`${styles.adoptButton}`}>Adopt {animal.name} today for ${animal.price}</button>
								</div>
							</div>
						<div className={[animal.species === 'cat' ? `${styles.catColor}` : `${styles.dogColor}`, `${styles.bottomCardContainer}`].join(' ')}>
							<div className={`panel borders hello hi`}>{JSON.stringify(animal, null, 2)}</div>
						</div>
					</section>
				))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = { getAnimals };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Animals);
