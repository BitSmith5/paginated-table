import { useState, useEffect } from 'react';

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

export function DataTable({ data, itemsPerPage = 10, showPagination = true, onRowClick }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  itemsPerPage = Math.max(1, itemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

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
      <table>
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
                <td key={index}>{value.toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}