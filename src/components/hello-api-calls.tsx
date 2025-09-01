export default async function HelloApiCalls() {
  const res = await fetch('http://localhost:3000/api/hello?name=Lee', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());

  return <>{res.message}</>;
}
