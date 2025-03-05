//App.js 파일

//App2.js 파일에서 export한 MyButton함수를 MyButton7이라는 이름으로 사용할 것을 정의
import MyButton7 from './App2';  

function App() {
  //MyButton7 함수 호출
  return (
    <div className="123">
      <MyButton7 />
    </div>
  );
}

export default App;