import React, { useState, FormEvent } from "react";
import { useHistory } from 'react-router-dom';

import api from "../../services/api";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

function TeacherForm() {

  const histoty = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    
    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('cadastro finalizado');
      histoty.push('/');
    }).catch((e) => {
      alert(e);
    })
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    })

    setScheduleItems(updateScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulario de incrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="nome completo"
              value={name}
              onChange={(text) => setName(text.target.value)}
            />
            <Input
              name="avatar"
              label="avatar"
              value={avatar}
              onChange={(text) => setAvatar(text.target.value)}
            />
            <Input
              name="whatsapp"
              label="whatsapp"
              value={whatsapp}
              onChange={(text) => setWhatsapp(text.target.value)}
            />
            <TextArea
              name="bio"
              label="biografia"
              value={bio}
              onChange={(text) => setBio(text.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="materia"
              value={subject}
              onChange={(text) => setSubject(text.target.value)}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciencias", label: "Ciencias" },
                { value: "Ed Fisica", label: "Ed Fisica" },
                { value: "Fisica", label: "Fisica" },
                { value: "Geografia", label: "Geografia" },
                { value: "Matematica", label: "Matematica" },
                { value: "Portugues", label: "Portugues" },
                { value: "Quimica", label: "Quimica" },
              ]}
            />
            <Input
              name="cost"
              label="custo por hora"
              value={cost}
              onChange={(text) => setCost(text.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horarios Disponiveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horarios
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="dia da semana"
                    value={scheduleItem.week_day}
                    onChange={text => setScheduleItemValue(index, 'week_day', text.target.value)}
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-feira" },
                      { value: "2", label: "Terça-feira" },
                      { value: "3", label: "Quarta-feira" },
                      { value: "4", label: "Quinta-feira" },
                      { value: "5", label: "Sexta-feira" },
                      { value: "6", label: "Sabado" },
                    ]}
                  />
                  <Input 
                    name="from" 
                    label="Das" 
                    type="time" 
                    value={scheduleItem.from}
                    onChange={text => setScheduleItemValue(index, 'from', text.target.value)}
                  />
                  <Input 
                    name="to" 
                    label="Até" 
                    type="time"
                    value={scheduleItem.to}
                    onChange={text => setScheduleItemValue(index, 'to', text.target.value)} 
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="aviso importante" />
              Importante! <br />
              Preecha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
