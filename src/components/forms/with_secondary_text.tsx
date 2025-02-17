/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { PersonSelect } from '../../assets/types'

interface Props {
people: PersonSelect[]
}

const ComboBox: React.FC<Props> = (props) => {
const [query, setQuery] = useState('')
const [selectedPerson, setSelectedPerson] = useState<PersonSelect | null>(null)

const { people = [] } = props;

const filteredPeople =
  query === ''
    ? people
    : people.filter((person) =>
        person.fname.toLowerCase().includes(query.toLowerCase())
      )

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

return (
  <Combobox
    as="div"
    value={selectedPerson}
    onChange={(person: PersonSelect) => {
      setQuery('')
      setSelectedPerson(person)
    }}
  >
    <Label className="text-sm text-[#F7F9FB]">Štatutár klubu</Label>
    <div className="relative mt-2">
      <ComboboxInput        
        className="w-full bg-transparent border-0 border-b-2 border-gray-300 py-1.5 pr-12 text-[#F7F9FB] focus:border-[#D9B310] focus:outline-none"
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(person: PersonSelect) => `${person?.fname || ''} ${person?.sname || ''}`}

      />
      <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      {filteredPeople.length > 0 && (
        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span
                  className={classNames(
                    'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                    person.club ? 'bg-green-400' : 'bg-red-400',
                  )}
                  aria-hidden="true"
                />
                <span className="ml-2 truncate group-data-[selected]:font-semibold">{person.fname} {person.sname}</span>
                <span className="ml-2 truncate text-gray-500 group-data-[focus]:text-indigo-200">
                  {person.club}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </div>
  </Combobox>
);
};

export default ComboBox;