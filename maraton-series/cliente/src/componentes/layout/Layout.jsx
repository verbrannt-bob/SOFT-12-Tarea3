// Layout.jsx
// Lo que comparten todas las páginas: el encabezado arriba y, debajo, la página actual.
// <Outlet /> es el lugar donde React Router dibuja la ruta hija que coincide con la dirección.
 
import { Outlet } from 'react-router'
import Encabezado from './Encabezado.jsx'
 
function Layout() {
  return (
    <>
      <Encabezado />
      <main className="container pb-5">
        <Outlet />
      </main>
    </>
  )
}
 
export default Layout
