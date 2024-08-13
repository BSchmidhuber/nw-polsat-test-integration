import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicExperience = dynamic(
  () => import("../../../../components/Experience"),
  { ssr: false }
);

const Exp = () => {
  const router = useRouter();
  const { envType, eventType, manifestId } = router.query;

  if (
    typeof envType !== "string" ||
    typeof manifestId !== "string" ||
    typeof eventType !== "string"
  ) {
    return <p>Missing params</p>;
  }

  if (!(envType === "prod" || envType === "test" || envType === "dev")) {
    return <p>Invalid envType value</p>;
  }

  if (
    !(
      eventType === "default" ||
      eventType === "football" ||
      eventType === "volleyball"
    )
  ) {
    return <p>Invalid eventType value</p>;
  }

  return (
    <>
      <h1>Experience</h1>
      <div style={{ height: 500 }}>
        <DynamicExperience
          manifestId={manifestId}
          envType={envType}
          eventType={eventType}
        />
      </div>
    </>
  );
};

export default Exp;
