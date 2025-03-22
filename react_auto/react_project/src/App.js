function Drink({ name }) {
  let plant = 'leaf';
  let content = '15–70 mg/cup';
  let Age = '4,000+ years';

  if(name !== 'tea') {
    plant = 'bean';
    content = '80–185 mg/cup';
    Age = '1,000+ years';
  }

  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{plant}</dd>
        <dt>Caffeine content</dt>
        <dd>{content}</dd>
        <dt>Age</dt>
        <dd>{Age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
