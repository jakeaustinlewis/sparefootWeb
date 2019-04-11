import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAnimals } from '../../store/animals/actions';
import styles from './animals.module.scss';

class Animals extends PureComponent {
	componentDidMount() {
		this.props.getAnimals();
	}

	getAge(age) {

	}
	
	render() {

		// let time = animal.age;
		// let years = Math.floor(animal.age);
		// let months = Math.floor((animal.age * 365) - (Math.floor(animal.age/365))/30);

		// let years = Math.floor(animal.age);
		// let month = (animal.age - Math.floor)
		return (
			<div className={`${styles.bodyContainer}`}>
				<div>
				<h1>Animal Adoption Center</h1>
				{this.props.animals.map((animal, index) => (
					<section key={index} className={`${styles.card}`}>
							<div className={`${styles.topCardContainer}`}>
								<div className='row'>
									<div className='col'>
										<img className={`${styles.imgBorder}`} src={require(`../../../public/images/${animal.image}`)} />
										{/* <img className={`${styles.imgBorder}`} src={require() animal.image} /> */}
									</div>
									<div className='col'>
										<div className={styles.petName}>
											<h4 className={``}>{`${animal.name.charAt(0).toUpperCase()}${animal.name.slice(1)}`}</h4>
											<p>{animal.gender}</p>
											<p>{animal.breed}</p>
											<p>{`${Math.floor(animal.age)} year, ${Math.floor((animal.age - Math.floor(animal.age))*12)}, months`}</p>
										</div>
									</div>
								</div>
								<div className={`${styles.adoptButtonContainer}`}>
									<button>Adopt {animal.name} today for ${animal.price}</button>
								</div>
							</div>
						<div className={`${styles.bottomCardContainer}`}>
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
