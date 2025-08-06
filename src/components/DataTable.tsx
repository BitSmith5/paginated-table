import { useState, useEffect } from 'react';
import './DataTable.css';
import './Pagination.css';

type DataRow = {
  id: string;
  [key: string]: string | number | boolean;
};

interface DataTableProps {
  data: DataRow[];
  itemsPerPage?: number;
  showPagination?: boolean;
  onRowClick?: (row: DataRow) => void;
}

const maxPageButtons = 4;

export function DataTable({ data, itemsPerPage = 10, showPagination = true, onRowClick }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  itemsPerPage = Math.max(1, itemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const getPageButtons = () => {
    const buttons = [];
    const totalButtons = Math.min(maxPageButtons, totalPages);
    const half = Math.floor(totalButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + totalButtons - 1);

    if (end - start + 1 < totalButtons) {
      start = Math.max(1, end - totalButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(i);
    }
    return buttons;
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [data, totalPages, currentPage]);

  const handleRowClick = (row: DataRow) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id} onClick={() => handleRowClick(row)}>
              {Object.values(row).map((value, index) => (
                <td 
                  key={index}
                >
                  {value.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {getPageButtons().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'selected' : ''}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}