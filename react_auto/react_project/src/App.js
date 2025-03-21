function Comp({test, children }) {
  return (
    <>
    <div className="card">
      {children}
    </div>
    <span>{test}</span>
    </>
  );
}

export default function Main() {
  return (
    <Comp test={"777"}>
      ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
    </Comp>
  );
}