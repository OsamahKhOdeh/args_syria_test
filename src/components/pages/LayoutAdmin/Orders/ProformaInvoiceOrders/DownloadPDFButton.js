import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../../api";

function DownloadPDFButton(props) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    axios({
      url: `${BASE_URL}/pi/pisigned/${props.pi_id}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${props.pdfName}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <button
      className="button_edit_pdf button_pdf"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Downloading..." : "Confirmed PI"}
      {/* <i class="uil uil-import"></i> */}
    </button>
  );
}

export default DownloadPDFButton;
