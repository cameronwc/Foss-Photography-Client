/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import Loader from '../loader'
import Photo from '../photo';


class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'bottom': window.innerHeight + 300
        }
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= this.state.bottom;
      }
    
    componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    }
    
    componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
    }
    
    trackScrolling = () => {
        const wrappedElement = document.getElementById('pictures');
        if (this.isBottom(wrappedElement)) {
            this.props.hitBottom()
            this.setState({
                'bottom': window.innerHeight + 300
            })
        }
    };
    
    render() {
        return (
            <ul id='pictures' className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 mx-2">
                {this.props.pictures.length == 0 ? <Loader /> : this.props.pictures.map((photo) => (
                    <Photo photo={photo} key={photo.id} />
                ))}
            </ul>
        )
    }
}

export default Results
