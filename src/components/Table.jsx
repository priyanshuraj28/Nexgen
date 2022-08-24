import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
function ResponsiveExample() {
  const [data, setData] = useState();

  useEffect(() => {
    console.log("Entering in useeffect");
    fetch("https://nex-g.herokuapp.com")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.Data)
        setData(response.Data)
      });
  }, []);

  return (
    <Table stripped bordered hover variant="dark" size="sm">
      <thead>
        <tr>
          <th width="170">Name</th>
          <th width="170">Email</th>
          <th width="170">Mobile Number</th>
          <th width="870">Premium</th>
          <th width="1950">Bid</th>

        </tr>
      </thead>
      <tbody>
        {data?.map((customer, index) => (
          <tr key={index} className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

              {customer?.Customer?.firstname +
                " " +
                customer?.Customer?.lastname}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {customer?.Customer?.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {customer?.Customer?.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {customer?.Customer?.hasPremium ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {customer?.Customer?.bids[0]}
            </td>

          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ResponsiveExample;