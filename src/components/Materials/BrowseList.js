import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getAvailableMaterials} from "../../data/materialsData";
import { Link } from "react-router-dom";

export default function BrowseList() {
  const [materials, setMaterials] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getAvailableMaterials().then(materialsData => {
      materialsData.sort((a, b) => a.id - b.id);
      setMaterials(materialsData);
    });
    setReload(false);
  }, [reload]);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Brose Available Materials</h4>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Details</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
