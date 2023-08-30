import icons from "mime-icons";
import "./App.css";

function App() {
  const source: Array<{ contentType?: string; url?: string }> = [
    { contentType: "text/css" },
    { contentType: "text/html" },
    { contentType: "application/json" },
    { contentType: "text/javascript" },
    { contentType: "???" },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>MIME</th>
            <th>File</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {source.map((i, idx) => {
            const f = icons.getIconName(i);
            return (
              <tr key={idx}>
                <td>{i.contentType}</td>
                <td>{f}</td>
                <td>
                  <img width="30" src={`./icons/${f}`} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
