import './photo.css'

import React from 'react'

import { DownloadIcon, AdjustmentsIcon } from '@heroicons/react/solid'
import { TransitionGroup } from 'react-transition-group'; // ES6

// const TransitionGroup = React.addons.TransitionGroup;

export default class Photo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: props.photo,
            visible: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        return (
            <div
                key={this.state.photo.id}
                id={this.state.photo.id}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
                <img className="w-full h-full rounded-t-md object-cover" src={this.state.photo.display_url} alt={this.state.photo.alt_text} />
                <div>
                    <div className="text-gray-400 text-left px-2 w-full">
                        <ul className="flex justify-between">
                            <li>{this.state.photo.width} x {this.state.photo.height}</li>
                            <li>{this.state.photo.source}</li>
                        </ul>
                    </div>
                    <hr />

                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex">
                            <a
                                href={this.state.photo.download_link}
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                                <DownloadIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Download</span>
                            </a>
                        </div>
                        <div className="-ml-px w-0 flex-1 flex">
                            <a onClick={this.handleClick}
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                                <AdjustmentsIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">Info</span>
                            </a>
                        </div>
                    </div>

                    <Modal 
                        visible={this.state.visible}
                        height={this.state.photo.height}
                        width={this.state.photo.width}
                        source={this.state.photo.source}
                        urls={this.state.photo.urls}
                    />
                </div>
            </div>
        )
    }
}
