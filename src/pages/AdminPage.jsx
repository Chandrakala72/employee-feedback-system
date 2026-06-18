import React, { useState } from "react";
import { FaPlus, FaRegCopy, FaCheck, FaUser, FaLink } from "react-icons/fa";

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const addEmployee = () => {
    setEmployees((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        employeeName: "",
        generatedUrl: "",
      },
    ]);
  };

  const updateEmployeeName = (id, value) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              employeeName: value,
            }
          : employee,
      ),
    );
  };

  const generateUrl = (id) => {
    setEmployees((prev) =>
      prev.map((employee) => {
        if (employee.id !== id) return employee;

        if (!employee.employeeName.trim()) {
          alert("Please enter employee name");
          return employee;
        }

        const encodedName = btoa(employee.employeeName.trim());

        return {
          ...employee,
          generatedUrl: `${window.location.origin}/feedback/${encodedName}`,
        };
      }),
    );
  };

  const copyUrl = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "20px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            borderRadius: "28px",
            padding: "35px",
            textAlign: "center",
            color: "#fff",
            marginBottom: "30px",
            boxShadow: "0 12px 30px rgba(79,70,229,0.25)",
          }}
        >
          {/* Title */}

          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            Employee Feedback Hub
          </h1>

          {/* Subtitle */}

          <p
            style={{
              marginTop: "12px",
              fontSize: "16px",
              opacity: 0.9,
              maxWidth: "650px",
              marginInline: "auto",
              lineHeight: "1.7",
            }}
          >
            Create and manage personalized feedback links for your employees and
            collect meaningful insights.
          </p>

          {/* Button */}

          <div
            style={{
              marginTop: "25px",
            }}
          >
            <button
              onClick={addEmployee}
              style={{
                background: "#fff",
                color: "#4f46e5",
                border: "none",
                padding: "14px 24px",
                borderRadius: "14px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FaPlus />
              Create Feedback Link
            </button>
          </div>
        </div>

        {/* Empty State */}
        {employees.length === 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "40px",
              textAlign: "center",
              color: "#6b7280",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            Click "New Link" to create a feedback URL.
          </div>
        )}

        {/* Employee Cards */}
        {employees.map((employee) => (
          <div
            key={employee.id}
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "16px",
              marginBottom: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaUser
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280",
                  }}
                />

                <input
                  type="text"
                  placeholder="Employee Name"
                  value={employee.employeeName}
                  onChange={(e) =>
                    updateEmployeeName(employee.id, e.target.value)
                  }
                  style={{
                    width: "100%",
                    height: "52px",
                    paddingLeft: "45px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    fontSize: "16px",
                  }}
                />
              </div>

              <button
                onClick={() => generateUrl(employee.id)}
                style={{
                  background: "#4f46e5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 18px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Generate Link
              </button>
            </div>

            {employee.generatedUrl && (
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  marginTop: "12px",
                }}
              >
                <FaLink color="#4f46e5" />

                <a
                  href={employee.generatedUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    textDecoration: "none",
                    color: "#2563eb",
                    overflowWrap: "anywhere",
                  }}
                >
                  {employee.generatedUrl}
                </a>

                {copiedId === employee.id ? (
                  <FaCheck color="green" size={18} />
                ) : (
                  <FaRegCopy
                    size={18}
                    hint="Copy URL"
                    style={{
                      background: "#eef2ff",
                      borderRadius: "8px",
                      paddingLeft: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => copyUrl(employee.generatedUrl, employee.id)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
