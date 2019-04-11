import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAnimals } from '../../store/animals/actions';
import './animals.module.css';

class Animals extends PureComponent {
	componentDidMount() {
		this.props.getAnimals();
	}
	
	render() {
		return (
			<div className='bodyContainer'>
				<div>
				<h1>Animal Adoption Center</h1>
				{this.props.animals.map((animal, index) => (
					<section key={index} className='card'>
						<div className='topCardContainer'>

							<div className='row'>
								<div className='col'>
									<img className='imgBorder' src={animal.image} />
								</div>
								<div className='col'>
									<div className='petName'>{animal.name} </div>
								</div>
							</div>

							<div className='adoptButtonContainer'>
								<button>Adopt {animal.name} today for MONEY AMOUNT</button>
							</div>
						</div>
						<div className='bottomCardContainer'>
						</div>

					</section>
						// <div className={`panel borders hello hi`}>{JSON.stringify(animal, null, 2)}</div>
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
