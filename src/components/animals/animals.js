import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAnimals } from '../../store/animals/actions';
import styles from './animals.module.css';

class Animals extends PureComponent {
	componentDidMount() {
		this.props.getAnimals();
	}
	
	render() {
		return (
			<div>
				<h1>Animal Adoption Center</h1>
				{this.props.animals.map((animal, index) => (
					<li key={index}>
						<div className={`panel borders`}>{JSON.stringify(animal, null, 2)}</div>
					</li>
				))}
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
