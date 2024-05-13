import React from 'react'

export default function Buscador({prop}) {
    
  return (
    <div className="div-del-input">
    {" "}
    <input
      type="text"
      value={prop.search}
      onChange={prop.change}
      className="input"
      placeholder="Filtrar por nombre"
    />{" "}
  </div>
  )
}
