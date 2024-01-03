import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { editMaterial, getMaterials } from "../../data/materialsData";
import { Link } from "react-router-dom";

export default function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getMaterials().then(materialsData => {
      materialsData.sort((a, b) => a.id - b.id);
      setMaterials(materialsData);
    });
    setReload(false);
  }, [reload]);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Materials</h4>
        <Link to="/materials/create">Add</Link>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Details</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((m) => (
            <tr key={`materials-${m.id}`}>
              <th scope="row">{m.id}</th>
              <td>{m.materialName}</td>
              <td>{m.materialType.name}</td>
              <td>{m.genre.name}</td>
              <td>
                <Link to={`${m.id}`}>Details</Link>
              </td>
              {m.outOfCirculationSince == null && (
                <td>
                  <button onClick={() => {
                    editMaterial(m).then(setReload(true))
                  }}>Remove</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
