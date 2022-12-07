import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchbarWrap, Form, Input, SearchBtn } from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = e => {
    const searchQuery = e.currentTarget.value;
    setSearchQuery(searchQuery);
  };

  const onSearchBtnClick = e => {
    e.preventDefault();
    const formattedQuery = searchQuery.trim().toLowerCase();
    if (formattedQuery) {
      onSubmit(formattedQuery);
    } else {
      alert(`Enter something`);
    }
  };

  return (
    <SearchbarWrap>
      <Form>
        <SearchBtn type="submit" onClick={onSearchBtnClick}>
          <AiOutlineSearch size="20" />
        </SearchBtn>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          maxLength="20"
          value={searchQuery}
          onChange={onInputChange}
        />
      </Form>
    </SearchbarWrap>
  );
}
