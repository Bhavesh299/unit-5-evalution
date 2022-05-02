import { useState,useEffect } from "react";
export const Orders = () => {
    //  Get all data when admin logs in and populate it
    //  store it in redux
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getdata = async () => {
        const response = await fetch('http://localhost:8080/orders');
        const data = await response.json();
        // console.log(data);
        setOrders(data);
        setIsLoading(false);
    }
    useEffect(() => {
        getdata();
    }, []);

  
    return (
      <div>
        <div>
            <div>
                <select className="controls" name="progress" id="progress">
                    <option value="id">ID</option>
                    <option value="status">Status</option>
                    <option value="cost">Cost</option>
                </select>
             </div> 
            <table className="orders">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Problem</th>
                        <th>Status</th>
                        <th>Cost</th>
                        <th>Change Status</th>
                        <th>Accept</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr className="orders-row" key={order.id}>
                            <td className="id">{order.id}</td>
                            <td className="problem">{order.problem}</td>
                            {/* <td className="owner">{order.owner}</td> */}
                            <td className="status">{order.status}</td>
                            <td className="cost">{order.cost}</td>
                            <td className="change-status">
                                {/* Show select dropdown only if status is Not Accepted */}
                                
                                <select className="changeStatus" name="changeStatus">
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                    <option value="Not Accepted">Not Accepted</option>
                                </select>
                            </td>
                            <td className="accept">
                                {/* Show this button only if status is Not Accepted */}
                                {/* on change make request to update it in db, and show changed status in table */}
                                <button >Accept</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    );
  };