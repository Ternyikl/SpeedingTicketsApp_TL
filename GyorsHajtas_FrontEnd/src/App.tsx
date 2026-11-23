import { useEffect, useState } from 'react'
import './App.css'
import type { SpeedingTicket } from './types/type'

function App() {

  const [speedingTickets, setSpeedingTickets] = useState<SpeedingTicket[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/tickets");
        const data: SpeedingTicket[] = await response.json();
        setSpeedingTickets(data);
      } catch (err: any) {
        console.log("hiba történt:" + err.message);
      }
    }
    fetchUsers();
  }, []);

  async function handleSTActive(s: SpeedingTicket) {
    try {
      await fetch("http://localhost:3000/tickets/" + s.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          active: !s.active
        })
      })
      setSpeedingTickets((last) =>
        last.map((u) => u.id === s.id ? { ...u, active: !u.active } : u))
    } catch (err: any) {
      console.log("Hiba történt: " + err.message);
    }
  }

  return <>
    <h1>Gyorshajtók</h1>
    <h3>Aktív büntetések</h3>

    <table className='table'>
      <thead>
        <tr>
          <th>Rendszám</th>
          <th>Mért sebesség</th>
          <th>Büntetés</th>
          <th>Aktív</th>
          <th>Funkció</th>
        </tr>
      </thead>
      <tbody>
        {speedingTickets.map((s) => (
          <tr key={s.id}>
            <td>{s.licencePlate}</td>
            <td>{s.speed} km/h</td>
            <td>{s.fine} Ft.</td>
            <td>{s.active
              ? <span className="badge bg-success">Aktív</span>
              : <span className="badge bg-danger">Inaktív</span>}</td>
            <td>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={s.active}
                  onChange={() => handleSTActive(s)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
}

export default App
