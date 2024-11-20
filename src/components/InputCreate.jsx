import { useState } from "react";

const InputCreate = ({ urlApi }) => {
  const [task, setTask] = useState(""); 
  const [error, setError] = useState(null); 

  const handleInputChange = (e) => {
    setTask(e.target.value); 
  };

  const handleSubmit = async () => {
    if (task.trim() === "") {
      setError("El campo no puede estar vacío");
      return;
    }

    const payload = { title: task }; // payload

    try {
      const response = await fetch(`${urlApi}/create`, {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON
        },
        body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
      })

      if (!response.ok) {
        throw new Error(`Error al crear la tarea: ${response.status}`);
      }

      setTask(""); // resetear input
      setError(null); // resetear error
      alert("Tarea añadida con éxito");
    } catch (error) {
      console.error(error);
      setError("Hubo un problema al añadir la tarea");
    }
  };

  return (
    <div>
      <h2>Añadir Tarea</h2>
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Escribe una tarea"
      />
      <button onClick={handleSubmit}>Enviar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default InputCreate;