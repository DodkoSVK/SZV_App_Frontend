import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Club } from '../../assets/types/clubTypes'

interface Props {
  clubs: Club[] | { message: string };
  onSelectChange: (id: number | null) => void; // Umožníme null pre prípad, že nie sú kluby
}

const ComboBoxPerson: React.FC<Props> = ({ clubs, onSelectChange }) => {
  const [query, setQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const isClubArray = Array.isArray(clubs);

  // Filtrovanie klubov podľa query
  const filteredClubs = isClubArray
    ? query === ''
      ? clubs
      : clubs.filter((club) => club.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <Combobox
      as="div"
      value={selectedClub}
      onChange={(club: Club | null) => {
        setQuery('');
        setSelectedClub(club);
        onSelectChange(club ? club.id : null);
      }}
    >
      <Label className="text-sm text-[#F7F9FB]">Športový klub</Label>
      <div className="relative mt-2">
        <ComboboxInput
          className="w-full bg-transparent border-0 border-b-2 border-gray-300 py-1.5 pr-12 text-[#F7F9FB] focus:border-[#D9B310] focus:outline-none"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(club: Club | null) => (club ? club.name : '')}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions className="absolute z-10 mt-1 max-h-50 w-full overflow-auto rounded-md bg-[#0B3C5D] py-1 text-base ring-1 ring-gray-500 ring-opacity-5 focus:outline-none sm:text-sm">
          {isClubArray ? (
            filteredClubs.length > 0 ? (
              filteredClubs.map((club) => (
                <ComboboxOption
                  key={club.id}
                  value={club}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-[#F7F9FB] data-[focus]:bg-[#D9B310] data-[focus]:text-black"
                >
                  <div className="flex items-center">
                    <span className="ml-2 truncate group-data-[selected]:font-semibold">
                      {club.name}
                    </span>
                  </div>
                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-[#D9B310] group-data-[selected]:flex group-data-[focus]:text-black">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </ComboboxOption>
              ))
            ) : (
              <div className="p-2 text-[#F7F9FB]">Žiadne kluby</div>
            )
          ) : (
            <div className="p-2 text-[#F7F9FB]">{clubs.message}</div>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default ComboBoxPerson;
