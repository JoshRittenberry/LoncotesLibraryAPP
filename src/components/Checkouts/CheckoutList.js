import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { editCheckout, getCheckouts } from "../../data/checkoutData";

export default function CheckoutList() {
    const [checkouts, setCheckouts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getCheckouts().then(checkoutsData => {
            checkoutsData.sort((a, b) => a.id - b.id);
            setCheckouts(checkoutsData);
        });
        setReload(false);
    }, [reload]);

    return (
        <div className="container">
            <div className="sub-menu bg-light">
                <h4>Checkouts</h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Material</th>
                        <th>Patron</th>
                        <th>Checkout Date</th>
                        <th>Return Date</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {checkouts.map((co) => (
                        <tr key={`checkouts-${co.id}`}>
                            <th scope="row">{co.id}</th>
                            <td>{co.material.materialName}</td>
                            <td>{co.patronId}</td>
                            <td>{co.checkoutDate}</td>
                            {co.returnDate != null && (
                                <td>{co.returnDate}</td>
                            )}
                            {co.returnDate == null && (
                                <td>
                                    <button onClick={() => {
                                        editCheckout(co).then(setReload(true))
                                    }}>Return</button>
                                </td>
                            )}
                            {co.paid && (
                                <td>True</td>
                            )}
                            {!co.paid && (
                                <td>False</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
