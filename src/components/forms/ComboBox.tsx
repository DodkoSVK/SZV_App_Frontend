import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { PersonSelect } from '../../assets/types/personTypes'

interface Props {
  people: PersonSelect[];
  onSelectChange: (id: number) => void; // Pridanie funkcie na vrátenie ID rodičovi
}

const ComboBox: React.FC<Props> = (props) => {
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<PersonSelect | null>(null);
  const { people = [], onSelectChange } = props;

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          const fullName = `${person.fname || ''} ${person.sname || ''}`.toLowerCase();
          return fullName.includes(query.toLowerCase());
        });

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <Combobox
      as="div"
      value={selectedPerson}
      onChange={(person: PersonSelect) => {
        setQuery('')
        setSelectedPerson(person);
        if (person?.id) onSelectChange(person.id);         
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
          <ComboboxOptions 
            className="absolute z-10 mt-1 max-h-50 w-full overflow-auto rounded-md bg-[#0B3C5D] py-1 text-base ring-1 ring-gray-500 ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}              
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-[#F7F9FB] data-[focus]:bg-[#D9B310] data-[focus]:text-black"
              >
                <div className="flex items-center">
                  <span
                    className={classNames(
                      'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                      person.club ? 'bg-green-500' : 'bg-red-500',
                    )}
                    aria-hidden="true"
                  />
                  <span className="ml-2 truncate group-data-[selected]:font-semibold">{person.fname} {person.sname}</span>
                  <span className="ml-2 truncate text-gray-500 group-data-[focus]:text-black">
                    {person.club}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-[#D9B310] group-data-[selected]:flex group-data-[focus]:text-black">
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