import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAnimals } from '../../store/animals/actions';
import styles from './animals.module.scss';

class Animals extends PureComponent {
	componentDidMount() {
		this.props.getAnimals();
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
										<img className={`${styles.imgBorder}`} src={animal.image} />
									</div>
									<div className='col'>
										<div className={`${styles.petName}`}>{animal.name} </div>
									</div>
								</div>
								<div className={`${styles.adoptButtonContainer}`}>
									<button>Adopt {animal.name} today for MONEY AMOUNT</button>
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
