import { useRouter } from 'next/router';

export default function Dashboard(props) {
    console.log("========================props ====================",props);
  const router = useRouter();
  const { connectHash } = router.query;
  console.log("========================connectHash ====================",connectHash);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

