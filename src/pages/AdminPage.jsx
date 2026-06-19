import { useState } from "react";
import { FaPlus, FaRegCopy, FaCheck, FaLink, FaUser } from "react-icons/fa";

import "../styles/Admin.css";

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const addEmployee = () => {
    setEmployees([
      ...employees,
      {
        id: Date.now(),
        employeeName: "",
        generatedUrl: "",
      },
    ]);
  };

  const updateName = (id, value) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, employeeName: value } : emp,
      ),
    );
  };

  const generateUrl = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== id) return emp;

        const encoded = btoa(emp.employeeName);

        return {
          ...emp,
          generatedUrl: `${window.location.origin}/feedback/${encoded}`,
        };
      }),
    );
  };

  const copyUrl = async (url, id) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for http:// or older browsers without Clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Employee Feedback - URL Generation</h1>

          <p>Create and manage personalized feedback links for employees.</p>
        </div>
        {/* Feedback Button */}
        <div className="feedback-button">
          <button onClick={addEmployee}>
            <FaPlus />
            Create Feedback Link
          </button>
        </div>
        {/* Empty State */}
        {employees.length === 0 && (
          <div className="empty-state">
            <FaLink className="empty-icon" />

            <p>
              Click the <strong>Create Feedback Link</strong> button above to
              generate a personalized feedback form URL for an employee.
            </p>
          </div>
        )}
        {/* Employee Cards */}
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <div className="employee-row">
              <div className="input-wrapper">
                <FaUser className="input-icon" />

                <input
                  type="text"
                  placeholder="Enter Employee Name"
                  value={employee.employeeName}
                  onChange={(e) => updateName(employee.id, e.target.value)}
                />
              </div>

              <button onClick={() => generateUrl(employee.id)}>
                Generate Link
              </button>
            </div>

            {employee.generatedUrl && (
              <div className="url-box">
                <a
                  href={employee.generatedUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {employee.generatedUrl}
                </a>

                <div
                  className="copy-btn"
                  hint="Copy URL"
                  onClick={() => copyUrl(employee.generatedUrl, employee.id)}
                >
                  {copiedId === employee.id ? (
                    <>
                      <FaCheck />
                      <span className="tooltip">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaRegCopy />
                      <span className="tooltip">Copy URL</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
