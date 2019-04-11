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
				{this.props.animals.map((animal, index) => (
					<section key={index} className={`${styles.card}`}>
							<div className={`${styles.topCardContainer}`}>
								<div className='row'>
									<div className='col'>
										<img className={`${styles.imgBorder}`} src={require(`../../../public/images/${animal.image}`)} />
									</div>
									<div className='col'>
										<div className={styles.petName}>
											{/* <h4 className={``}>{`${animal.name.charAt(0).toUpperCase()}${animal.name.slice(1)}`}</h4> */}
											<h4 className={``}>{this.capitolize(animal.name)}</h4>
											<p>{this.capitolize(animal.gender)}</p>
											<p>{this.capitolize(animal.breed)}</p>
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
