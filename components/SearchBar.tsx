'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/results/?query=${searchTerm}`);
  };

  return (
    <div className='searchmargintop flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex opacity-70 transition-opacity duration-200 focus-within:opacity-90'
      >
        <div>
          <input
            value={searchTerm}
            className='bg-primaryLight mh-10 rounded-l-md p-2 shadow-sm outline-none'
            type='text'
            placeholder='Find an item...'
            required
            onChange={handleInputChange}
          />
        </div>
        <button
          className='max-h-10 flex-shrink-0 flex-grow-0 rounded-r-md bg-secondaryGray px-3 py-2 '
          type='submit'
          aria-label='Search for item'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            viewBox='0 0 16 16'
          >
            <path
              fill='currentColor'
              d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0'
            />
          </svg>{' '}
        </button>
      </form>
    </div>
  );
};
