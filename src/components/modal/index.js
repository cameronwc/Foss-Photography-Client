/* This example requires Tailwind CSS v2.0+ */
import { DownloadIcon } from '@heroicons/react/solid'
import React from 'react'

export default function Modal(props) {
  return (<div>
    {props.visible ?
        <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
            <div role="group" aria-labelledby="label-email" className="text-sm">
                <div className="grid grid-cols-2 sm:gap-4">
                    <div className="mt-4 flex flex-col text-left pl-2">
                        <li>Width:</li>
                        <li>Height:</li>
                        <li>Source:</li>
                    </div>
                    <div className="mt-4 flex flex-col text-right pr-2 text-gray-500">
                        <li>{props.height}</li>
                        <li>{props.width}</li>
                        <li>{props.source}</li>
                    </div>
                </div>

                <div className="mt-4 flex flex-col">
                    <p className="pl-2 float-left">Alternate Sizes:</p>
                    <br />
                    {Object.keys(props.urls).map(link => (
                        <a key={link} href={props.urls[link]} className="relative flex justify-between focus:ring-indigo-500">
                            <span
                                className="text-green-600 border-gray-300 rounded pl-4"
                            >{link}</span>
                            <DownloadIcon className="pr-4 w-8 h-8" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
        : <div></div>}
  </div>)
}