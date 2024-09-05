import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { useParams } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from "../scdata/Cert.json";
import { CertModuleCert } from "../scdata/deployed_addresses.json";

const ViewPage = () => {
  const { id } = useParams();
  const [certs, setCerts] = useState({});
  
  useEffect(() => {
    async function retrieve() {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const instance = new Contract(CertModuleCert, abi, signer);

        // Use the 'id' from useParams to fetch the certificate details
        const result = await instance.Certificates(id);
        setCerts(result);
        
        console.log(result);
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
    }

    retrieve();
  }, [id]);

  return (
    <div className="bg-blue-100 h-[1000px]">
      <div className="text-5xl font-bold text-center pt-8">
        <p>Kerala Blockchain Academy</p>
      </div>
      <div className="flex justify-center ">
        <div className="text-center mt-16 border w-[500px] h-[700px] p-4 bg-blue-200 rounded-3xl shadow-lg shadow-black">
          <div className="flex justify-center mt-16">
            <img src={logo} alt="" className="w-[200px] h-[200px]" />
          </div>
          <div className="mt-16">
            <p className="text-2xl text-justify p-4">
              {`This is to certify that ${certs.name} has successfully completed the ${certs.course} course with a grade of ${certs.grade} on ${certs.date}.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
