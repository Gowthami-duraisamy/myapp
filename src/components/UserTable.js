function UserTable({ tableInstance }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="table-wrapper">
      <table {...getTableProps()} className="custom-table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((col) => (
                <th {...col.getHeaderProps()}>{col.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
