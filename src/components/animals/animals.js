import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAnimals } from '../../store/animals/actions';
import styles from './animals.module.scss';

class Animals extends PureComponent {
	constructor(props) {
    super(props);
    this.state = {
			sortBy: 'Default Sort',
			clickDropdown: false,
			animals: [],
		};
		this.handleDropdownClick = this.handleDropdownClick.bind(this);
		this.overallRating = this.overallRating.bind(this);
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

	closeDropdown(e, sortBy) {
		e.preventDefault();
		this.setState({
			clickDropdown: false,
			sortBy,
		});
	}

	capitolize(str) {
		let strSplit = str.toLowerCase().split(' ');
		for (let i = 0; i<strSplit.length; i++) {
			strSplit[i] = strSplit[i].charAt(0).toUpperCase() + strSplit[i].substring(1);
		}
		return strSplit.join(' ');
	}

	overallRating(animalRatings) {
		let ratingSum = 0;
		animalRatings.forEach(rating => ratingSum += rating.score);
		let overallRating = ratingSum/(animalRatings.length)
		return overallRating;
	}

	ratingScore(ratings, filterStr) {
		let score = ratings.filter(rating => rating.type === filterStr)[0].score;
		return <span>{`${score}/5`}</span>;
	}

	render() {
		return (
			<div className={`${styles.bodyContainer}`}>
				<div>
				<h1>Animal Adoption Center</h1>
				{ !this.state.clickDropdown
				? (
					<button ref={this.props.onMounted} onClick={(e) => this.handleDropdownClick(e)} className={`${styles.dropdownButton}`}>{this.state.sortBy}</button>
				)
				: (
					<section className={styles.dropdownSpacing}>
						<ul className={`${styles.dropdownContainer}`}>
							<li className={`${styles.dropdownOptions}`} onClick={(e) => this.closeDropdown(e, 'Age Ascending')}>
								<div>Age Ascending</div>
							</li>
							<li className={`${styles.dropdownOptions}`} onClick={(e) => this.closeDropdown(e, 'Weight Ascending')}>
								<div>Weight Ascending</div>
							</li>
							<li className={`${styles.dropdownOptions}`} onClick={(e) => this.closeDropdown(e, 'Price Ascending')}>
								<div>Price Ascending</div>
							</li>
							<li className={`${styles.dropdownOptions}`} onClick={(e) => this.closeDropdown(e, 'Default Sort')}>
								<div>Default Sort</div>
							</li>
						</ul>
					</section>
				)}
				{ this.props.animals.sort((animalOne, animalTwo)=> {
						if(this.state.sortBy === 'Age Ascending'){
							return animalOne.age - animalTwo.age;
						} else if(this.state.sortBy === 'Weight Ascending') {
							return animalOne.weight - animalTwo.weight;
						} else if(this.state.sortBy === 'Price Ascending') {
							return animalOne.price - animalTwo.price;
						} else return animalOne;
				}).map((animal, index) => (
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
							<div className={`${styles.petStats}`}>
								<div>
									<h5>Overall Rating {this.overallRating(animal.ratings)}</h5>
									<div>
										<p>GOOD WITH KIDS</p>
										<span>{this.ratingScore(animal.ratings, 'children')}</span>
									</div>
									<div>
										<p>ENERGY LEVEL</p>
										<span>{this.ratingScore(animal.ratings, 'energy')}</span>
									</div>
									<div>
										<p>HOUSE BROKEN</p>
										<span>{this.ratingScore(animal.ratings, 'housebroken')}</span>
									</div>
									<div>
										<p>GOOD WITH PETS</p>
										<span>{this.ratingScore(animal.ratings, 'pets')}</span>
									</div>
								</div>
							</div>
							{/* <div className={`panel borders hello hi`}>{JSON.stringify(animal, null, 2)}</div> */}
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
