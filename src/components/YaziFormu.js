import React, { useState } from "react";
import { api } from "../api";
import { withRouter } from "react-router-dom";

const YaziFormu = (props) => {
  const [yazi, setYazi] = useState({ title: "", content: "" });
  const [hata, setHata] = useState("");

  const onInputChange = (event) =>
    setYazi({ ...yazi, [event.target.name]: event.target.value });

  const onFormSubmit = (event) => {
    event.preventDefault();
    setHata("");
    api()
      .post("/posts", yazi)
      .then((response) => {
        props.history.push("/");
      })
      .catch((error) => {
        setHata("Başlık ve yazı içeriği alanları zorunludur.");
      });
  };

  return (
    <React.Fragment>
      {hata && (
        <div className="ui error message">
          <div className="header">Hata</div>
          <p>{hata}</p>
        </div>
      )}
      <div className="ui form">
        <div className="field">
          <label>Yazı Başlığı</label>

          <input
            value={yazi.title}
            type="text"
            name="title"
            onChange={onInputChange}
          />
        </div>
        <div className="field">
          <label>Yazı İçeriği</label>
          <textarea
            value={yazi.content}
            rows="3"
            name="content"
            onChange={onInputChange}
          ></textarea>
        </div>
        <button className="ui primary button" onClick={onFormSubmit}>
          Gönder
        </button>
        <button className="ui button">İptal Et</button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(YaziFormu);
