import { useRouter } from 'next/navigation';

export default function Main(props) {
  console.log("========================connectHash ====================",connectHash);
  const router = useRouter();
  const { connectHash } = router.query;
  return (
    <></>
  );
}

