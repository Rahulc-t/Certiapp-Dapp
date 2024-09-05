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
    <div className="bg-blue-100 h-screen flex items-center justify-center">
      <div className="bg-white w-[1000px] h-[700px] p-12 rounded-lg shadow-lg border-8 border-blue-300">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">CERTIFICATE</h1>
          <img src={logo} alt="Logo" className="w-[100px] h-[100px] mx-auto mb-4" />
        </div>
        <p className="text-3xl mt-[100px] mb-8">
          This is to certify that <span className="font-bold">{certs.name}</span> has successfully completed the <span className="font-bold">{certs.course}</span> course with a grade of <span className="font-bold">{certs.grade}</span> on <span className="font-bold">{certs.date}</span>.
        </p>

        <div className="flex justify-between mt-[200px]">
          <div className="text-center">
            <p className="text-lg">Signature</p>
            <hr className="border-t-2 border-gray-400 w-[180px] mx-auto mt-2"/>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">Kerala Blockchain Academy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
