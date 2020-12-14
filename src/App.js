
import {UserTable} from './components/table-groups/user-tables/UserTable'
import {MusicBuyerTable} from './components/table-groups/music-tables/MusicBuyerTable'
import {ProductOneTable} from './components/table-groups/product-tables/ProductOneTable'

function App() {
  return (
    <div className="App">
      <UserTable/>
      <ProductOneTable />
      <MusicBuyerTable />
    </div>
  );
}

export default App;
