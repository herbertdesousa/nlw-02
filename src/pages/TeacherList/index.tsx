import React, { useState, FormEvent } from "react";

import api from "../../services/api";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import "./styles.css";

function TeacherForm() {

  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teacher" onSubmit={searchTeachers}>
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
          <Select
            name="week_day"
            label="dia da semana"
            value={week_day}
            onChange={(text) => setWeek_day(text.target.value)}
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
            type="time"
            name="time"
            label="hora"
            value={time}
            onChange={(text) => {
              setTime(text.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher) => {
          return <TeacherItem teacher={teacher}/>
        })}
      </main>
    </div>
  );
}

export default TeacherForm;
