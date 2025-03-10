import './App.css';

const jsonData = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function SearchComp() {
  function textChange() {
    
  }
  return(
    <>
    <input className="searchInput" placeholder="Search..." onChange={textChange}/>
    <input type="checkbox"/>
    Only show products in stock
    <br /> <br />
    </>
  );
}

function TabelMainComp() {
  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <TabelSubComp />
      </tbody>
    </table>
  );
}

function TabelSubComp() {
  var flag;
  var htmlTag = [];

  jsonData.forEach(function(x, index) {
    if(index == 0 || (flag != x.category)) {
      flag = x.category;
      htmlTag.push(
        <tr>
          <th colspan="2">{x.category}</th>
        </tr>
      );  
    }
    
    htmlTag.push(
      <tr>
        <td className={x.stocked || "noStocked"}>{x.name}</td>
        <td>{x.price}</td>
      </tr>
    );
  });

  return(
    <>    
    {htmlTag}
    </>
  );
}

export default function MainComp() {
  return (
    <>
    <SearchComp />
    <TabelMainComp />
    </>
  );
}