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
		let splitStr = str.toLowerCase().split(' ');
		for (let i = 0; i<splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}
		return splitStr.join(' ');
	}

	overallRating(animalRatings) {
		let ratingSum = 0;
		animalRatings.forEach(rating => ratingSum += rating.score);
		let overallRating = ratingSum/(animalRatings.length)
		return `Overall Rating ${overallRating}`;
	}

	ratingScore(ratings, filterStr) {
		let matchingKey;

		for (let i=0; i<ratings.length; i++) {
			let keys = Object.keys(ratings[i]);
			matchingKey = keys.indexOf(filterStr) !== -1
		}
		console.log('matching key: ', matchingKey);
		// let myKeys = Object.keys(myObject)
		// console.log('filtered rating: ', ratings.filter(rating => rating.score === filterStr).score);
		// return rating.filter(rating => rating.score === filterStr).score;
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
								<h5>{this.overallRating(animal.ratings)}</h5>
								{/* <h5>{`Overall Rating ${this.overallRating(animal.ratings)}`} </h5> */}

								{/* { animal.ratings.map(rating => (
									{ rating.
									}
								))} */}

								<p>GOOD WITH KIDS {() => this.ratingScore(animal.ratings, 'children')} </p>
								<p>ENERGY LEVEL {animal.ratings[1].score}</p>
								<p>HOUSE BROKEN {animal.ratings[2].score}</p>
								<p>GOOD WITH PETS {animal.ratings[3].score}</p>
							</div>
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
