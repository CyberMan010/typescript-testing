import React, { useState, useEffect, useRef } from "react";

interface TermsModalProps {
  onAgree: () => void; // Callback function to handle agreement
  onClose: () => void; // Callback function to close the modal
}

const TermsModal: React.FC<TermsModalProps> = ({ onAgree, onClose }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button starts disabled
    const modalContentRef = useRef<HTMLDivElement>(null);
  
    // Function to check if the user has scrolled to the bottom
    const handleScroll = () => {
      const modalContent = modalContentRef.current;
      if (modalContent) {
        const { scrollTop, scrollHeight, clientHeight } = modalContent;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          setIsButtonDisabled(false); // Enable the button when scrolled to the bottom
        }
      }
    };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (modalContent) {
        modalContent.removeEventListener("scroll", handleScroll); // Cleanup on unmount
      }
    };
  }, []);

  return (
    <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      ref={modalContentRef}
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        maxHeight: "80vh",
        overflowY: "auto",
        color: "red",
      }}
    >
      <h2>Terms & Conditions</h2>
      <p>
        By using this service, you agree to the following terms and conditions:
      </p>
      <ul>
        <li>You must be at least 18 years old to use this service .</li><br/>
        <li>You are responsible for maintaining the security of your account.</li><br/>
        <li>We reserve the right to terminate accounts for any violation of these terms.</li><br/>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </li><br/>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </li><br/>
        <li>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </li><br/>
        <li>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </li><br/>
        <li>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium.
        </li><br/>
        <li>
          Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
          vitae dicta sunt explicabo.
        </li><br/>
        <li>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </li><br/>
        <li>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
          velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
          quaerat voluptatem.
        </li><br/>
        </ul>
        <button
          disabled={isButtonDisabled}
          onClick={onAgree}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: isButtonDisabled ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          I Agree
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#ccc",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Close
        </button> 
      </div>
    </div>
  );
};

export default TermsModal;