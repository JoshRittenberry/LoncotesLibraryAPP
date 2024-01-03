import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { editPatron, getPatrons } from "../../data/patronsData";
import { Link } from "react-router-dom";

export default function PatronList() {
    const [patrons, setPatrons] = useState([]);
    const [reload, setReload] = useState(false);
 
    useEffect(() => {
        getPatrons().then(setPatrons);
        setReload(false)
    }, [reload]);

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Patrons</h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th>Details</th>
                        <th>Deactivate</th>
                    </tr>
                </thead>
                <tbody>
                    {patrons.map((p) => (
                        <tr key={`patrons-${p.id}`}>
                            <th scope="row">{p.id}</th>
                            <td>{p.firstName}</td>
                            <td>{p.lastName}</td>
                            <td>{p.address}</td>
                            <td>{p.email}</td>
                            {p.isActive && (
                                <td>True</td>
                            )}
                            {!p.isActive && (
                                <td>False</td>
                            )}
                            <td>
                                <Link to={`${p.id}`}>Details</Link>
                            </td>
                            {p.isActive && (
                                <td>
                                    <button onClick={() => {
                                        p.isActive = !p.isActive
                                        editPatron(p).then(setReload(true))
                                    }}>Deactivate</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
