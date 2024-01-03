import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { editPatron, getPatron } from "../../data/patronsData";

export default function PatronEdit() {
    const { id } = useParams();

    const [patron, setPatron] = useState(null);

    //add useEffect here to get the ticket details from the API
    useEffect(() => {
        getPatron(id).then(setPatron);
    }, []);

    if (!patron) {
        return null;
    }

    return (
        <div className="container">
            <h2>{patron.firstName} {patron.lastName}</h2>
            <Table>
                <tbody>
                    <tr>
                        <th scope="row">Address</th>
                        <td>
                            <input value={patron.address} onChange={change => {
                                let update = {...patron}
                                update.address = change.target.value
                                setPatron(update)
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>
                            <input value={patron.email} onChange={change => {
                                let update = {...patron}
                                update.email = change.target.value
                                setPatron(update)
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Active</th>
                        {patron.isActive && (
                            <Button onClick={() => {
                                let update = {...patron}
                                update.isActive = !patron.isActive
                                setPatron(update)
                            }}>True</Button>
                        )}
                        {!patron.isActive && (
                            <Button onClick={() => {
                                let update = { ...patron }
                                update.isActive = !patron.isActive
                                setPatron(update)
                            }}>False</Button>
                        )}
                    </tr>
                    <tr>
                        <th scope="row">Balance</th>
                        <td>${patron.balance}</td>
                    </tr>
                    <tr>
                        <td>
                            <Link to={`/patrons/${patron.id}`} onClick={() => {
                                editPatron(patron)
                            }}>Save Changes</Link>
                        </td>
                        <td>
                            <Link to={`/patrons/${patron.id}`}>Discard Changes</Link>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <h5>Checkouts</h5>
            {patron.checkouts?.length ? (
                <Table>
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Checkout Date</th>
                            <th>Return Date</th>
                            <th>Late Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patron.checkoutsWithLateFees.map((co) => (
                            <tr key={`checkout-${co.id}`}>
                                <td>{co.material.materialName}</td>
                                <td>{co.checkoutDate?.split("T")[0]}</td>
                                <td>{co.returnDate?.split("T")[0] || "Checked Out"}</td>
                                <td>{co.lateFee || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No checkouts for this material</p>
            )}
        </div>
    );
}
