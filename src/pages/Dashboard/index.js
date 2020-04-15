import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  parseISO,
  setMilliseconds,
  isEqual,
  isToday,
  getISODay,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import ptBr from 'date-fns/locale/pt-BR';
// import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import {
  MdChevronRight,
  MdChevronLeft,
  MdPhoneIphone,
  MdPhoneInTalk,
  MdAttachMoney,
  MdSchedule,
  MdModeEdit,
  MdDelete,
  MdCancel,
  MdTune,
} from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { scheduleRequest } from '~/store/modulos/schedule/actions';
// import ModalAppointment from '~/components/ModalAppointment';
import { Container, Time } from './styles';
import api from '~/services/api';
import { week } from '~/utils/constants/week';

export default function Darshboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [scheduled, setScheduled] = useState(null);
  const dispatch = useDispatch();

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: ptBr }),
    [date]
  );

  const weekDay = useMemo(() => week.find((d) => d.key === getISODay(date)), [
    date,
  ]);

  const handleDeleteAppointment = async (id) => {
    let response;
    try {
      response = await api.delete(`/v1/appointments/${id}`);

      const scheduleDeleted = schedule.map((p) => {
        if (p.appointment && p.appointment.id === id) {
          p.appointment.canceled_at = new Date(response.data.data.canceled_at);
        }

        return p;
      });

      setSchedule(scheduleDeleted);
      setModal(false);
    } catch (error) {
      alert(`Error, não foi possível canceldar o agendamento`);
      setModal(false);
    }
  };

  useEffect(() => {
    dispatch(scheduleRequest(date));
    const loadSchedule = async () => {
      // const dateNumeric = data.ge
      const [appointments, schedules] = await Promise.all([
        api.get('/v1/schedule', {
          params: { date },
        }),
        api.get('/v1/providers/available', {
          params: { date: date.getTime() },
        }),
      ]);

      const { scheduleWeek, availiable } = schedules.data;

      // Pegando a timezone do navegador
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // if (scheduleWeek.length <= 0) return setSchedule([]);

      // console.tron.log(schedule);
      // console.tron.log(scheduleWeek);
      if (scheduleWeek.length > 0) {
        // add mais informações aos agendamentos
        const data = scheduleWeek.map((time) => {
          const [hour, minute] = time.split(':');
          const checkDate = setMilliseconds(
            setSeconds(setMinutes(setHours(date, hour), minute), 0),
            0
          );
          const compareDate = utcToZonedTime(checkDate, timezone);
          return {
            time: `${hour}:${minute}`,
            past: isBefore(compareDate, new Date()),
            appointment: appointments.data.find((a) =>
              isEqual(parseISO(a.date), compareDate)
            ),
          };
        });

        return setSchedule(data);
      }

      return setSchedule([]);
    };

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function toggeShowModal(props) {
    setModal(true);
    console.tron.log(props);
  }

  function toggeCloseModal() {
    setModal(false);
  }

  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#BFBFBF" onClick={handlePrevDay} />
        </button>
        <strong>
          {(isToday(date) && 'Hoje') || weekDay.value.week}, {dateFormatted}
        </strong>
        <button type="button">
          <MdChevronRight size={36} color="#BFBFBF" onClick={handleNextDay} />
        </button>
      </header>
      <ul>
        {schedule.length >= 0 &&
          schedule.map((time) => (
            <Time
              key={time.time}
              past={time.past}
              available={!time.appointment || time.appointment.canceled_at}
              onClick={() => {
                setScheduled(time);
                toggeShowModal(time);
              }}
            >
              <strong>{time.time}</strong>
              <span>
                {time.appointment
                  ? time.appointment.profiles.name
                  : 'Em aberto'}
              </span>
              <span />
            </Time>
          ))}
      </ul>
      {schedule.length <= 0 && (
        <Time style={{ alignContent: 'center' }}>
          <strong>Sem agenda!</strong>
        </Time>
      )}
      <Modal
        show={modal}
        onHide={toggeCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // data={scheduled}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            DETALHES DE AGENDAMENTO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {scheduled && scheduled.appointment
              ? scheduled.appointment.profiles.name
              : null}
          </h4>

          <p>
            Serviço:{' '}
            {scheduled && scheduled.appointment
              ? scheduled.appointment.service.title
              : null}
          </p>
          <p>
            Descrição:{' '}
            {scheduled && scheduled.appointment
              ? scheduled.appointment.service.description
              : null}
          </p>
          <p>
            Telefone:{' '}
            {scheduled && scheduled.appointment
              ? scheduled.appointment.profiles.phone
              : null}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={toggeCloseModal}>
            <MdAttachMoney color="#eee" size={20} style={{ marginRight: 5 }} />
            Venda
          </Button>
          <Button variant="success" onClick={toggeCloseModal}>
            <FaWhatsapp color="#eee" size={20} style={{ marginRight: 5 }} />
            WhatsApp
          </Button>
          <Button variant="warning" onClick={toggeCloseModal}>
            <MdModeEdit color="#eee" size={20} style={{ marginRight: 5 }} />
            Alterar
          </Button>
          {scheduled && scheduled.appointment && (
            <Button
              variant="danger"
              onClick={() =>
                handleDeleteAppointment(
                  scheduled.appointment && scheduled.appointment.id
                )
              }
            >
              <MdDelete color="#eee" size={20} style={{ marginRight: 5 }} />
              Deletar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
