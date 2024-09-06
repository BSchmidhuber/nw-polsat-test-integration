import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicExperience = dynamic(
  () => import("../../../components/Experience"),
  { ssr: false }
);

const Exp = () => {
  const router = useRouter();
  const { envType, manifestId } = router.query;

  if (typeof envType !== "string" || typeof manifestId !== "string") {
    return <p>Missing params</p>;
  }

  if (!(envType === "prod" || envType === "test" || envType === "dev")) {
    return <p>Invalid envType value</p>;
  }

  return (
    <>
      <h1>Experience</h1>
      <div style={{ height: 500 }}>
        <DynamicExperience manifestId={manifestId} envType={envType} />
      </div>
    </>
  );
};

export default Exp;
