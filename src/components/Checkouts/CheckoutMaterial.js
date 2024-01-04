import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom/dist";
import { getMaterial } from "../../data/materialsData";
import { getPatrons } from "../../data/patronsData";
import { createCheckout } from "../../data/checkoutData";

export const CheckoutMaterial = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [material, setMaterial] = useState({})
    const [patrons, setPatrons] = useState([])
    const [selectedPatronId, setSelectedPatronId] = useState({})

    useEffect(() => {
        getMaterial(params.id).then(res => {
            setMaterial(res)
        })
        getPatrons().then(res => {
            setPatrons(res)
        })
    }, []);

    const submit = () => {
        const newCheckout = {
            materialId: material.id,
            patronId: selectedPatronId
        };

        createCheckout(newCheckout).then(() => {
            navigate("/checkouts");
        });
    };

    return (
        <div className="container">
            <h4>Checkout a Material</h4>
            <Table>
                <tbody>
                    <tr>
                        <th scope="row">Material Name</th>
                        <td>{material.materialName}</td>
                    </tr>
                    <tr>
                        <th scope="row">Type</th>
                        <td>{material.materialType?.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Genre</th>
                        <td>{material.genre?.name}</td>
                    </tr>
                </tbody>
            </Table>

            <FormGroup>
                <Label htmlFor="patron">Select Patron</Label>
                <Input
                    name="patron"
                    type="select"
                    onChange={(e) => {
                        setSelectedPatronId(parseInt(e.target.value));
                    }}
                >
                    <option value="0">Please Select a Patron...</option>
                    {patrons.map((p) => (
                        <option value={p.id}>{p.firstName} {p.lastName}</option>
                    ))}
                </Input>
            </FormGroup>

            <Button onClick={submit}>Submit</Button>

            <h5>Previous Checkouts</h5>
            {material.checkouts?.length ? (
                <Table>
                    <thead>
                        <tr>
                            <th>Patron</th>
                            <th>Checkout Date</th>
                            <th>Return Date</th>
                            <th>Late Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {material.checkouts.map((co) => (
                            <tr key={`checkout-${co.id}`}>
                                <td>
                                    {co.patron.firstName} {co.patron.lastName}
                                </td>
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
