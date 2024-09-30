import { useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const [envType, setEnvType] = useState('test');
  const [manifestId, setManifestId] = useState('57z30xc19kxjm3ln');
  const router = useRouter();

  return (
    <>
      <h1>Home</h1>

      <p>
        <label>
          envType: 
          <input
            name="envType"
            type="text"
            value={envType}
            onChange={e => setEnvType(e.target.value)}
          />
        </label>
      </p>

      <p>
        <label>
          manifestId: 
          <input
            name="manifestId"
            type="text"
            value={manifestId}
            onChange={e => setManifestId(e.target.value)}
          />
        </label>
      </p>

      <button onClick={() => router.push(`/exp/${envType}/${manifestId}`)}>
        Submit
      </button>
    </>
  );
}

export default Home;
