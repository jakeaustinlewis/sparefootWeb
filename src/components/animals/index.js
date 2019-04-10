import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAnimals } from '../../store/animals/actions';

class Animals extends PureComponent {
	componentDidMount() {
		this.props.getAnimals();
	}
	
	render() {
		return (
			<div>
				<h1>Animal Adoption Center</h1>
				{this.props.animals.map(a => (
					<div style={{border:'1px solid black'}} className='panel'>{JSON.stringify(a, null, 2)}</div>
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
