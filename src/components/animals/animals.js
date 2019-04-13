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
		this.props.getAnimals();
	}

	handleDropdownClick(e) {
		e.preventDefault();
		this.setState({ clickDropdown: true });
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
		return `${score}/5`;
	}

	averageProperty(animals, key) {
		if (key === 'overallRatings') {
			let sumOverallRating = animals.reduce((sum, value) => sum + this.overallRating(value.ratings), 0);
			return sumOverallRating /animals.length;
		}
		let sum = animals.reduce((sum, value) => sum + value[key], 0);
		return sum/animals.length;
	}

	sortByDropdown(animalOne, animalTwo) {
		if(this.state.sortBy === 'Age Ascending'){
			return animalOne.age - animalTwo.age;
		} else if(this.state.sortBy === 'Weight Ascending') {
			return animalOne.weight - animalTwo.weight;
		} else if(this.state.sortBy === 'Price Ascending') {
			return animalOne.price - animalTwo.price;
		} else if(this.state.sortBy === 'Recommended') {

			let animals = this.props.animals.slice();
			let cats = animals.filter(animal => animal.species === 'cat');
			let dogs = animals.filter(animal => animal.species === 'dog');

			let avgCat = {};
			let avgDog = {};

			// Find average cat properties
			avgCat.age = this.averageProperty(cats, 'age');
			avgCat.price = this.averageProperty(cats, 'price');
			avgCat.weight = this.averageProperty(cats, 'weight');
			avgCat.overallRating = this.averageProperty(cats, 'overallRatings');

			// Find average dog properties
			avgDog.age = this.averageProperty(dogs, 'age');
			avgDog.price = this.averageProperty(dogs, 'price');
			avgDog.weight = this.averageProperty(dogs, 'weight');
			avgDog.overallRating = this.averageProperty(dogs, 'overallRatings');

			// Find weighted score
			let wAnimalOne = this.weightedScore(animalOne, animalOne.species === 'cat' ? avgCat : avgDog);
			let wAnimalTwo = this.weightedScore(animalTwo, animalTwo.species === 'cat' ? avgCat : avgDog);

			return wAnimalTwo - wAnimalOne;

		} else return animalOne;
	}

	weightedScore(animal, avgAnimal) {
		let wPrice = 1.2*animal.price/avgAnimal.price;
		let wAge = 1.1*animal.age/avgAnimal.age;
		let wWeight = animal.weight/avgAnimal.weight;
		let wOverallRating = this.overallRating(animal.ratings)/avgAnimal.overallRating;
		return wPrice + wAge - wWeight + wOverallRating;
	}

	render() {
		return (
			<div className={`${styles.bodyContainer}`}>
				<div>
				<h1>Animal Adoption Center</h1>
				{ !this.state.clickDropdown
				? <button ref={this.props.onMounted} onClick={(e) => this.handleDropdownClick(e)} className={`${styles.dropdownButton}`}>{this.state.sortBy}</button>
				: (
					<section className={styles.dropdownSpacing}>
						<ul className={`${styles.dropdownContainer}`}>
							<li onClick={(e) => this.closeDropdown(e, 'Age Ascending')}>
								<div>Age Ascending</div>
							</li>
							<li onClick={(e) => this.closeDropdown(e, 'Weight Ascending')}>
								<div>Weight Ascending</div>
							</li>
							<li onClick={(e) => this.closeDropdown(e, 'Price Ascending')}>
								<div>Price Ascending</div>
							</li>
							<li onClick={(e) => this.closeDropdown(e, 'Recommended')}>
								<div>Recommended</div>
							</li>
							<li onClick={(e) => this.closeDropdown(e, 'Default Sort')}>
								<div>Default Sort</div>
							</li>
						</ul>
					</section>
				)}
				{ this.props.animals.sort((animalOne, animalTwo) => {
					return this.sortByDropdown(animalOne, animalTwo);
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
											<p>{`${Math.floor(animal.age)} year, ${Math.floor((animal.age - Math.floor(animal.age))*12)} months`}</p>
										</div>
									</div>
								</div>
								<div className={`${styles.adoptButtonContainer}`}>
									<button>Adopt {animal.name} today for ${animal.price}</button>
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
