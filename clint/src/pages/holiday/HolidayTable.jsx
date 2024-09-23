import "./HoliDay.scss";
import { useState } from "react";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import HolidayTableAction from "./HoliDayTableAction";
// import HolidayTableAction from "./HolidayTableAction";
// import HolidayTableAction from "./HolidayTableAction.jsx";
// import HoliDayTableAction from "./HolidayTableAction";



const TABLE_HEADS = ["Days", "Time", "Action"];

const TABLE_DATA = [
  {
    Days: "Monday",
    Time: "12/7/20024",
  },
  {
    Days: "Friday",
    Time: "12/7/20024",
  },
  {
    Days: "Sunday",
    Time: "12/7/20024",
  },
  {
    Days: "Thuesday",
    Time: "12/7/20024",
  },

];

const HoliDaysList = () => {
  const [data, setData] = useState(TABLE_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <>
      <AreaTop />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">
            <input
              type="text"
              placeholder="Search Data"
              value={searchTerm}
              onChange={handleSearch}
            />
          </h4>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                  <th
                    key={index}
                    onClick={() =>
                      handleSort(th.toLowerCase().replace(" ", "_"))
                    }
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((dataItem) => {
                return (
                  <tr key={dataItem.id}>
                    <td>{dataItem.Days}</td>
                    <td>{dataItem.Time}</td>
                 

                    {/* <td>
                      <div className="dt-status">
                        <span
                        // className={`dt-status-dot dot-${dataItem.Batch}`}
                        ></span>
                        <span className="dt-status-text">{dataItem.Batch}</span>
                      </div>
                    </td> */}

                    <td className="dt-cell-action">
                      <HolidayTableAction />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default HoliDaysList;
