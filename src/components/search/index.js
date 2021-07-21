import { PhotographIcon } from '@heroicons/react/solid'

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import React, { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

class Search extends React.Component {
  navigation = {
    'API': 'https://github.com/cameronwc/Pixel-Helper-Api',
    'Github': 'https://github.com/cameronwc/foss-photography-client',
    'Me': 'https://cameroncooper.co'
  }

  render() {
    return (
      <div className="fixed w-full bg-gray-100 z-20">
        <div className="bg-green-600">
          <Disclosure as="nav" className="bg-green-600 border-b border-green-300 border-opacity-25 lg:border-none">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                  <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-green-400 lg:border-opacity-25">
                    <div className="px-2 flex items-center lg:px-0">
                      <div className="flex-shrink-0">
                        <PhotographIcon className="block h-8 w-8 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="hidden lg:block lg:ml-10">
                        <div className="flex space-x-4">
                          {Object.keys(this.navigation).map((item, itemIdx) =>
                            itemIdx === 0 ? (
                              <Fragment key={item}>
                                {/* Current: "bg-green-700 text-white", Default: "text-white hover:bg-green-500 hover:bg-opacity-75" */}
                                <a href={this.navigation[item]} className="bg-green-700 text-white rounded-md py-2 px-3 text-sm font-medium">
                                  {item}
                                </a>
                              </Fragment>
                            ) : (
                              <a
                                key={item}
                                href={this.navigation[item]}
                                className="text-white hover:bg-green-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
                              >
                                {item}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                      <div className="max-w-lg w-full lg:max-w-xs">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <form onSubmit={(e) => {e.preventDefault(); this.props.search()}}>
                            <input
                              id="search"
                              className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white focus:border-white sm:text-sm"
                              placeholder="Mountains"
                              type="search"
                              name="search"
                              onKeyUp={(e) => this.props.updateTerm(e.target.value)}
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-green-600 p-2 rounded-md inline-flex items-center justify-center text-green-200 hover:text-white hover:bg-green-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {Object.keys(this.navigation).map((item, itemIdx) =>
                      itemIdx === 0 ? (
                        <Fragment key={item}>
                          {/* Current: "bg-green-700 text-white", Default: "text-white hover:bg-green-500 hover:bg-opacity-75" */}
                          <a
                            href={this.navigation[item]}
                            className="bg-green-700 text-white block rounded-md py-2 px-3 text-base font-medium"
                          >
                            {item}
                          </a>
                        </Fragment>
                      ) : (
                        <a
                          key={item}
                          href={this.navigation[item]}
                          className="text-white hover:bg-green-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
                        >
                          {item}
                        </a>
                      )
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    )
  }
}

export default Search
