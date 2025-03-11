import './App.css';
import { useState } from 'react';

const jsonData = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

//조건 영역 컴포넌트
function SearchComp({changeFunc, clickFunc}) {
  return(
    <>
    <input className="searchInput" placeholder="Search..." onChange={(e) => {changeFunc(e)}}/>
    <input type="checkbox" onClick={(e) => {clickFunc(e)}}/>
    Only show products in stock
    <br /> <br />
    </>
  );
}

//테이블 헤더 컴포넌트
function TabelMainComp({searchText, isChecked}) {
  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <TabelSubComp searchText={searchText} isChecked={isChecked}/>
      </tbody>
    </table>
  );
}

//테이블 데이터 컴포넌트
function TabelSubComp({searchText, isChecked}) {
  var flag;
  var htmlTag = [];

  //글자 필터
  const jsonSearchFilter = jsonData.filter(function(x) {
    let result;
    if(searchText.trim() == "") {
      result = x.name;
    }
    else {
      result = x.name.toLowerCase().includes(searchText.trim().toLowerCase());
    }
    
    return result;
  });

  //체크 필터
  const jsonCheckedFilter = jsonSearchFilter.filter(function(x) {
    let result;
    if(isChecked == true) {
      result = x.stocked == true;
    }
    else {
      result = x.name;
    }
    
    return result;
  });

  //반복문을 통해 데이터 영역 구성
  jsonCheckedFilter.forEach(function(x, index) {
    if(index == 0 || (flag != x.category)) {
      flag = x.category;
      htmlTag.push(
        <tr>
          <th colSpan="2">{x.category}</th>
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

//메인 컴포넌트
export default function MainComp() {  
  const [searchText, setSearchText] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  //글자 변경 이벤트
  function changeFunc(e) {
    setSearchText(e.target.value);
  }

  //체크박스 이벤트
  function clickFunc(e) {
    setIsChecked(e.target.checked);
  }

  return (
    <>
    <SearchComp changeFunc={changeFunc} clickFunc={clickFunc}/>
    <TabelMainComp searchText={searchText} isChecked={isChecked}/>
    </>
  );
}