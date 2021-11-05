import React, { useState } from 'react';
import ToolbarHeader from './ToolbarHeader';
import ToolbarFooter from './ToolbarFooter';
import Table from './Table';
import PropTypes from 'prop-types';
import EmptyState from './Empty';

const GeneralTable = ({ filters, data, toolbarButtons, actionFunction }) => {
  const [input, setInput] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const filteredByName = () =>
    data.filter((repo) =>
      repo.Name.toLowerCase().includes(input.toLowerCase())
    );

  const sortedByDirection = (rows) =>
    rows.sort((a, b) =>
      sortDirection === 'asc'
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );

  return (
    <>
      <ToolbarHeader
        count={filteredByName().length}
        toolbarButtons={toolbarButtons}
        filters={filters}
        input={input}
        setInput={setInput}
        perPage={perPage}
        setPerPage={setPerPage}
        page={page}
        setPage={setPage}
      />
      {filteredByName().length > 0 ? (
        <Table
          actionFunction={actionFunction}
          columns={['Name']}
          rows={sortedByDirection(filteredByName()).slice(
            (page - 1) * perPage,
            (page - 1) * perPage + perPage
          )}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      ) : (
        <EmptyState
          bgColor="white"
          icon="search"
          title="No match found"
          secondaryActions={[
            {
              title: 'Clear all filters',
              onClick: () => setInput(''),
            },
          ]}
        />
      )}
      <ToolbarFooter
        count={filteredByName().length}
        setInput={setInput}
        perPage={perPage}
        setPerPage={setPerPage}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

GeneralTable.propTypes = {
  filters: PropTypes.func,
  data: PropTypes.array,
  toolbarButtons: PropTypes.array,
  actionFunction: PropTypes.func,
};

export default GeneralTable;
