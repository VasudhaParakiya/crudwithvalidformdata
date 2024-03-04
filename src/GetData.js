import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GetData() {
  const navigate = useNavigate();

  const storedData = localStorage.getItem("userData");
  const data = storedData ? JSON.parse(storedData) : [];

  const deleteHandler = (id) => {
    const confirmData = window.confirm("are you want to delete?");

    if (confirmData) {
      // const item = JSON.parse(localStorage.getItem("userData"));
      const newItem = data.filter((curEl) => curEl.u_id !== id);
      localStorage.setItem("userData", JSON.stringify(newItem));
      navigate("/");
    }
  };
  const formatDate = (dateString) => {
    // Assuming dateString is in YYYY-MM-DD format
    const [year, month, day] = dateString.split("-");

    // Reorder the date components and join them with "-"
    return `${day}/${month}/${year}`;
  };
  return (
    <div className=" user-data ">
      <h1 className="text-center fs-3 fw-bold mt-5">User Details</h1>
      {data.length > 0 ? (
        <>
          <div>
            
            <table className="user-table mt-5">
              <thead className="text-center">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Gender</th>
                  <th>Hobby</th>
                  <th>Contact No.</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((item) => {
                  return (
                    <>
                      <tr key={item.u_id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.city}</td>
                        <td>{item.gender}</td>
                        <td>{item.hobby[0]} <span>{item.hobby[1]}</span> <span>{item.hobby[2]}</span></td>
                        <td>{item.contact_no}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>
                          <Link to={`/addData/${item.u_id}`}>
                            <i className="bi bi-pencil me-2 icon rounded-circle"></i>
                          </Link>

                          <Link
                            to={"#"}
                            onClick={() => deleteHandler(item.u_id)}
                          >
                            <i className="bi bi-x-circle icon rounded-circle"></i>
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <Link
              to="/addData"
              className="border-0 px-5 py-2 rounded-3 text-light fs-3 text-decoration-none float-end bg-primary mt-4 d-inline-block"
            >
              add
            </Link>
          </div>
        </>
      ) : (
        <p className="fs-3">
          no data found Please <Link to="/addData">add</Link> data
        </p>
      )}

      {/* <AddData></AddData> */}
      {/* <h3>No user, Please <Link to="#"> click me</Link></h3> */}
    </div>
  );
}
