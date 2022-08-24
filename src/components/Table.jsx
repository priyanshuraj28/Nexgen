import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import avatar from "../images/avatar.webp";
function ResponsiveExample() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(7);
  const [toggleMinMax, setToggleMinMax] = useState(true);

  let newData = [];
  useEffect(() => {
    console.log("Entering in useeffect");
    setLoading(true);
    fetch("https://nex-g.herokuapp.com")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.Data);
        setLoading(false);
        setData(response.Data);
      });
  }, []);

  data?.map((item, index) =>
    newData[index] = toggleMinMax ? Math.min(...item.Customer.bids) : Math.max(...item.Customer.bids)
  );
  console.log("New data", newData);

  if (loading) {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  console.log("new data", data);

  return (
    <>
      <Table stripped bordered hover variant="dark" size="sm">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th width="170">Name</th>
            <th width="170">Email</th>
            <th width="170">Mobile Number</th>
            <th width="870">Premium</th>
            <th style={{ cursor: "pointer" }} width="1950" onClick={() => setToggleMinMax(!toggleMinMax)}>
              <button style={{padding: "0.7em 1.2em"}}>{`${toggleMinMax ? "Min" : "Max"} Bid`}</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.slice(begin, end).map((customer, index) => (
            <tr key={index} className="bg-white border-b text-center">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <img style={{height: "25px", width: "25px", marginRight: "5px"}} src={avatar} alt="icon" />
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
                {newData[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ textAlign: "center" }}>
        {begin > 0 && (
          <button
            onClick={() => {
              setBegin(begin - 7);
              setEnd(end - 7);
            }}
            style={{ padding: "0.6em 1.5em", fontWeight: "600" }}
          >
            &lt; PREV
          </button>
        )}
        {end < data?.length && (
          <button
            onClick={() => {
              setBegin(begin + 7);
              setEnd(end + 7);
            }}
            style={{
              padding: "0.6em 1.5em",
              fontWeight: "600",
              marginLeft: "1.8em",
            }}
          >
            NEXT &gt;
          </button>
        )}
      </div>
    </>
  );
}

export default ResponsiveExample;
