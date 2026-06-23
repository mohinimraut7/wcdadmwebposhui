import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

export default function AdminSurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/admin/surveys")
      .then(res => { if (res.data.success) setSurveys(res.data.data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h2>POSH Survey Submissions</h2>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#2C3D83", color:"#fff" }}>
            <th style={th}>#</th>
            <th style={th}>Organization</th>
            <th style={th}>Type</th>
            <th style={th}>District</th>
            <th style={th}>Taluka</th>
            <th style={th}>Submitted At</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((s, i) => (
            <tr key={s.submissionid} style={{ borderBottom:"1px solid #eee" }}>
              <td style={td}>{i + 1}</td>
              <td style={td}>{s.orgname}</td>
              <td style={td}>{s.orgtype}</td>
              <td style={td}>{s.district}</td>
              <td style={td}>{s.taluka}</td>
              <td style={td}>{new Date(s.submittedat).toLocaleDateString()}</td>
              <td style={td}>
                <button
                  onClick={() => navigate(`/admin/survey/${s.submissionid}`)}
                  style={{ background:"#CD366B", color:"#fff", border:"none", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontWeight:700 }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding:"12px 16px", textAlign:"left", fontWeight:700, fontSize:13 };
const td = { padding:"11px 16px", fontSize:13 };