// App.jsx
// El mapa de la aplicación: qué página se muestra en cada dirección.
// Todas las rutas van dentro de Layout, que pone el encabezado y un <Outlet />.
 
import { Routes, Route } from 'react-router'
import Layout from './componentes/layout/Layout.jsx'
import Inicio from './paginas/Inicio.jsx'
import PaginaSeries from './paginas/PaginaSeries.jsx'
import NuevaSerie from './paginas/NuevaSerie.jsx'
import DetalleSerie from './paginas/DetalleSerie.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'
 
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="series" element={<PaginaSeries />} />
        <Route path="series/nueva" element={<NuevaSerie />} />
        <Route path="series/:id" element={<DetalleSerie />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}
 
export default App
